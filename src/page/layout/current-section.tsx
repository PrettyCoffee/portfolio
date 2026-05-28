"use client"

import { useEffect, useState } from "react"

import { Icon } from "components/icon"
import { Typewriter } from "components/typewriter"
import { useDebounce } from "hooks/use-debounce"
import { styled } from "lib/goober"
import { sections } from "page/sections/sections"
import { getWindow } from "utils/get-window"
import { theme } from "utils/theme"

const getName = (id: string) => {
  const section = sections.find(section => section.id === id) ?? sections[0]!
  return section.name
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

const getHash = () => getWindow()?.location.hash.replace("#", "") ?? ""

export const CurrentSection = () => {
  const debounce = useDebounce(75)
  const [hash, setHash] = useState(getHash())
  const [name, setName] = useState(getName(hash))

  useEffect(() => {
    const update = () =>
      debounce(() => {
        const id = getCurrentSection()?.id ?? ""
        setHash(id)
        setName(getName(id))
      })

    window.addEventListener("scroll", update)
    return () => {
      window.removeEventListener("scroll", update)
    }
  }, [debounce])

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
