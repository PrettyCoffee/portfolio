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

type GetClientCss<TProps> = (
  props: TProps
) => Conditional<string>[] | Conditional<string>

interface ClassNameProp {
  className?: string
}

const createComponent = <TProps extends ClassNameProp>(
  element: keyof JSX.IntrinsicElements | ComponentType<TProps>,
  ssrClasses: string,
  clientClasses: GetClientCss<TProps>[]
) => {
  const getClientCss = (props: TProps) =>
    truthy(clientClasses.flatMap(get => get(props))).join(" ")

  const Component = (props: TProps) =>
    createElement(
      element,
      {
        ...props,
        className: clsx(ssrClasses, getClientCss(props), props.className),
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
  type HybridArgs = Conditional<GetClientCss<TProps> | string>[]
  type TagTemplateArgs = [
    strings: TemplateStringsArray,
    ...values: (string | number)[],
  ]

  return (...args: TagTemplateArgs | HybridArgs) => {
    if (Array.isArray(args[0])) {
      const ssrClasses = css(...(args as TagTemplateArgs))
      return createComponent(element, ssrClasses, [])
    }

    const { ssrClasses, clientClasses } = truthy(args as HybridArgs).reduce(
      (result, arg) => {
        if (typeof arg === "string") {
          result.ssrClasses = clsx(result.ssrClasses, arg)
        } else {
          result.clientClasses.push(arg)
        }
        return result
      },
      {
        ssrClasses: "",
        clientClasses: [] as GetClientCss<TProps>[],
      }
    )

    return createComponent(element, ssrClasses, clientClasses)
  }
}
