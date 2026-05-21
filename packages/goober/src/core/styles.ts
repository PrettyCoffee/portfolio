import { getSheet } from "./get-sheet"
import { hash, InjectionType } from "./hash"
import { StyleNode, parser } from "../parser"

export interface StylesConfig {
  type?: InjectionType
  append?: boolean
}

const merge = (a: StyleNode | string | undefined, b: StyleNode) => {
  if (typeof a !== "object") return b

  return Object.entries(b).reduce((merged, [key, value]) => {
    if (typeof value === "object") {
      merged[key] = merge(merged[key], value)
    } else if (value) {
      merged[key] = value
    }
    return merged
  }, a)
}

export class Styles {
  constructor(
    public readonly styles: StyleNode,
    private readonly config: StylesConfig | void
  ) {}

  /** Inject the styles into the dom and retrieve a css class */
  public get class() {
    const { append, type } = this.config ?? {}
    return hash(this.styles, getSheet(), append, type)
  }

  /** Append with new styles, merging them deeply */
  public append(styles: StyleNode) {
    return new Styles(merge(this.styles, styles), this.config)
  }

  /** Convert to css style string */
  public toString() {
    return parser.stringify(this.styles)
  }
}
