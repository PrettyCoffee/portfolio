/* eslint-disable @typescript-eslint/no-use-before-define */

import { getSetup } from "../../core/setup"
import { type Plugin } from "../../plugins/plugin"
import { type StyleNode } from "../types"

const runHook = <THookName extends keyof Plugin>(
  hook: THookName,
  props: Parameters<NonNullable<Plugin[THookName]>>[0]
): ReturnType<NonNullable<Plugin[THookName]>> => {
  const hooks = getSetup().plugins.map(plugin => plugin[hook])
  const out = hooks.reduce((props, hook) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    props.result = hook?.(props as any) ?? props.result
    return props
  }, props)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return out.result as any
}

const isAst = (value: StyleNode | string | undefined): value is StyleNode =>
  !!value && typeof value === "object"
const isString = (value: StyleNode | string | undefined): value is string =>
  typeof value === "string"

interface Insert {
  prepend: (string: string) => void
  line: (string: string) => void
  block: (string: string) => void
}

type Parser<TValue> = (key: string, value: TValue, insert: Insert) => void

type Matcher = { matcher: RegExp } & (
  | { type: "string"; handler: Parser<string> }
  | { type: "ast"; handler: Parser<StyleNode> }
)

const matchers: Matcher[] = [
  {
    matcher: /^@import/,
    type: "string",
    handler(key, value, insert) {
      insert.prepend(`${key} ${value};\n`)
    },
  },
  {
    matcher: /^(?!@import)/,
    type: "ast",
    handler(key, value, insert) {
      const content = build(value)
      insert.block(
        runHook("buildBlock", { selector: key, node: value, content }) ?? ""
      )
    },
  },
  {
    matcher: /^[^@]/,
    type: "string",
    handler(jsKey, value, insert) {
      // Preserve CSS variable names
      const key = jsKey.startsWith("--")
        ? jsKey
        : jsKey.replaceAll(/[A-Z]/g, "-$&").toLowerCase()

      insert.line(runHook("buildRule", { key, value }) ?? "")
    },
  },
]

const build = (obj: StyleNode) => {
  let outer = ""
  let current = ""
  const blocks: string[] = []

  const insert = {
    prepend: (value: string) => (outer += value),
    block: (block: string) => blocks.push(block),
    line: (line?: string) => (current += line),
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

    rule.handler(
      key,
      value as string & StyleNode, // type validation is handled above
      insert
    )
  })

  return outer + [current, ...blocks].join("")
}

export const stringify = (node: StyleNode, selector?: string) => {
  const tree = runHook("start", { selector, node }) ?? node
  const result = build(!selector ? tree : { [selector]: tree })
  return runHook("end", { result }) ?? result
}
