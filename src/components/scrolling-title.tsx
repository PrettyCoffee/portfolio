"use client"

import { useState } from "react"

import { useScroll } from "hooks/use-scroll"
import { useWindowHeight } from "hooks/use-window-height"

const TitleCopy = ({ children }: { children: string }) => (
  <span aria-hidden inert>
    {` ${children} `}
  </span>
)

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

export const ScrollingTitle = ({ children }: { children: string }) => {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const section = getParent(
    ref,
    element => element.nodeName.toLowerCase() === "section"
  )
  const sectionStart = section?.offsetTop ?? 0

  useScroll({
    start: sectionStart - useWindowHeight(),
    end: sectionStart + useWindowHeight(),
    onScroll: ({ percent }) => {
      if (!ref || !section) return
      const isEven =
        [...(section.parentElement?.children ?? [])].indexOf(section) % 2 === 0

      const offset = (isEven ? -1 : 1) * (percent - 0.5) * 100
      ref.style.setProperty("translate", `${offset}vw`)
    },
  })

  return (
    <span ref={setRef}>
      <TitleCopy>{children}</TitleCopy>
      <TitleCopy>{children}</TitleCopy>
      {children}
      <TitleCopy>{children}</TitleCopy>
      <TitleCopy>{children}</TitleCopy>
    </span>
  )
}
