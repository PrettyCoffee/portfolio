export const GOOBER_ID = "_goober"

export type Sheet = (Element | {}) & { id?: string; data?: string }
const ssr: Sheet = {
  data: "",
}

const getStyleElement = () => {
  const existing = (window as { _goober?: Sheet })[GOOBER_ID]
  if (existing) return existing

  const style: Sheet = document.createElement("style")
  style.id = GOOBER_ID
  style.data = ""
  return style
}

/** Returns the node to inject styles, or an ssr object, to collect styles */
export const getSheet = (): Sheet => {
  if (typeof window === "object") {
    const style = getStyleElement()
    if (style instanceof Element && style.parentNode)
      document.head.appendChild(style)
    return style
  }

  return ssr
}
