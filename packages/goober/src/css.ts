import { getSheet } from "./core/get-sheet"
import { hash, InjectionType } from "./core/hash"

type Conditional<T> = T | 0 | false | null | undefined

interface Context {
  type?: InjectionType
  append?: boolean
}

type TemplateValue = Conditional<string | number>
type TemplateArgs = [TemplateStringsArray, ...values: TemplateValue[]]

const joinTemplate = (...[strings, ...values]: TemplateArgs) =>
  strings.flatMap((string, index) => [string, values[index] || ""]).join("")

/** Create a CSS class in js */
export function css(this: Context | void, ...args: TemplateArgs) {
  const [value, ...rest] = args
  const cssString = joinTemplate(value, ...rest)
  return hash(cssString, getSheet(), this?.append, this?.type)
}

/** Declare global styles */
export const glob = css.bind({ type: "global" })

/** keyframes function for defining animations */
export const keyframes = css.bind({ type: "keyframes" })
