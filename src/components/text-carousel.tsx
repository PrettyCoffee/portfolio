"use client"

import { useEffect, useRef, useState } from "react"

import { keyframes } from "goober"

import { prefersReducedMotion } from "utils/preferes-reduced-motion"
import { styled } from "utils/styled"
import { theme } from "utils/theme"

import { Typewriter } from "./typewriter"

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
  @media (prefers-reduced-motion: no-preference) {
    animation: ${blink} 0.7s infinite;
  }
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

const WAIT_DURATION = prefersReducedMotion() ? 4000 : 2000

interface TextCarouselProps {
  values: string[]
}

export const TextCarousel = ({ values }: TextCarouselProps) => {
  const timeout = useRef(0)
  const [index, setIndex] = useState(0)
  const word = values[index] ?? ""

  useEffect(() => () => window.clearTimeout(timeout.current), [])

  const maxText = values.reduce(
    (max, current) => (current.length > max.length ? current : max),
    ""
  )

  return (
    <Layout>
      <SpaceBlocker aria-hidden inert>
        {maxText}
        <Carret />
      </SpaceBlocker>

      <VisibleText>
        <Typewriter
          text={word}
          onTransitionEnd={() => {
            timeout.current = window.setTimeout(
              () => setIndex((index + 1) % values.length),
              WAIT_DURATION
            )
          }}
        />
        <Carret />
      </VisibleText>
    </Layout>
  )
}
