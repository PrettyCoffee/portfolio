import { styled, css } from "lib/goober"
import { theme } from "utils/theme"

export const Card = styled
  .div<{ inverted?: boolean }>(({ inverted }) => [
    css`
      padding: ${theme("space.6")};
      max-width: ${theme("space.x11")};
      box-shadow: ${theme("shadow.box.high")};
      border-radius: ${theme("space.2")};

      --text-color: ${theme("text.base")};
      --background-color: ${theme("background.base")};
      --border-color: ${theme("stroke.base")};
      color: var(--text-color);
      background-color: var(--background-color);
      border: ${theme("space.2px")} solid
        color-mix(in srgb, var(--border-color) 5%, transparent);
    `,
    inverted &&
      css`
        --text-color: ${theme("text.invert")};
        --background-color: ${theme("background.invert")};
        --border-color: ${theme("stroke.invert")};

        &::selection,
        *::selection {
          background-color: ${theme("background.base")};
          color: ${theme("text.base")};
        }
      `,
  ])
  .filterProps(["inverted"])
