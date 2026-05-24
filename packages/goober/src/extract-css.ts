import { getSheet, GOOBER_ID } from "./core/get-sheet"
import { getSetup } from "./setup"

/** Returns the cache */
export const extractCss = () => getSheet().data ?? ""

/** Renders a goober style element with the cached styles */
export const ExtractCss = () =>
  getSetup().jsx("style", { id: GOOBER_ID }, extractCss())
