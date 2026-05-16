import { PropsWithChildren } from "react"

import { styled } from "utils/styled"
import { theme } from "utils/theme"

const Layout = styled("section")`
  position: relative;
  min-height: 100vh;
  padding: ${theme("space.20")};
  display: grid;
  place-content: center;

  background: ${theme("background.base")};
  color: ${theme("text.base")};
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
