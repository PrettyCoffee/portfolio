import type { JSX } from "react"

import { css } from "./css.js"
import { recipe, RecipeFactory } from "./recipe.js"
import { getSetup } from "./setup.js"
import { CssTemplate, isTemplate, Resolve } from "./types.js"

type VNode = Iterable<VNode> | JSX.Element | string | boolean | null | undefined
interface FC<TProps = {}> {
  (props: TProps): VNode | Promise<VNode>
  displayName?: string | undefined
}

type ElementName = keyof JSX.IntrinsicElements
type ElementType = ElementName | FC<any> | SFC<any, any>

type PropsOf<T extends ElementType> =
  T extends SFCMeta<infer TTypeProps, infer TProps>
    ? TProps & TTypeProps
    : T extends FC<infer TProps>
      ? TProps
      : T extends keyof JSX.IntrinsicElements
        ? JSX.IntrinsicElements[T]
        : never

interface StyledContext<TProps extends object = object> {
  filterProps: (keyof TProps)[]
}

type StyledProps<
  TType extends ElementType = ElementType,
  TProps extends object = object,
> = Resolve<{ as?: TType } & TProps & Omit<PropsOf<TType>, "as">>

interface SFCMeta<TTypeProps extends object, TStyledProps extends object> {
  /** @deprecated Internal prop for type preservation, don't use this in your app */
  z__defaultTypeProps?: TTypeProps
  /** @deprecated Internal prop for type preservation, don't use this in your app */
  z__styledProps?: TStyledProps
}

interface SFC<
  TDefaultType extends ElementType = ElementType,
  TProps extends object = object,
> extends SFCMeta<PropsOf<TDefaultType>, TProps> {
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
      "goober.styled expected setup to provide a jsx function, but none was there. Did you call `setup({ jsx: ... })`?"
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

function createStyled<TDefaultType extends ElementType>(
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

type ProxyTarget = {
  [TKey in ElementName]: StyledFactory<TKey>
} & (<TType extends FC<any>>(type: TType) => StyledFactory<TType>)

/** Create React components that have styles attached to them */
export const styled = new Proxy(createStyled as ProxyTarget, {
  get(_, prop: ElementName) {
    return createStyled(prop)
  },
})
