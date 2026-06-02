"use client"

import { Dispatch } from "react"

import { Hidden } from "components/hidden"
import { css, styled } from "lib/goober"
import { theme } from "utils/theme"

const Position = styled.div`
  position: absolute;
  bottom: -2.5rem;
  left: 0;
  right: 0;
  padding: 0.5rem 1.5rem;
  display: flex;
  justify-content: center;
`

const PageButton = styled
  .button<{ active: boolean }>(({ active }) => [
    css`
      position: relative;
      height: ${theme("space.8")};
      width: ${active ? theme("space.16") : theme("space.8")};

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
}

export const PageButtons = ({
  count,
  active,
  changePage,
}: PageButtonsProps) => (
  <Position>
    {Array.from({ length: count }, (_, index) => (
      <PageButton
        key={index}
        active={active === index}
        onClick={() => changePage(index)}
        disabled={active === index}
      >
        <Hidden>{`Go to page ${index + 1}`}</Hidden>
      </PageButton>
    ))}
  </Position>
)
