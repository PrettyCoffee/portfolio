"use client"

import { useEffect, useRef } from "react"

import { styled } from "lib/goober"
import { createAnimationFrames } from "utils/create-animation-frames"
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

const getProgress = () => {
  const scroll = window.scrollY
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  return (scroll / maxScroll) * 100
}

export const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frames = createAnimationFrames()

    const update = () =>
      frames.request(() => {
        const progress = progressRef.current
        if (!progress) return
        progress.style.setProperty("--progress", `${getProgress()}%`)
      })

    update()
    window.addEventListener("scroll", update)

    return () => {
      window.removeEventListener("scroll", update)
      frames.cancel()
    }
  }, [])

  return (
    <Layout>
      <Progress ref={progressRef} />
    </Layout>
  )
}
