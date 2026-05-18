"use client"

import { useSyncExternalStore } from "react"

import { styled } from "utils/styled"
import { theme } from "utils/theme"

const Progress = styled("div")`
  width: var(--progress);
  height: ${theme("space.1")};
  background: white;
`

const Layout = styled("div")`
  position: fixed;
  inset: 0 0 unset 0;
  width: 100%;
  z-index: 1000;
  mix-blend-mode: difference;
`

const subscribe = (update: () => void) => {
  window.addEventListener("scroll", update)
  return () => window.removeEventListener("scroll", update)
}
const getProgress = () => {
  const scroll = window.scrollY
  const maxScroll = document.documentElement.offsetHeight - window.innerHeight
  return (scroll / maxScroll) * 100
}

export const ScrollProgress = () => {
  const value = useSyncExternalStore(subscribe, getProgress, () => 0)
  const style: Record<string, string> = { "--progress": `${value}%` }
  return (
    <Layout>
      <Progress style={style} />
    </Layout>
  )
}
