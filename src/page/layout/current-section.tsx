"use client"

import { useEffect, useState } from "react"

import { Icon } from "components/icon"
import { Typewriter } from "components/typewriter"
import { styled } from "lib/goober"
import { theme } from "utils/theme"
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
  return sections[index] ?? sections[0]
}

const Link = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme("space.1")};

  &:not(:hover, :focus-visible) > :last-child {
    display: none;
  }
`

export const CurrentSection = () => {
  const debounce = useDebounce(75)
  const [name, setName] = useState<string>()
  const [hash, setHash] = useState<string>()

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    const initialName = !hash
      ? undefined
      : getName(document.getElementById(hash))
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial render can't access the dom yet
    setName(initialName)
  }, [])

  useEffect(() => {
    const update = () =>
      debounce(() => {
        const section = getCurrentSection()
        setName(getName(section))
        setHash(section?.id)
      })

    window.addEventListener("scroll", update)
    return () => {
      window.removeEventListener("scroll", update)
    }
  }, [debounce])

  if (!name) return null

  const href = `/#${hash || ""}`
  return (
    <Link href={href} onClick={() => history.replaceState(null, "", href)}>
      <span>PrettyCoffee</span>
      <span>/</span>
      <Typewriter text={name} />
      <Icon icon="hash" size={14} />
    </Link>
  )
}
