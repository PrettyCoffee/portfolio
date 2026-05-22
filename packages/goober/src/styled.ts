import type { ComponentPropsWithRef, JSX } from "react"

import { css } from "./css.js"
import { recipe, RecipeFactory } from "./recipe.js"
import { getSetup } from "./setup.js"
import { CssTemplate, isTemplate } from "./types.js"

type VNode = Iterable<VNode> | JSX.Element | string | boolean | null | undefined
interface FC<TProps = {}> {
  (props: TProps): VNode | Promise<VNode>
  displayName?: string | undefined
}

type ElementName = keyof JSX.IntrinsicElements
type ElementType = ElementName | FC<any>

const getProps = (props: object, getClass: (props: object) => string) => {
  // TODO: Check if appending is relevant here
  // const prev = (props as { className?: string | undefined }).className
  // const append = prev && / *go\d+/.test(prev)

  const { filterProps } = getSetup()
  return {
    ...filterProps(props),
    className: [
      getClass(props),
      (props as { className?: string | undefined }).className,
    ]
      .filter(Boolean)
      .join(" "),
  }
}

const createComponent = <TDefaultType extends ElementType>(
  defaultType: TDefaultType,
  getClass: (props: object) => string
) => {
  const { jsx } = getSetup()
  if (!jsx) {
    throw new Error(
      "goober.styled expected setup to provide an h function, but none was there. Did you call `setup({ h: ... })`?"
    )
  }

  const component = <TType extends ElementType = TDefaultType>({
    as,
    ...props
  }: StyledProps<TType>) => jsx(as ?? defaultType, getProps(props, getClass))

  const parentName =
    typeof defaultType === "string"
      ? defaultType
      : (defaultType.displayName ?? "")

  return Object.assign(component, { displayName: "styled(" + parentName + ")" })
}

const createStaticStyled = (
  defaultType: ElementType,
  ...args: CssTemplate["Args"]
) => {
  const styles = css(...args)
  const className = styles.class
  return createComponent(defaultType, () => className)
}

const createDynamicStyled = (
  defaultType: ElementType,
  recipeFn: RecipeFactory<object>
) => {
  const styles = recipe(recipeFn)
  return createComponent(defaultType, (props: object) => styles(props).class)
}

type StyledProps<TType extends ElementType> = Omit<
  ComponentPropsWithRef<TType>,
  "as"
> & {
  as?: TType
}
type StyledFactory<TDefaultType extends ElementType> = <
  TProps extends object = {},
>(
  ...args: CssTemplate["Args"] | [RecipeFactory<TProps>]
) => <TType extends ElementType = TDefaultType>(
  props: StyledProps<TType> & TProps
) => VNode

/** Create React components that have styles attached to them */
export function styled<TDefaultType extends ElementType>(type: TDefaultType) {
  const factory: StyledFactory<TDefaultType> = (...[styles, ...values]) => {
    if (isTemplate(styles)) {
      return createStaticStyled(type, styles, ...values)
    } else {
      return createDynamicStyled(type, styles as RecipeFactory<object>)
    }
  }

  return factory
}
