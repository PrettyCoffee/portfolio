/* eslint-disable react/destructuring-assignment */
import {
  ComponentType,
  ComponentProps,
  JSX,
  createElement,
  PropsWithChildren,
  Children,
} from "react"

import { css } from "goober"

import { Slot } from "components/slot"

type Conditional<T> = T | false | null | undefined
const truthy = <T>(values: Conditional<T>[]) => values.filter(Boolean) as T[]
const clsx = (...classes: Conditional<string>[]) => truthy(classes).join(" ")
const plainCss = (
  strings: TemplateStringsArray,
  ...values: (string | number)[]
) => strings.flatMap((string, index) => [string, values[index] || ""]).join("")

type GetDynamicStyles<TProps> = (
  props: TProps & { css: typeof plainCss }
) => Conditional<string>[] | Conditional<string>

interface ClassNameProp {
  className?: string
}

type ElementType = keyof JSX.IntrinsicElements | ComponentType<any>

const getClass = (styles: Conditional<string>[] | Conditional<string>) => {
  const joined = truthy([styles].flat())
    .map(style => style.trim())
    .filter(Boolean)
    .join("\n")
  return !joined ? undefined : css(joined)
}

const createComponent = <TProps extends ClassNameProp>(
  element: ElementType,
  className: ((props: TProps) => string | undefined) | string | undefined
) => {
  const getClassName = (props: TProps) => {
    if (!className) return undefined
    if (typeof className === "string") return className
    return className(props)
  }

  const Component = (props: TProps) =>
    createElement(
      element,
      {
        ...props,
        className: clsx(getClassName(props), props.className),
      },
      ...Children.toArray((props as PropsWithChildren).children)
    )

  const name =
    typeof element === "string"
      ? element
      : element.displayName || element.name || "unknown"

  return Object.assign(Component, { displayName: `styled.${name}` })
}

const createStaticFn = <TElement extends ElementType>(element: TElement) => {
  type TProps = ComponentProps<TElement>

  return (strings: TemplateStringsArray, ...values: (string | number)[]) => {
    const styles = plainCss(strings, ...values)
    const className = getClass(styles)
    const component = createComponent<TProps>(element, className)
    return Object.assign(component, { styles })
  }
}

const createDynamicFn = <TElement extends ElementType>(element: TElement) => {
  type TProps = ComponentProps<TElement>

  return <TAdditionalProps extends object>(
    getStyles: GetDynamicStyles<TProps & TAdditionalProps>
  ) => {
    const styles = (props: TProps & TAdditionalProps) =>
      getStyles({ css: plainCss, ...props })

    const className = (props: TProps & TAdditionalProps) =>
      getClass(styles(props))

    const component = createComponent<TProps & TAdditionalProps>(
      element,
      className
    )
    return Object.assign(component, { styles })
  }
}

export const styled = <
  TElement extends keyof JSX.IntrinsicElements | ComponentType<any> =
    ComponentType<PropsWithChildren>,
>(
  element: TElement = Slot as TElement
) => {
  const staticFn = createStaticFn<TElement>(element)
  type StaticArgs = Parameters<typeof staticFn>
  type StaticResult = ReturnType<typeof staticFn>

  const dynamicFn = createDynamicFn<TElement>(element)
  type DynamicArgs<TAdditionalProps extends object> = Parameters<
    typeof dynamicFn<TAdditionalProps>
  >
  type DynamicResult<TAdditionalProps extends object> = ReturnType<
    typeof dynamicFn<TAdditionalProps>
  >

  function hybrid(...args: StaticArgs): StaticResult
  function hybrid<TAdditionalProps extends object = {}>(
    ...args: DynamicArgs<TAdditionalProps>
  ): DynamicResult<TAdditionalProps>
  function hybrid<TAdditionalProps extends object>(
    ...args: StaticArgs | DynamicArgs<TAdditionalProps>
  ) {
    if (Array.isArray(args[0])) {
      return staticFn(...(args as StaticArgs))
    }
    return dynamicFn(...(args as DynamicArgs<object>))
  }

  return hybrid
}
