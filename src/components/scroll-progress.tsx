"use client"

import { useRef } from "react"

import { useDocumentHeight } from "hooks/use-document-height"
import { useScroll } from "hooks/use-scroll"
import { useWindowHeight } from "hooks/use-window-height"
import { styled } from "lib/goober"
import { prefersReducedMotion } from "utils/preferes-reduced-motion"
import { theme } from "utils/theme"

const Progress = styled.div`
  width: 100%;
  scale: var(--progress) 100%;
  transform-origin: left;
  height: ${theme("space.1")};
  background: ${theme("stroke.base")};

  @media ${theme("breakpoint.720")} {
    height: ${theme("space.10")};
  }
`

const Layout = styled.div`
  position: fixed;
  inset: 0 0 unset 0;
  width: 100%;
  z-index: 99;
  background: ${theme("stroke.invert")};
`

export const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null)

  useScroll({
    start: 0,
    end: useDocumentHeight() - useWindowHeight(),
    onScroll: ({ percent }) => {
      const progress = progressRef.current
      if (!progress) return
      progress.style.setProperty("--progress", `${percent * 100}%`)
    },
  })

  return prefersReducedMotion() ? null : (
    <Layout>
      <Progress ref={progressRef} />
    </Layout>
  )
}
