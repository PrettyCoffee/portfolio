"use client"

import { Dispatch } from "react"

import { Hidden } from "components/hidden"
import { css, styled } from "lib/goober"
import { theme } from "utils/theme"

const Position = styled.div`
  padding: ${theme("space.2")} ${theme("space.6")};
  display: flex;
  justify-content: center;
`

const PageButton = styled
  .button<{ active: boolean }>(({ active }) => [
    css`
      position: relative;
      height: ${theme("space.8")};
      width: ${active ? theme("space.16") : theme("space.8")};
      border-radius: ${theme("space.1")};

      &:focus-visible {
        outline: ${theme("space.2px")} solid ${theme("stroke.base")};
        outline-offset: -${theme("space.2px")};
      }

      @media (prefers-reduced-motion: no-preference) {
        transition: width 300ms ease-out;
      }

      &::before {
        content: "";
        display: block;
        position: absolute;
        inset: ${theme("space.2")};
        height: ${theme("space.4")};
        background: ${theme("stroke.gentle")};
        clip-path: polygon(
          0 ${theme("space.2")},
          ${theme("space.2")} 0,
          calc(100% - ${theme("space.2")}) 0,
          100% ${theme("space.2")},
          calc(100% - ${theme("space.2")}) 100%,
          ${theme("space.2")} 100%
        );
        @media (prefers-reduced-motion: no-preference) {
          transition: scale 50ms ease-out;
        }
      }
    `,
    active
      ? css`
          pointer-events: none;
        `
      : css`
          &:hover::before {
            background: ${theme("stroke.base")};
          }
          &:active::before {
            scale: 0.75;
          }
        `,
  ])
  .filterProps(["active"])

interface PageButtonsProps {
  count: number
  active: number
  changePage: Dispatch<number>
  className?: string
}

export const PageButtons = ({
  count,
  active,
  changePage,
  ...props
}: PageButtonsProps) => (
  <Position {...props}>
    {Array.from({ length: count }, (_, index) => (
      <PageButton
        key={index}
        active={active === index}
        onClick={() => changePage(index)}
      >
        <Hidden>{`Go to page ${index + 1}`}</Hidden>
      </PageButton>
    ))}
  </Position>
)
