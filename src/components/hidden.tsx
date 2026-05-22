import { css, styled } from "lib/goober"

import { Slot } from "./slot"

export const hidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border-width: 0;
`
export const Hidden = styled(Slot)`
  ${hidden}
`
