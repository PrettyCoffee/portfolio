"use client"

import { useState } from "react"

import { styled } from "lib/goober"
import { theme } from "utils/theme"

import { Hidden } from "../hidden"
import { Icon } from "../icon"

const Copy = styled.button`
  height: 1.5em;
  width: 0;
  overflow: hidden;
  display: inline-grid;
  place-content: center;

  &:has(+ :hover),
  &:hover,
  &:focus {
    width: 1.5em;
  }

  svg {
    height: 0.5em;
    width: 0.5em;
  }

  @media (hover: none) {
    width: 1.5em;
  }

  @media (prefers-reduced-motion: no-preference) {
    & {
      transition: width 100ms ease-in-out;
    }
    svg {
      transition: scale 100ms ease-in-out;
    }
    &:hover svg {
      scale: 1.2;
    }
    &:active svg {
      scale: 1.5 0.8;
    }
  }
`

export const CopyEmail = ({ href }: { href: string }) => {
  const [hasFocus, setHasFocus] = useState(false)
  const email = href.replace("mailto:", "")
  return (
    <Copy
      onClick={() => void navigator.clipboard.writeText(email)}
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
    >
      <Icon
        icon={hasFocus ? "copy-check" : "copy"}
        size="0.75em"
        color={theme(hasFocus ? "accent.green" : "text.gentle")}
      />
      <Hidden as="span">Copy "{email}"</Hidden>
    </Copy>
  )
}
