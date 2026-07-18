"use client"

import {
  PropsWithChildren,
  RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { ErrorBoundary } from "waku/router/client"

import { useSwipe } from "hooks/use-swipe"
import { useWindowWidth } from "hooks/use-window-width"
import { css, styled } from "lib/goober"
import { theme } from "utils/theme"

import { CarouselContext, SlideDirection } from "./carousel-context"
import { DirectionButton } from "./fragments/direction-button"
import { PageButtons } from "./fragments/page-buttons"

const Layout = styled.div`
  position: relative;
  margin: auto;
  width: 100%;
  min-height: ${theme("space.x1")};
  max-width: calc(
    100vw - ${theme("space.x1")}
  ); /* needs space for overflowing direction buttons */

  @media ${theme("breakpoint.720")} {
    max-width: unset;
  }

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    height: ${theme("space.4")};
    border: ${theme("space.1")} solid ${theme("stroke.gentle")};
  }

  &::before {
    border-bottom: none;
    top: 0;
  }

  &::after {
    border-top: none;
    bottom: 0;
  }
`

const InnerLayout = styled.div`
  position: relative;
  overflow: hidden;
  width: calc(100% - 2 * ${theme("space.6")});
  margin: ${theme("space.6")};
  *:has(> &) {
    padding: 0.01px; /* prevent collapsing top / bottom margin */
  }
`

const Decoration = styled.div<{ side: "top" | "bottom" }>(({ side }) => [
  css`
    content: "";
    position: absolute;
    left: 50%;
    translate: -50%;

    width: ${theme("space.x1")};
    height: ${theme("space.2")};
    background-color: ${theme("stroke.gentle")};
  `,
  side === "top"
    ? css`
        top: ${theme("space.2px")};
        clip-path: polygon(
          0 0,
          ${theme("space.2")} 100%,
          calc(100% - ${theme("space.2")}) 100%,
          100% 0
        );
      `
    : css`
        bottom: ${theme("space.2px")};
        clip-path: polygon(
          0 100%,
          ${theme("space.2")} 0,
          calc(100% - ${theme("space.2")}) 0,
          100% 100%
        );
      `,
])

const PrevButton = styled(DirectionButton)`
  position: absolute;
  left: -2.625rem;
  top: 50%;
  translate: 0 -50%;

  @media ${theme("breakpoint.720")} {
    translate: unset;
    top: unset;
    bottom: calc(-1 * ${theme("space.x1")});
    left: calc(-1 * ${theme("space.4")});
  }
  @media ${theme("breakpoint.400")} {
    display: none;
  }
`
const NextButton = styled(DirectionButton)`
  position: absolute;
  right: -2.625rem;
  top: 50%;
  translate: 0 -50%;

  @media ${theme("breakpoint.720")} {
    translate: unset;
    top: unset;
    bottom: calc(-1 * ${theme("space.x1")});
    right: calc(-1 * ${theme("space.4")});
  }
  @media ${theme("breakpoint.400")} {
    display: none;
  }
`
const PageSelection = styled(PageButtons)`
  position: absolute;
  bottom: -${theme("space.10")};
  left: 0;
  right: 0;

  @media ${theme("breakpoint.720")} {
    bottom: -${theme("space.18")};
  }
  @media ${theme("breakpoint.400")} {
    bottom: -${theme("space.10")};
  }
`

const useChildrenSize = (ref: RefObject<HTMLElement | null>) => {
  const width = useWindowWidth()

  useLayoutEffect(() => {
    const children = [...(ref.current?.children ?? [])] as HTMLElement[]

    ref.current?.style.removeProperty("height")
    children.forEach(item => item.style.removeProperty("height"))

    const newHeight = Math.max(0, ...children.map(child => child.offsetHeight))
    ref.current?.style.setProperty("height", `${newHeight}px`)
    children.forEach(item => {
      item.style.setProperty("height", `100%`)
    })
  }, [ref, width])
}

const useChildrenCount = (ref: RefObject<HTMLElement | null>) => {
  const [count, setCount] = useState(0)

  useLayoutEffect(() => {
    const children = [...(ref.current?.children ?? [])] as HTMLElement[]
    setCount(children.length)
  }, [ref])

  return count
}

export const CarouselRoot = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null)
  useChildrenSize(ref)
  const count = useChildrenCount(ref)

  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  const [direction, setDirection] = useState<SlideDirection>("right")

  const changePage = (
    index: number,
    direction: SlideDirection = index < activeIndex ? "right" : "left"
  ) => {
    const count = ref.current?.children.length ?? 0
    const clamped = ((index % count) + count) % count
    setDirection(direction)
    setPrevIndex(activeIndex)
    setActiveIndex(clamped)
  }

  useSwipe({
    ref,
    onSwipeLeft: () => changePage(activeIndex + 1, "left"),
    onSwipeRight: () => changePage(activeIndex - 1, "right"),
  })

  return (
    <ErrorBoundary>
      <CarouselContext value={{ activeIndex, prevIndex, direction }}>
        <Layout>
          <Decoration side="top" />
          <InnerLayout ref={ref}>{children}</InnerLayout>
          <Decoration side="bottom" />

          <PrevButton
            caption="Previous"
            direction="left"
            onClick={() => changePage(activeIndex - 1, "right")}
          />
          <PageSelection
            active={activeIndex}
            count={count}
            changePage={changePage}
          />
          <NextButton
            caption="Next"
            direction="right"
            onClick={() => changePage(activeIndex + 1, "left")}
          />
        </Layout>
      </CarouselContext>
    </ErrorBoundary>
  )
}
