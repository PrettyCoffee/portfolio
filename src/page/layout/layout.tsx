import type { PropsWithChildren } from "react"

import { ScrollProgress } from "components/scroll-progress"

import { Footer } from "./footer"
import { Header } from "./header"

export const Layout = ({ children }: PropsWithChildren) => (
  <>
    <ScrollProgress />
    <Header />
    {children}
    <Footer />
  </>
)
