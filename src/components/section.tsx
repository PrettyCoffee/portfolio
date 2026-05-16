import { PropsWithChildren } from "react"

import { styled } from "utils/styled"
import { theme } from "utils/theme"

const Layout = styled("section")`
  position: relative;
  min-height: 100vh;
  display: grid;
  place-content: center;

  background: ${theme("background")};
  color: ${theme("text")};
`

interface SectionProps {
  id: string
  variant: "dark" | "light"
}
export const Section = ({
  id,
  variant,
  children,
}: PropsWithChildren<SectionProps>) => (
  <Layout className={variant} id={id}>
    {children}
  </Layout>
)
