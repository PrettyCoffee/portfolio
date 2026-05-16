"use client"

import { useEffect, useState } from "react"

import { Typewriter } from "components/typewriter"
import { useDebounce } from "utils/use-debounce"

const getName = (target: Element | null | undefined) => {
  const first = document.querySelector("section")?.dataset["name"]
  return target instanceof HTMLElement
    ? (target.dataset["name"] ?? first)
    : first
}

const getScreenHeight = () => window.innerHeight
const getCurrentSection = () => {
  const sections = [...document.querySelectorAll("section")]
  const index = sections.findLastIndex(
    section => section.getBoundingClientRect().top < getScreenHeight() / 4
  )
  return getName(sections[index] ?? sections[0])
}

export const CurrentSection = () => {
  const debounce = useDebounce(75)
  const [name, setName] = useState<string>()

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    const initialName = getName(document.getElementById(hash))
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial render can't access the dom yet
    setName(initialName)
  }, [])

  useEffect(() => {
    const update = () => debounce(() => setName(getCurrentSection()))

    window.addEventListener("scroll", update)
    return () => {
      window.removeEventListener("scroll", update)
    }
  }, [debounce])

  return !name ? null : <Typewriter text={name} />
}
