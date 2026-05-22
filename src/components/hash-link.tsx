"use client"

import { PropsWithChildren } from "react"

import { styled } from "lib/goober"
import { theme } from "utils/theme"

const StyledLink = styled.a`
  margin-top: ${theme("space.4")};
  display: inline-block;
  text-decoration: underline;
`

export const HashLink = ({
  hash,
  children,
}: PropsWithChildren<{ hash: string }>) => (
  <StyledLink href={`#${hash}`}>{children}</StyledLink>
)
