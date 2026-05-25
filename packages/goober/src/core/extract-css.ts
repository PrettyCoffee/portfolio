import { getSetup } from "./setup"
import { getStyleCache, GOOBER_ID } from "../utils/get-sheet"

/** Returns css after changes settled */
export const extractCss = () =>
  new Promise(resolve => {
    let css = getStyleCache().data

    const resolveIfSettled = () => {
      globalThis.queueMicrotask(() => {
        const newCss = getStyleCache().data
        if (newCss !== css) {
          css = newCss
          resolveIfSettled()
        } else {
          resolve(css)
        }
      })
    }

    resolveIfSettled()
  })

/** Renders a goober style element with the cached styles */
export const ExtractCss = async () =>
  getSetup().jsx("style", { id: GOOBER_ID }, await extractCss())
