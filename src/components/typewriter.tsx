"use client"

import { useEffect, useRef, useState } from "react"

import { prefersReducedMotion } from "utils/preferes-reduced-motion"

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

interface IntervalProps {
  tick: (props: { stop: () => void }) => void
  ms: number
}
const interval = ({ ms, tick }: IntervalProps) => {
  let resolveFn = noop
  let id = 0
  const stop = () => {
    window.clearInterval(id)
    resolveFn()
  }

  const promise = new Promise<void>(resolve => {
    resolveFn = resolve
    id = window.setInterval(() => {
      tick({ stop })
    }, ms)
  })

  return Object.assign(promise, { clear: stop })
}

const TIMING = prefersReducedMotion()
  ? {
      type: 500,
      delete: 1,
      wait: 4000,
    }
  : {
      type: 100,
      delete: 50,
      wait: 2000,
    }

interface TypewriterProps {
  text: string
  initial?: string
  onTransitionEnd?: () => void
}

export const Typewriter = ({
  text,
  initial = text,
  onTransitionEnd,
}: TypewriterProps) => {
  const [visible, setVisible] = useState(initial)
  const last = useRef(visible)

  useEffect(() => {
    if (text === last.current) return

    let canceled = false
    let cancel: undefined | (() => void)

    const writeNext = async () => {
      if (canceled) return

      let cursor = 0
      const typing = interval({
        ms: TIMING.type,
        tick: ({ stop }) => {
          const newVisible = text.slice(0, ++cursor)
          setVisible(newVisible)
          last.current = newVisible
          if (cursor === text.length) stop()
        },
      })

      cancel = typing.clear
      return typing
    }

    const deleteLast = async () => {
      if (canceled || !last.current) return

      let cursor = last.current.length
      const deleting = interval({
        ms: TIMING.delete,
        tick: ({ stop }) => {
          setVisible(last.current.slice(0, --cursor))
          if (cursor === 0) stop()
        },
      })

      cancel = deleting.clear
      return deleting
    }

    const deletePromise = !last.current ? Promise.resolve() : deleteLast()
    void deletePromise.then(writeNext).then(onTransitionEnd)

    return () => {
      canceled = true
      cancel?.()
    }
  }, [onTransitionEnd, text])

  return visible
}
