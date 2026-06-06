import { Dispatch, RefObject, useEffect, useRef } from "react"

const MIN_SWIPE_DELTA = 48

interface SwipeProps {
  ref: RefObject<HTMLElement | null>
  onSwipeLeft?: Dispatch<TouchEvent>
  onSwipeRight?: Dispatch<TouchEvent>
}
export const useSwipe = ({ ref, onSwipeLeft, onSwipeRight }: SwipeProps) => {
  const swipe = useRef({ left: onSwipeLeft, right: onSwipeRight })
  useEffect(() => {
    swipe.current = { left: onSwipeLeft, right: onSwipeRight }
  }, [onSwipeLeft, onSwipeRight])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let touchStart: Touch | null = null
    let touchEnd: Touch | null = null

    const getTouch = (event: TouchEvent) => {
      const [touch, ...rest] = event.targetTouches
      return !touch || rest.length > 0 ? null : touch
    }

    const onTouchStart = (event: TouchEvent) => {
      touchStart = getTouch(event)
      touchEnd = null
    }

    const onTouchMove = (event: TouchEvent) => {
      touchEnd = getTouch(event)
    }

    const onTouchEnd = (event: TouchEvent) => {
      if (!touchStart || !touchEnd) return

      const deltaX = touchStart.clientX - touchEnd.clientX
      const deltaY = touchStart.clientY - touchEnd.clientY
      if (Math.abs(deltaY) >= Math.abs(deltaX)) return

      if (deltaX > MIN_SWIPE_DELTA) {
        swipe.current.left?.(event)
      }
      if (deltaX < -MIN_SWIPE_DELTA) {
        swipe.current.right?.(event)
      }
    }

    element.addEventListener("touchstart", onTouchStart)
    element.addEventListener("touchmove", onTouchMove)
    element.addEventListener("touchend", onTouchEnd)

    return () => {
      element.removeEventListener("touchstart", onTouchStart)
      element.removeEventListener("touchmove", onTouchMove)
      element.removeEventListener("touchend", onTouchEnd)
    }
  }, [ref])
}
