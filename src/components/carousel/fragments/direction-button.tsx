import { Hidden } from "components/hidden"
import { css, keyframes, styled } from "lib/goober"
import { theme } from "utils/theme"

const hoverRight = keyframes`
  0% {
    translate: 0rem;
  }
  50% {
    translate: ${theme("space.1")};
  }
`

const hoverLeft = keyframes`
  0% {
    translate: 0rem;
  }
  50% {
    translate: -${theme("space.1")};
  }
`

const Button = styled
  .button<{ direction: "left" | "right" }>(
    ({ direction }) => css`
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: ${direction === "left" ? "end" : "start"};
      align-items: center;
      height: ${theme("space.16")};
      width: ${theme("space.16")};
      padding: 0 ${theme("space.3")};
      border-radius: ${theme("space.2px")};

      &:focus-visible {
        outline: ${theme("space.2px")} solid ${theme("stroke.base")};
        outline-offset: ${theme("space.2px")};
      }

      &::before,
      &::after {
        content: "";
        flex-shrink: 0;
      }

      &::before {
        height: 25%;
        aspect-ratio: 1;
        transform: rotate(45deg);
        background: ${theme("stroke.gentle")};
        @media (prefers-reduced-motion: no-preference) {
          transition: scale 50ms ease-out;
        }
      }
      &:active::before {
        scale: 0.75;
      }

      &::after {
        position: absolute;
        top: 0;
        bottom: 0;
        ${direction === "left"
          ? `left: ${theme("space.2")};`
          : `right: ${theme("space.2")};`}
        aspect-ratio: 1 / 2;
        height: 100%;
        background: ${theme("stroke.base")};
        clip-path: ${direction === "left"
          ? "polygon(100% 0, 0 50%, 100% 100%, 100% 75%, 50% 50%, 100% 25%);"
          : "polygon(0 0, 100% 50%, 0 100%, 0 75%, 50% 50%, 0 25%);"};
      }
      &:hover::after,
      &:focus-visible::after {
        @media (prefers-reduced-motion: no-preference) {
          animation: ${direction === "left" ? hoverLeft : hoverRight} 1s
            infinite ease-in-out;
        }
      }
    `
  )
  .filterProps(["direction"])

interface DirectionButtonProps {
  onClick: () => void
  direction: "left" | "right"
  caption: string
  className?: string
}

export const DirectionButton = ({
  caption,
  ...props
}: DirectionButtonProps) => (
  <Button {...props}>
    <Hidden>{caption}</Hidden>
  </Button>
)
