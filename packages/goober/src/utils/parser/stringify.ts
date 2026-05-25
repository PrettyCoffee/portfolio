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
    matcher: /^(?!@import)/,
    type: "ast",
    handler({ key, value, insert }) {
      insert.block(stringify(value, key))
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
  let current = ""
  const blocks: string[] = []

  const insert = {
    prepend: (value: string) => (outer += value),
    block: (block: string) => blocks.push(block),
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
    })
  })

  const cssBody = [current, ...blocks].join("")
  const currentBlock = !selector ? cssBody : `${selector}{${cssBody}}`

  return outer + currentBlock
}
