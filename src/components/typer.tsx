"use client"

import { useEffect, useState } from "react"

import { keyframes } from "goober"

import { styled } from "utils/styled"
import { theme } from "utils/theme"

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const blink = keyframes`
  0% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`

const Carret = styled("span")`
  display: inline-block;
  width: 1ch;
  height: 1.125em;
  border-bottom: 0.0625em solid ${theme("text.base")};
  margin-left: 0.125em;
  animation: ${blink} 0.7s infinite;
`

const Layout = styled("span")`
  position: relative;
`

const SpaceBlocker = styled("span")`
  opacity: 0;
  pointer-events: none;
  user-select: none;
`

const VisibleText = styled("span")`
  position: absolute;
  left: 0;
`

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

interface TimeoutProps {
  tick: () => void
  ms: number
}
const timeout = ({ ms, tick }: TimeoutProps) => {
  let resolveFn = noop
  let id = 0
  const stop = () => {
    window.clearTimeout(id)
    resolveFn()
  }

  const promise = new Promise<void>(resolve => {
    resolveFn = resolve
    id = window.setTimeout(() => {
      tick()
      resolve()
    }, ms)
  })

  return Object.assign(promise, { clear: stop })
}

const TIMING = {
  type: 100,
  delete: 50,
  wait: 2000,
}

interface TyperProps {
  values: string[]
}

export const Typer = ({ values }: TyperProps) => {
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const word = values[index] ?? ""

  useEffect(() => {
    let canceled = false
    let cancel: undefined | (() => void)

    const typing = async () => {
      if (canceled) return

      let cursor = 0
      const typing = interval({
        ms: TIMING.type,
        tick: ({ stop }) => {
          setText(word.slice(0, ++cursor))
          if (cursor === word.length) stop()
        },
      })

      cancel = typing.clear
      return typing
    }

    const waiting = async () => {
      if (canceled) return
      const waiting = timeout({ ms: TIMING.wait, tick: noop })
      cancel = waiting.clear
      await waiting
    }

    const deleting = async () => {
      if (canceled) return

      let cursor = word.length
      const deleting = interval({
        ms: TIMING.delete,
        tick: ({ stop }) => {
          setText(word.slice(0, --cursor))
          if (cursor === 0) stop()
        },
      })

      cancel = deleting.clear
      return deleting
    }

    const loop = async () => {
      await typing()
      await waiting()
      await deleting()
      if (canceled) return
      setIndex((index + 1) % values.length)
    }
    void loop()

    return () => {
      canceled = true
      cancel?.()
    }
  }, [index, values.length, word])

  const maxText = values.reduce(
    (max, current) => (current.length > max.length ? current : max),
    ""
  )

  return (
    <Layout>
      <SpaceBlocker aria-hidden>
        {maxText}
        <Carret />
      </SpaceBlocker>
      <VisibleText>
        {text}
        <Carret />
      </VisibleText>
    </Layout>
  )
}
