"use client"

import { RefObject, useEffect, useRef } from "react"

import { createInterval } from "utils/create-interval"
import { prefersReducedMotion } from "utils/preferes-reduced-motion"

const TIMING = prefersReducedMotion()
  ? {
      type: 500,
      delete: 1,
    }
  : {
      type: 100,
      delete: 50,
    }

const useTypewriter = (
  ref: RefObject<HTMLSpanElement | null>,
  { text, initial = text, onTransitionEnd }: TypewriterProps
) => {
  const last = useRef(initial)

  useEffect(() => {
    if (text === last.current) return

    let canceled = false
    let cancel: undefined | (() => void)

    const update = (text = last.current) => {
      last.current = text
      if (!ref.current) return
      ref.current.innerHTML = last.current
    }

    if (prefersReducedMotion()) {
      update(text)
      onTransitionEnd?.()
      return
    }

    const writeNext = async () => {
      if (canceled) return

      let cursor = 0
      const typing = createInterval({
        ms: TIMING.type,
        tick: ({ stop }) => {
          update(text.slice(0, ++cursor))
          if (cursor === text.length) stop()
        },
      })

      cancel = typing.clear
      return typing
    }

    const deleteLast = async () => {
      if (canceled || !last.current) return

      let cursor = last.current.length
      const deleting = createInterval({
        ms: TIMING.delete,
        tick: ({ stop }) => {
          update(last.current.slice(0, --cursor))
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
  }, [onTransitionEnd, ref, text])

  // eslint-disable-next-line react-hooks/refs -- hook takes care of updating, this is just to display an initial value
  return last.current
}

interface TypewriterProps {
  text: string
  initial?: string
  onTransitionEnd?: () => void
}

export const Typewriter = (props: TypewriterProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const current = useTypewriter(ref, props)
  return <span ref={ref}>{current}</span>
}
