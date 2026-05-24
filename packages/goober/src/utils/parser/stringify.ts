/* eslint-disable @typescript-eslint/no-use-before-define */

import { type StyleNode } from "./types"
import { getSetup } from "../../core/setup"

const isAst = (value: StyleNode | string | undefined): value is StyleNode =>
  !!value && typeof value === "object"
const isString = (value: StyleNode | string | undefined): value is string =>
  typeof value === "string"

interface Insert {
  prepend: (string: string) => void
  line: (string: string) => void
  block: (string: string) => void
}
type Parser<TValue> = (props: {
  insert: Insert
  key: string
  value: TValue
  selector?: string | null
}) => void

type Matcher = { matcher: RegExp } & (
  | { type: "string"; handler: Parser<string> }
  | { type: "ast"; handler: Parser<StyleNode> }
)

const matchers: Matcher[] = [
  {
    matcher: /^@import/,
    type: "string",
    handler({ key, value, insert }) {
      insert.prepend(`${key} ${value};`)
    },
  },
  {
    matcher: /^@font-face/,
    type: "ast",
    handler({ key, value, insert }) {
      // Handling the `@font-face` where the block doesn't need the brackets wrapped
      insert.block(stringify(value, key))
    },
  },
  {
    matcher: /^@[^if]/,
    type: "ast",
    handler({ key, value, selector, insert }) {
      const rules = stringify(value, key[1] == "k" ? "" : selector)
      insert.block(`${key}{${rules}}`)
    },
  },
  {
    matcher: /^[^@]/,
    type: "ast",
    handler({ key, value, selector, insert }) {
      if (!selector) {
        insert.block(stringify(value, key))
        return
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
      insert.block(stringify(value, newSelector))
    },
  },
  {
    matcher: /^[^@]/,
    type: "string",
    handler({ key, value, insert }) {
      // Preserve CSS variable names
      const cssKey = key.startsWith("--")
        ? key
        : key.replaceAll(/[A-Z]/g, "-$&").toLowerCase()

      const prefixer = getSetup().prefixer ?? (() => `${cssKey}:${value};`)
      insert.line(prefixer(cssKey, value))
    },
  },
]

/** Stringify a style object into a scoped css string */
export const stringify = (obj: StyleNode, selector?: string | null) => {
  let outer = ""
  let blocks = ""
  let current = ""

  const insert = {
    prepend: (value: string) => (outer = value),
    block: (block: string) => (blocks += block),
    line: (line: string) => (current += line),
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
      insert,
      key,
      value: value as string & StyleNode, // type validation is handled above
      selector,
    })
  })

  const currentBlock = !current
    ? ""
    : !selector
      ? current
      : `${selector}{${current}}`

  return outer + currentBlock + blocks
}
