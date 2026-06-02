"use client"

import { PropsWithChildren, useLayoutEffect, useRef, useState } from "react"

import { css, keyframes, styled } from "lib/goober"

import { SlideDirection, useCarouselContext } from "./carousel-context"

const rightToMiddle = keyframes`
  from {
    translate: 100%;
    scale: 0.5;
  }
  to {
    translate: 0%;
  }
`
const leftToMiddle = keyframes`
  from {
    translate: -100%;
    scale: 0.5;
  }
  to {
    translate: 0%;
  }
`
const middleToRight = keyframes`
  from {
    translate: 0%;
  }
  to {
    translate: 100%;
    scale: 0.5;
  }
`
const middleToLeft = keyframes`
  from {
    translate: 0%;
  }
  to {
    translate: -100%;
    scale: 0.5;
  }
`

const getAnimation = (
  active: boolean,
  previous: boolean,
  direction: SlideDirection
) => {
  if (active) return direction === "left" ? rightToMiddle : leftToMiddle
  if (previous) return direction === "left" ? middleToLeft : middleToRight
  return null
}

const Layout = styled
  .div<{ active: boolean; previous: boolean; direction: SlideDirection }>(
    ({ active, previous, direction }) => {
      const animation = getAnimation(active, previous, direction)
      return [
        css`
          position: absolute;
          inset: 0;
          z-index: ${active ? 1 : 0};
          height: max-content;
          width: 100%;
          min-height: 100%;

          display: flex;
          flex-direction: column;
          justify-content: center;
        `,

        animation &&
          css`
            @media (prefers-reduced-motion: no-preference) {
              animation: ${animation} 300ms alternate forwards;
            }
          `,

        active &&
          previous &&
          css`
            animation-duration: 0ms !important;
          `,

        !active &&
          css`
            translate: -100%;
          `,
      ]
    }
  )
  .filterProps(["active", "previous", "direction"])

const getIndex = (element: HTMLElement | null) => {
  const parent = element?.parentElement
  return !parent ? 0 : [...parent.children].indexOf(element)
}

const getSiblingCount = (element: HTMLElement | null) => {
  const parent = element?.parentElement
  return !parent ? 0 : parent.children.length
}

export interface CarouselItemProps {
  title?: string
}

export const CarouselItem = ({
  children,
}: PropsWithChildren<CarouselItemProps>) => {
  const ref = useRef<HTMLDivElement>(null)
  const { activeIndex, prevIndex, direction } = useCarouselContext()
  const [index, setIndex] = useState(0)

  useLayoutEffect(() => {
    const index = getIndex(ref.current)
    const count = getSiblingCount(ref.current)
    setIndex(((index % count) + count) % count)
  }, [activeIndex])

  return (
    <Layout
      ref={ref}
      active={activeIndex === index}
      previous={prevIndex === index}
      direction={direction}
    >
      {children}
    </Layout>
  )
}
