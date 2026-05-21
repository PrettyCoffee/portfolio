import { Styles, StylesConfig } from "./core/styles"
import { Conditional } from "./types"

type RecipeFactory<TProps extends object> = (
  props: TProps
) => Conditional<Styles | 0> | Conditional<Styles | 0>[]

export function recipe<TProps extends object>(
  this: StylesConfig | void,
  create: RecipeFactory<TProps>
) {
  return (props: TProps): Styles => {
    const styles = [create(props)].flat().filter(style => !!style)
    return styles.reduce((result, style) => result.append(style.styles))
  }
}
