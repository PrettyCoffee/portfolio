import type { PropsWithChildren } from "react"

import { Footer } from "./footer"
import { Header } from "./header"
import { ScrollProgress } from "./scroll-progress"

export const Layout = ({ children }: PropsWithChildren) => (
  <>
    <ScrollProgress />
    <Header />
    {children}
    <Footer />
  </>
)
