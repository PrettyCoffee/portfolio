import { Styles, StylesConfig } from "../utils/styles"
import { Conditional } from "../utils/types"

export type RecipeFactory<TProps extends object = object> = (
  props: TProps
) => Conditional<Styles | 0> | Conditional<Styles | 0>[]

/** Create dynamic style recipes that can be adjusted via props */
export function recipe<TProps extends object>(
  this: StylesConfig | void,
  create: RecipeFactory<TProps>
) {
  return (props: TProps): Styles => {
    const styles = [create(props)].flat().filter(style => !!style)
    return styles.reduce((result, style) => result.append(style.styles))
  }
}
