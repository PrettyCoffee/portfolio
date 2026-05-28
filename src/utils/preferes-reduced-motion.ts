import { getWindow } from "./get-window"

export const prefersReducedMotion = () => {
  const window = getWindow()
  return !window
    ? false
    : !window.matchMedia("(prefers-reduced-motion: no-preference)").matches
}
