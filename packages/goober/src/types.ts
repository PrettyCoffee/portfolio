export type Conditional<T> = T | false | null | undefined

type TemplateArgs<TValue> = [TemplateStringsArray, ...values: TValue[]]

export interface Template<TValue> {
  Args: TemplateArgs<TValue>
  Fn: (...args: TemplateArgs<TValue>) => string
}
