import { Styles, StylesConfig } from "./core/styles"
import { StyleNode, parser } from "./parser"
import { Conditional, Template } from "./types"

type TemplateValue =
  | Conditional<Styles | StyleNode | string | number>
  | Conditional<Styles | StyleNode | string | number>[]
type CssTemplate = Template<TemplateValue>

const toString = (value: TemplateValue): string => {
  if (value == null || value == false) return ""
  if (Array.isArray(value)) return value.map(toString).join(" ")
  if (value instanceof Styles) return toString(value.styles)
  return typeof value === "object" ? parser.stringify(value) : String(value)
}
const joinTemplate: CssTemplate["Fn"] = (strings, ...values) =>
  strings.flatMap((string, index) => [string, toString(values[index])]).join("")

const isTemplate = (value: unknown): value is TemplateStringsArray =>
  Array.isArray(value) && "raw" in value

/** Create styles, inject them into the DOM, and generate a css class. */
export function css(styles: TemplateValue): Styles
export function css(...args: CssTemplate["Args"]): Styles
export function css(
  this: StylesConfig | void,
  ...args: [TemplateValue] | CssTemplate["Args"]
) {
  const [styles, ...values] = args

  if (isTemplate(styles)) {
    return css(joinTemplate(styles, ...values))
  }
  return new Styles(parser.parse(toString(styles)), this)
}

/** Declare global styles */
export const glob = (...args: CssTemplate["Args"]) =>
  css.bind({ type: "global" })(...args).class

/** keyframes function for defining animations */
export const keyframes = (...args: CssTemplate["Args"]) =>
  css.bind({ type: "keyframes" })(...args).class
