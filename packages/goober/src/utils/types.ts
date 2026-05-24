import { StyleNode } from "./parser"
import { Styles } from "./styles"

export type Resolve<T> = { [K in keyof T]: T[K] } & {}

export type Conditional<T> = T | false | null | undefined

type TemplateArgs<TValue> = [TemplateStringsArray, ...values: TValue[]]

export interface Template<TValue> {
  Value: TValue
  Args: TemplateArgs<TValue>
  Fn: (...args: TemplateArgs<TValue>) => string
}

export type CssTemplate = Template<
  | Conditional<Styles | StyleNode | string | number>
  | Conditional<Styles | StyleNode | string | number>[]
>

export const isTemplate = (value: unknown): value is TemplateStringsArray =>
  Array.isArray(value) && "raw" in value
