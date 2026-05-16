import { styled } from "utils/styled"
import { theme } from "utils/theme"

import { CurrentSection } from "./current-section"

const HeaderLayout = styled("header")`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: ${theme("space.4")};
  padding: ${theme("space.6")};
  mix-blend-mode: difference;
  color: white;
`

const H2 = styled("h2")`
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -${theme("space.px")};
`

export const Header = () => (
  <HeaderLayout>
    <H2>
      <a href="/">PrettyCoffee</a>
      {" / "}
      <CurrentSection />
    </H2>
  </HeaderLayout>
)
