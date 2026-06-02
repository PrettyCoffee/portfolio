import { Hidden } from "components/hidden"
import { css, keyframes, styled } from "lib/goober"
import { theme } from "utils/theme"

const hoverRight = keyframes`
  0% {
    translate: 0rem;
  }
  50% {
    translate: 0.25rem;
  }
`

const hoverLeft = keyframes`
  0% {
    translate: 0rem;
  }
  50% {
    translate: -0.25rem;
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
      height: 4rem;
      width: 4rem;
      padding: 0 0.75rem;

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
        ${direction === "left" ? "left: 0.5rem;" : "right: 0.5rem;"}
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
