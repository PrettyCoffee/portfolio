import { useSyncExternalStore } from "react"

import { getWindow } from "utils/get-window"

const getSnapshot = () =>
  getWindow()?.document.documentElement.scrollHeight ?? 0

const subscribe = (listener: () => void) => {
  const observer = new ResizeObserver(listener)
  observer.observe(window.document.documentElement)
  return () => observer.disconnect()
}

export const useDocumentHeight = () =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
