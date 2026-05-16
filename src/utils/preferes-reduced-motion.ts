const getWindow = () => {
  if ("window" in globalThis) return globalThis.window
  return undefined
}

export const prefersReducedMotion = () => {
  const window = getWindow()
  return !window
    ? false
    : !window.matchMedia("(prefers-reduced-motion: no-preference)").matches
}
