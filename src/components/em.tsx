import { styled } from "utils/styled"
import { theme } from "utils/theme"

export const Em = styled("em")`
  color: ${theme("accent.yellow")};
`

export const DeEm = styled("span")<{ block?: boolean }>(
  ({ css, block }) => css`
    color: ${theme("text.gentle")};
    ${block && "display: block;"}
  `
)
