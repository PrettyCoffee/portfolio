import { getSheet } from "./core/get-sheet"
import { hash, InjectionType } from "./core/hash"
import { StyleNode, parser } from "./parser"

type Conditional<T> = T | false | null | undefined

interface Context {
  type?: InjectionType
  append?: boolean
}

const merge = (a: StyleNode | string | undefined, b: StyleNode) => {
  if (typeof a !== "object") return b

  return Object.entries(b).reduce((merged, [key, value]) => {
    if (typeof value === "object") {
      merged[key] = merge(merged[key], value)
    } else if (value) {
      merged[key] = value
    }
    return merged
  }, a)
}

class Styles {
  constructor(
    public readonly styles: StyleNode,
    private readonly config: Context | void
  ) {}

  public get class() {
    const { append, type } = this.config ?? {}
    return hash(this.styles, getSheet(), append, type)
  }

  public append(styles: StyleNode) {
    return new Styles(merge(this.styles, styles), this.config)
  }

  public toString() {
    return parser.stringify(this.styles)
  }
}

type TemplateValue =
  | Conditional<Styles | StyleNode | string | number>
  | Conditional<Styles | StyleNode | string | number>[]
type TemplateArgs = [TemplateStringsArray, ...values: TemplateValue[]]
type TemplateFn = (...args: TemplateArgs) => string

const toString = (value: TemplateValue): string => {
  if (value == null || value == false) return ""
  if (Array.isArray(value)) return value.map(toString).join(" ")
  if (value instanceof Styles) return toString(value.styles)
  return typeof value === "object" ? parser.stringify(value) : String(value)
}
const joinTemplate: TemplateFn = (strings, ...values) =>
  strings.flatMap((string, index) => [string, toString(values[index])]).join("")

const isTemplate = (value: unknown): value is TemplateStringsArray =>
  Array.isArray(value) && "raw" in value

/** Create styles, inject them into the DOM, and generate a css class. */
export function css(styles: TemplateValue): Styles
export function css(...args: TemplateArgs): Styles
export function css(
  this: Context | void,
  ...args: [TemplateValue] | TemplateArgs
) {
  const [styles, ...values] = args

  if (isTemplate(styles)) {
    return css(joinTemplate(styles, ...values))
  }
  return new Styles(parser.parse(toString(styles)), this)
}

/** Declare global styles */
export const glob = (...args: TemplateArgs) =>
  css.bind({ type: "global" })(...args).class

/** keyframes function for defining animations */
export const keyframes = (...args: TemplateArgs) =>
  css.bind({ type: "keyframes" })(...args).class
