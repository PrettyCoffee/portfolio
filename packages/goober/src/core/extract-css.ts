import { getSetup } from "./setup"
import { getStyleCache, GOOBER_ID } from "../utils/get-sheet"

/** Returns the cache */
export const extractCss = () => getStyleCache().data

/** Renders a goober style element with the cached styles */
export const ExtractCss = () =>
  getSetup().jsx("style", { id: GOOBER_ID }, extractCss())
