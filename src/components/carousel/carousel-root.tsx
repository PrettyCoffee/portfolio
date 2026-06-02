"use client"

import {
  PropsWithChildren,
  RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

import { ErrorBoundary } from "waku/router/client"

import { css, styled } from "lib/goober"
import { theme } from "utils/theme"

import { CarouselContext, SlideDirection } from "./carousel-context"
import { DirectionButton } from "./fragments/direction-button"
import { PageButtons } from "./fragments/page-buttons"

const Layout = styled.div`
  width: 100%;
  position: relative;
  max-width: ${theme("space.x11")};
  min-height: ${theme("space.x1")};

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
`
const NextButton = styled(DirectionButton)`
  position: absolute;
  right: -2.625rem;
  top: 50%;
  translate: 0 -50%;
`

const useChildren = (ref: RefObject<HTMLElement | null>) => {
  const [height, setHeight] = useState<number>()
  const [count, setCount] = useState(0)

  useLayoutEffect(() => {
    const children = [...(ref.current?.children ?? [])]
    setCount(children.length)
    setHeight(
      children.reduce((maxHeight, child) => {
        const itemHeight =
          child instanceof HTMLElement ? child.offsetHeight : child.clientHeight
        return Math.max(maxHeight, itemHeight)
      }, 0)
    )
  }, [ref])

  return { height, count }
}

export const CarouselRoot = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null)
  const { height, count } = useChildren(ref)

  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  const [direction, setDirection] = useState<SlideDirection>("right")

  const changePage = (
    index: number,
    direction: SlideDirection = index < activeIndex ? "right" : "left"
  ) => {
    const clamped = ((index % count) + count) % count
    setDirection(direction)
    setPrevIndex(activeIndex)
    setActiveIndex(clamped)
  }

  return (
    <ErrorBoundary>
      <CarouselContext value={{ activeIndex, prevIndex, direction }}>
        <Layout>
          <PrevButton
            caption="Previous"
            direction="left"
            onClick={() => changePage(activeIndex - 1, "right")}
          />
          <Decoration side="top" />

          <InnerLayout ref={ref} style={{ height }}>
            {children}
          </InnerLayout>

          <Decoration side="bottom" />
          <NextButton
            caption="Next"
            direction="right"
            onClick={() => changePage(activeIndex + 1, "left")}
          />

          <PageButtons
            active={activeIndex}
            count={count}
            changePage={changePage}
          />
        </Layout>
      </CarouselContext>
    </ErrorBoundary>
  )
}
