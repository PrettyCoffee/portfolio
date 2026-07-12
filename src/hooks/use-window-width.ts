import { useSyncExternalStore } from "react"

import { getWindow } from "utils/get-window"

const getSnapshot = () => getWindow()?.innerWidth ?? 0

const subscribe = (listener: () => void) => {
  window.addEventListener("resize", listener)
  return () => window.removeEventListener("resize", listener)
}

export const useWindowWidth = () =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
