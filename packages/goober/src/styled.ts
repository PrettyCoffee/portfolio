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

interface StyledContext<TProps extends object = object> {
  filterProps: (keyof TProps)[]
}

type StyledProps<
  TType extends ElementType = ElementType,
  TProps extends object = object,
> = Omit<ComponentPropsWithRef<TType>, "as"> & TProps & { as?: TType }

interface SFC<
  TDefaultType extends ElementType = ElementType,
  TProps extends object = object,
> {
  <TType extends ElementType = TDefaultType>(
    this: StyledContext<TProps> | void,
    props: StyledProps<TType, TProps>
  ): VNode | Promise<VNode>

  displayName: string | undefined
  filterProps: (filter: (keyof TProps)[]) => SFC<TDefaultType, TProps>
}

type StyledFactory<TDefaultType extends ElementType> = <
  TProps extends object = {},
>(
  ...args: CssTemplate["Args"] | [RecipeFactory<TProps>]
) => SFC<TDefaultType, TProps>

const createComponent = (
  defaultType: ElementType,
  getClass: (props: object) => string
) => {
  const { jsx } = getSetup()
  if (!jsx) {
    throw new Error(
      "goober.styled expected setup to provide an h function, but none was there. Did you call `setup({ h: ... })`?"
    )
  }

  const getProps = (props: StyledProps, filterProps: string[] = []) => {
    // TODO: Check if appending is relevant here
    // const prev = (props as { className?: string | undefined }).className
    // const append = prev && / *go\d+/.test(prev)

    const fwdProps = { ...props }
    filterProps.forEach(key => delete fwdProps[key])

    return {
      ...getSetup().filterProps(fwdProps),
      className: [getClass(props), (props as { className?: string }).className]
        .filter(Boolean)
        .join(" "),
    }
  }

  function Component(
    this: StyledContext | void,
    { as, ...props }: StyledProps
  ) {
    return jsx!(as ?? defaultType, getProps(props, this?.filterProps))
  }

  const typeName =
    typeof defaultType === "string"
      ? defaultType
      : (defaultType.displayName ?? "")
  const displayName = "styled(" + typeName + ")"

  const styledComponent = Object.assign(Component, {
    displayName,
    filterProps: (filterProps: (keyof object)[]) =>
      styledComponent.bind({ filterProps }),
  })

  return styledComponent
}

/** Create React components that have styles attached to them */
export function styled<TDefaultType extends ElementType>(
  defaultType: TDefaultType
) {
  const createStaticStyled = (...args: CssTemplate["Args"]) => {
    const styles = css(...args)
    const className = styles.class
    return createComponent(defaultType, () => className)
  }

  const createDynamicStyled = (recipeFn: RecipeFactory) => {
    const styles = recipe(recipeFn)
    return createComponent(defaultType, (props: object) => styles(props).class)
  }

  const factory = (
    ...[styles, ...values]: CssTemplate["Args"] | [RecipeFactory]
  ) => {
    if (isTemplate(styles)) {
      return createStaticStyled(styles, ...values)
    } else {
      return createDynamicStyled(styles)
    }
  }

  return factory as StyledFactory<TDefaultType>
}
