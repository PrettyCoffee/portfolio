"use client"

import { useState } from "react"

import { useScroll } from "hooks/use-scroll"
import { useWindowHeight } from "hooks/use-window-height"

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

const meassureText = (element: HTMLElement) => {
  const text = element.textContent
  const { font } = window.getComputedStyle(element)

  const span = document.createElement("span")
  span.textContent = text
  span.style.setProperty("position", "fixed")
  span.style.setProperty("font", font)

  document.documentElement.append(span)
  const textWidth = span.offsetWidth
  span.remove()
  return textWidth
}

export const SectionTitleScroll = () => {
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
      const title = ref?.parentElement
      if (!title || !section) return
      const isEven =
        [...(section.parentElement?.children ?? [])].indexOf(section) % 2 === 0

      const offset = (isEven ? -1 : 1) * (percent - 0.5) * 100
      title.style.setProperty("translate", `${offset}%`)

      const width = meassureText(title)
      const shadows = [-2, -1, 1, 2].map(
        factor => `drop-shadow(${width * factor}px 0 0 currentColor)`
      )
      title.style.setProperty("filter", shadows.join(" "))
    },
  })

  return <span ref={setRef} />
}
