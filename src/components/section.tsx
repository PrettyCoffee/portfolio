import { PropsWithChildren } from "react"

import { styled } from "utils/styled"
import { theme } from "utils/theme"

const Layout = styled("section")`
  position: relative;
  min-height: 100vh;
  padding: ${theme("space.x1")};
  display: grid;
  place-content: center;

  background: ${theme("background.base")};
  color: ${theme("text.base")};
`

interface SectionProps {
  id: string
  name: string
  variant: "dark" | "light"
}
export const Section = ({
  id,
  name,
  variant,
  children,
}: PropsWithChildren<SectionProps>) => (
  <Layout id={id} data-name={name} className={variant}>
    {children}
  </Layout>
)
