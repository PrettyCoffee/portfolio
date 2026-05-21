import { type Sheet } from "./get-sheet"
import { toHash } from "./to-hash"
import { update } from "./update"
import { parser, type AstNode } from "../parser"

/** In-memory cache. */
const cache: Record<string, string> = {}

/** Stringifies an object structure */
const getIdentifier = (data: AstNode | string | undefined): string => {
  if (typeof data == "object") {
    let out = ""
    for (const key in data) out += key + getIdentifier(data[key])
    return out
  } else {
    return data ?? ""
  }
}

const createClassName = (compiled: AstNode | string) => {
  const identifier = getIdentifier(compiled)
  return (cache[identifier] ??= toHash(identifier))
}

export type InjectionType = "class" | "global" | "keyframes"

const createStyles = (
  className: string,
  compiled: AstNode | string,
  type: InjectionType
) => {
  if (cache[className]) return cache[className]
  const ast = typeof compiled === "string" ? parser.parse(compiled) : compiled
  return parser.stringify(
    type === "keyframes" ? { [`@keyframes ${className}`]: ast } : ast,
    type === "global" ? null : `.${className}`
  )
}

/** Generates the needed className
 *  @param compiled Css to process
 *  @param sheet StyleSheet target
 *  @param append Append or prepend
 *  @param type What kind of css needs to be injected
 */
export const hash = (
  compiled: AstNode | string,
  sheet: Sheet,
  append?: boolean,
  type: InjectionType = "class"
) => {
  const className = createClassName(compiled)
  const styles = createStyles(className, compiled, type)

  // If the global flag is set, save the current stringified and compiled CSS to `cache.g`
  // to allow replacing styles in <style /> instead of appending them.
  // This is required for using `createGlobalStyles` with themes
  const cssToReplace = type === "global" ? cache["g"] : undefined
  if (type === "global") cache["g"] = styles

  update(styles, sheet, append, cssToReplace)
  return className
}
