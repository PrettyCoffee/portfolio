"use client"
import { useEffect, useRef, useState } from "react"

import { getWindow } from "utils/get-window"
import { theme } from "utils/theme"

import { css, styled } from "../lib/goober"

const getParent = (
  element: Node | EventTarget | null,
  selector: (element: Element) => boolean,
) => {
  if (!getWindow()) return null
  if (!(element instanceof Element)) return null
  if (selector(element)) return element
  const parent = element.parentElement
  return getParent(parent, selector)
}

const getInteractiveParent = (element: Node | EventTarget | null) =>
  getParent(element, ({ tagName }) =>
    ["button", "a", "input"].includes(tagName.toLowerCase()),
  )

const useCursor = () => {
  const [x, setX] = useState<number | null>(null)
  const [y, setY] = useState<number | null>(null)
  const [target, setTarget] = useState<EventTarget | null>(null)

  useEffect(() => {
    let id = 0

    const move = ({ clientX, clientY, target }: MouseEvent) => {
      window.cancelAnimationFrame(id)
      id = window.requestAnimationFrame(() => {
        setX(clientX)
        setY(clientY)
        setTarget(target)
      })
    }

    const leave = ({ relatedTarget }: MouseEvent) => {
      if (relatedTarget) return
      window.cancelAnimationFrame(id)
      setX(null)
      setY(null)
      setTarget(null)
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseout", leave)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseout", leave)
    }
  }, [])

  return { x, y, target }
}

const useMouseDown = () => {
  const [mouseDown, setMouseDown] = useState(false)

  useEffect(() => {
    const down = () => setMouseDown(true)
    const up = () => setMouseDown(false)

    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)
    return () => {
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
    }
  }, [])

  return mouseDown
}

const useStaggered = <T,>(value: T, ms: number) => {
  const [current, setCurrent] = useState(value)
  const staggerStart = useRef<number | null>(null)

  useEffect(() => {
    const update = () => {
      setCurrent(value)
      staggerStart.current = null
    }

    if (value) return update()

    if (!staggerStart.current) {
      staggerStart.current = Date.now()
    }

    const diff = Date.now() - staggerStart.current
    const id = window.setTimeout(update, ms - diff)
    return () => window.clearTimeout(id)
  }, [value, ms])

  return current
}

const allowCustomCursor =
  "(prefers-reduced-motion: no-preference) and (hover: hover)"

const cursorBaseStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  display: block;
  width: var(--size);
  height: var(--size);
  translate: calc(var(--x, -100px) - var(--size) / 2)
    calc(var(--y, -100px) - var(--size) / 2);

  mix-blend-mode: difference;
  pointer-events: none;
`

const BaseCursor = styled.div`
  display: none;
  
  @media ${allowCustomCursor} {
    --size: ${theme("space.2")};
    ${cursorBaseStyles}
    background: white;
    rotate: 45deg;

    transition: scale 100ms ease-out;

    &[data-ismousedown="true"] {
      transition-duration: 0ms;
      scale: 0.1;
    }

    :root:has(&),
    :root:has(&) * {
      cursor: none !important;
    }
  }
`

const FocusCursor = styled.div`
  display: none;

  @media ${allowCustomCursor} {
    --size: ${theme("space.3")};
    ${cursorBaseStyles}


    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      height: var(--size);
      width: var(--size);
      rotate: 45deg;
      transition: translate ease-out 300ms;
    }

    &::before {
      border-left: 2px solid white;
      border-bottom: 2px solid white;
      translate: calc(-1 * var(--size) / 2) 0;
    }
    &::after {
      border-right: 2px solid white;
      border-top: 2px solid white;
      translate: calc(var(--size) / 2) 0;
    }

    &[data-hasfocus="true"]::before {
      translate: 0 0;
    }
    &[data-hasfocus="true"]::after {
      translate: 0 0;
    }
  }
`

export const Cursor = () => {
  const { x, y, target } = useCursor()
  const isMouseDown = useMouseDown()

  const position: Record<string, string | undefined> = {
    "--x": !x ? undefined : `${x}px`,
    "--y": !y ? undefined : `${y}px`,
  }

  const focused = getInteractiveParent(target)

  return (
    <>
      <FocusCursor
        style={position}
        data-hasfocus={!!useStaggered(focused, 300)}
      />
      <BaseCursor style={position} data-ismousedown={isMouseDown} />
    </>
  )
}
