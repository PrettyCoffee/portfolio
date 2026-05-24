import { updateSheet } from "./get-sheet"
import { toHash } from "./to-hash"
import { parser, type StyleNode } from "../parser"

/** In-memory cache. */
const cache: Record<string, string> = {}

/** Stringifies an object structure */
const getIdentifier = (data: StyleNode | string | undefined): string => {
  if (typeof data !== "object") return data ?? ""
  let out = ""
  for (const key in data) out += key + getIdentifier(data[key])
  return out
}

const createClassName = (compiled: StyleNode | string) => {
  const identifier = getIdentifier(compiled)
  return (cache[identifier] ??= toHash(identifier))
}

export type InjectionType = "class" | "global" | "keyframes"

const createStyles = (
  className: string,
  compiled: StyleNode | string,
  type: InjectionType
) => {
  if (cache[className]) return cache[className]
  const ast = typeof compiled === "string" ? parser.parse(compiled) : compiled
  return parser.stringify(
    type === "keyframes" ? { [`@keyframes ${className}`]: ast } : ast,
    type === "global" ? null : `.${className}`
  )
}

const update = (css: string, append?: boolean, cssToReplace?: string) => {
  updateSheet(data => {
    if (data.includes(css)) return data
    if (cssToReplace) return data.replace(cssToReplace, css)
    return append ? css + data : data + css
  })
}

/** Generates the needed className
 *  @param compiled Css to process
 *  @param sheet StyleSheet target
 *  @param append Append or prepend
 *  @param type What kind of css needs to be injected
 */
export const hash = (
  compiled: StyleNode | string,
  append?: boolean,
  type: InjectionType = "class"
) => {
  const className = createClassName(compiled)
  const styles = createStyles(className, compiled, type)

  // If the global flag is set, save the current stringified and compiled CSS to `cache.g`
  // to allow replacing styles in <style /> instead of appending them.
  // This is required for using `createGlobalStyles` with themes
  if (type === "global") {
    update(styles, append, cache["g"])
    cache["g"] = styles
  } else {
    update(styles, append)
  }

  return className
}
