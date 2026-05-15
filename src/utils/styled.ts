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

const getClass = (styles: Conditional<string>[] | Conditional<string>) => {
  const joined = truthy([styles].flat())
    .map(style => style.trim())
    .filter(Boolean)
    .join("\n")
  return !joined ? undefined : css(joined)
}

const createComponent = <TProps extends ClassNameProp>(
  element: keyof JSX.IntrinsicElements | ComponentType<TProps>,
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

export const styled = <
  TElement extends keyof JSX.IntrinsicElements | ComponentType<any> =
    ComponentType<PropsWithChildren>,
>(
  element: TElement = Slot as TElement
) => {
  type TProps = ComponentProps<TElement>
  type DynamicArgs = [GetDynamicStyles<TProps>]
  type StaticArgs = [
    strings: TemplateStringsArray,
    ...values: (string | number)[],
  ]

  return (...args: StaticArgs | DynamicArgs) => {
    if (Array.isArray(args[0])) {
      const staticStyles = plainCss(...(args as StaticArgs))
      return createComponent(element, getClass(staticStyles))
    }

    const getDynamicClass = (props: TProps) => {
      const [get] = args as DynamicArgs
      const styles = get({ css: plainCss, ...props })
      return getClass(styles)
    }

    return createComponent(element, getDynamicClass)
  }
}
