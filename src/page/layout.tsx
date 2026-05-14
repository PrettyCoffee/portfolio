import type { PropsWithChildren } from "react"

import { Footer } from "components/footer"
import { Header } from "components/header"
import { styled } from "utils/styled"
import { theme } from "utils/theme"

const Main = styled("main")`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100svh;
  * {
    min-width: ${theme("space.60")};
  }
`

export const Layout = ({ children }: PropsWithChildren) => (
  <div>
    <Header />
    <Main>{children}</Main>
    <Footer />
  </div>
)
