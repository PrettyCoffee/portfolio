import { styled, css } from "lib/goober"
import { theme } from "utils/theme"

export const Em = styled.em`
  color: ${theme("accent.yellow")};
`

export const DeEm = styled
  .span<{ block?: boolean }>(
    ({ block }) => css`
      color: ${theme("text.gentle")};
      ${block && "display: block;"}
    `
  )
  .filterProps(["block"])
