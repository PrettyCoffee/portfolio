import { getWindow } from "./get-window"

export const GOOBER_ID = "_goober"

type StyleUpdate = (data: string) => string
const cache = {
  queue: [] as StyleUpdate[],
  data: "",
}

/** Returns the text node to inject styles, or an object for ssr environments, to collect styles */
export const getStyleCache = () => cache

const getDomSheet = () => {
  const existing = document.querySelector(`#${GOOBER_ID}`)
  if (existing) return existing.firstChild as Text

  const style = document.createElement("style")
  style.innerHTML = " "
  document.head.appendChild(style)
  return style.firstChild as Text
}

let isQueued = false
const flushStyleQueue = () => {
  if (isQueued) return
  isQueued = true

  // Defer on the client to be executed later in the event loop.
  // This allows waiting for the initial dom to be rendered, to inject css in exisitng style nodes, if there is one.
  window.setTimeout(() => {
    const sheet = getDomSheet()
    while (cache.queue.length > 0) {
      const update = cache.queue.shift()
      if (update) sheet.data = update(sheet.data)
    }
  }, 1)
}

export const updateSheet = (updater: StyleUpdate) => {
  cache.data = updater(cache.data)
  if (getWindow()) {
    cache.queue.push(updater)
    flushStyleQueue()
  }
}
