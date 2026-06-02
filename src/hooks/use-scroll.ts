import { useCallback, useEffect, useRef, useSyncExternalStore } from "react"

import { clamp } from "utils/clamp"
import { getWindow } from "utils/get-window"
import { prefersReducedMotion } from "utils/preferes-reduced-motion"

const subscribe = (listener: () => void) => {
  window.addEventListener("scroll", listener)
  return () => window.addEventListener("scroll", listener)
}

const getState = (scrollY: number, start: number, end: number) => {
  const relative = Math.round(clamp(scrollY, start, end) - start)
  const max = end - start
  const percent = Number.parseFloat((relative / max).toFixed(5))
  return { relative, percent }
}

interface ScrollState {
  relative: number
  percent: number
}
interface ScrollOptions {
  start: number
  end: number
  onScroll: (state: ScrollState) => void
}
export const useScroll = ({ start, end, onScroll }: ScrollOptions) => {
  const getClampedScrollY = useCallback(() => {
    const scrollY = Math.round(getWindow()?.scrollY ?? 0)
    return clamp(scrollY, start, end)
  }, [end, start])

  const scrollY = useSyncExternalStore(
    subscribe,
    getClampedScrollY,
    getClampedScrollY
  )
  const { percent, relative } = getState(scrollY, start, end)

  const scrollEvent = useRef(onScroll)
  useEffect(() => {
    scrollEvent.current = onScroll
  }, [onScroll])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const frame = window.requestAnimationFrame(() =>
      scrollEvent.current({ percent, relative })
    )
    return () => window.cancelAnimationFrame(frame)
  }, [percent, relative])
}
