"use client"

import { useState } from "react"

import { useScroll } from "hooks/use-scroll"
import { useWindowHeight } from "hooks/use-window-height"

const easeOut = (x: number) => {
  if (x === 1) return 0
  return -0.11 * x + 3 ** (-2 * x)
}

const getParent = (
  element: HTMLElement | null,
  filter: (element: HTMLElement) => boolean
) => {
  if (!element) return null

  let current = element
  while (current.parentElement) {
    current = current.parentElement
    if (filter(current)) return current
  }
  return null
}

export const SectionCsr = () => {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const section = getParent(
    ref,
    element => element.nodeName.toLowerCase() === "section"
  )
  const sectionStart = section?.offsetTop ?? 0

  useScroll({
    start: sectionStart - useWindowHeight(),
    end: sectionStart,
    onScroll: ({ percent }) => {
      const parent = ref?.parentElement
      if (!parent) return
      const delta = easeOut(percent)
      parent.style.setProperty("translate", `0 ${delta * 75}vh`)
      parent.style.setProperty("opacity", `${1 - delta}`)
      parent.style.setProperty("scale", `${1 - delta / 4}`)
      // eslint-disable-next-line react-hooks/immutability -- false positive
      parent.style.transformOrigin = "top"
    },
  })

  return <span ref={setRef} />
}
