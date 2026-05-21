/* eslint-disable @typescript-eslint/no-use-before-define */
import { getSetup } from "../setup"
import { AstNode } from "./astish"

const isAst = (value: AstNode | string | undefined): value is AstNode =>
  !!value && typeof value === "object"
const isString = (value: AstNode | string | undefined): value is string =>
  typeof value === "string"

interface Result {
  prepend: (string: string) => void
  addLine: (string: string) => void
  addBlock: (string: string) => void
}
type Parser<TValue> = (props: {
  key: string
  value: TValue
  selector: string
  result: Result
}) => void

type Matcher = { matcher: RegExp } & (
  | { type: "string"; handler: Parser<string> }
  | { type: "ast"; handler: Parser<AstNode> }
)

const matchers: Matcher[] = [
  {
    matcher: /^@import/,
    type: "string",
    handler({ key, value, result }) {
      result.prepend(`${key} ${value};`)
    },
  },
  {
    matcher: /^@font-face/,
    type: "ast",
    handler({ key, value, result }) {
      // Handling the `@font-face` where the block doesn't need the brackets wrapped
      result.addBlock(parse(value, key))
    },
  },
  {
    matcher: /^@[^if]/,
    type: "ast",
    handler({ key, value, selector, result }) {
      const rules = parse(value, key[1] == "k" ? "" : selector)
      result.addBlock(`${key}{${rules}}`)
    },
  },
  {
    matcher: /^[^@]/,
    type: "ast",
    handler({ key, value, selector, result }) {
      if (!selector) {
        result.addBlock(parse(value, key))
      }

      // Go over the selector and replace the matching multiple selectors if any
      const newSelector = selector.replaceAll(/([^,])+/g, sel =>
        // Return the current selector with the key matching multiple selectors if any
        key.replaceAll(/([^,]*:\S+\([^)]*\))|([^,])+/g, k => {
          // If the current `k`(key) has a nested selector replace it
          if (k.includes("&")) return k.replaceAll("&", sel)

          // If there's a current selector concat it
          return sel ? `${sel} ${k}` : k
        })
      )
      result.addBlock(parse(value, newSelector))
    },
  },
  {
    matcher: /^[^@]/,
    type: "string",
    handler({ key, value, result }) {
      // Preserve CSS variable names
      const cssKey = key.startsWith("--")
        ? key
        : key.replaceAll(/[A-Z]/g, "-$&").toLowerCase()

      const prefixer = getSetup().prefixer ?? (() => `${cssKey}:${value};`)
      result.addLine(prefixer(cssKey, value))
    },
  },
]

/** Parses an object into css, scoped, blocks */
export const parse = (obj: AstNode, selector: string) => {
  let outer = ""
  let blocks = ""
  let current = ""

  const result = {
    prepend: (value: string) => (outer = value),
    addBlock: (block: string) => (blocks += block),
    addLine: (line: string) => (current += line),
  }

  Object.entries(obj).forEach(([key, value]) => {
    const rule = matchers.find(({ matcher, type }) => {
      if (!matcher.test(key)) return false
      return (
        (type === "ast" && isAst(value)) ||
        (type === "string" && isString(value))
      )
    })

    if (!rule) {
      throw new Error("Parser error in goober occured")
    }

    rule.handler({
      key,
      value: value as string & AstNode, // type validation is handled above
      selector,
      result,
    })
  })

  return outer + (selector ? `${selector}{${current}}` : current) + blocks
}
