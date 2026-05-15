"use client"

import { PropsWithChildren } from "react"

import { styled } from "utils/styled"
import { theme } from "utils/theme"

const StyledLink = styled("a")`
  margin-top: ${theme("space.4")};
  display: inline-block;
  text-decoration: underline;
`

export const HashLink = ({
  hash,
  children,
}: PropsWithChildren<{ hash: string }>) => (
  <StyledLink
    href={`#${hash}`}
    onClick={event => {
      const heading = document.getElementById(hash)
      heading?.scrollIntoView({ behavior: "smooth" })
      window.history.pushState(null, "", `#${hash}`)
      event.preventDefault()
    }}
  >
    {children}
  </StyledLink>
)
