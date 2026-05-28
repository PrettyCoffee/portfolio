import { useSyncExternalStore } from "react"

import { getWindow } from "utils/get-window"

const getSnapshot = () => getWindow()?.innerHeight ?? 0

const subscribe = (listener: () => void) => {
  window.addEventListener("resize", listener)
  return () => window.removeEventListener("resize", listener)
}

export const useWindowHeight = () =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
