import type { PropsWithChildren } from "react"

import { Footer } from "components/footer"
import { Header } from "components/header"

export const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)
