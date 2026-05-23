import { Styles } from "./core/styles"
import { parser } from "./parser"
import { CssTemplate, isTemplate } from "./types"

const toString = (value: CssTemplate["Value"]): string => {
  if (value == null || value == false) return ""
  if (Array.isArray(value)) return value.map(toString).join(" ")
  if (value instanceof Styles) return toString(value.styles)
  return typeof value === "object" ? parser.stringify(value) : String(value)
}
const joinTemplate: CssTemplate["Fn"] = (strings, ...values) =>
  strings.flatMap((string, index) => [string, toString(values[index])]).join("")

/** Create styles, inject them into the DOM, and generate a css class. */
export function css(styles: CssTemplate["Value"]): Styles
export function css(...args: CssTemplate["Args"]): Styles
export function css(...args: [CssTemplate["Value"]] | CssTemplate["Args"]) {
  const [styles, ...values] = args

  if (isTemplate(styles)) {
    return css(joinTemplate(styles, ...values))
  }
  return new Styles(parser.parse(toString(styles)))
}

/** Declare global styles */
export const glob = (...args: CssTemplate["Args"]) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions -- has side effects
  css(...args).withConfig({ type: "global" }).class
}

/** keyframes function for defining animations */
export const keyframes = (...args: CssTemplate["Args"]) =>
  css(...args).withConfig({ type: "keyframes" }).class
