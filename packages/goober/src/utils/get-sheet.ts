import { getWindow } from "./get-window"

export const GOOBER_ID = {
  SSR: "_goober__ssr",
  CSR: "_goober__csr",
}

const ssrCache = { data: "" }

const getDomSheet = (id: string) =>
  getWindow()?.document.querySelector(`#${id}`)?.firstChild as Text | null

/** Returns the text node or an object for ssr environments, to collect styles */
export const getSsrSheet = () => {
  // SSR DOM sheet can only be read in CSR and is static in CSR, so this only needs to be checked if empty
  if (!ssrCache.data) ssrCache.data = getDomSheet(GOOBER_ID.SSR)?.data || ""
  return ssrCache
}

const getCsrSheet = () => {
  const existing = getDomSheet(GOOBER_ID.CSR)
  if (existing) return existing

  const style = document.createElement("style")
  style.id = GOOBER_ID.CSR
  style.innerHTML = " "
  document.head.appendChild(style)
  return style.firstChild as Text
}

type StyleUpdate = (data: string, secondary?: string) => string
export const updateSheet = (updater: StyleUpdate) => {
  if (!getWindow()) {
    ssrCache.data = updater(ssrCache.data)
  } else {
    const ssr = getSsrSheet()
    const csr = getCsrSheet()
    csr.data = updater(csr.data, ssr.data)
  }
}
