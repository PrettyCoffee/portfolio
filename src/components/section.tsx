import { PropsWithChildren } from "react"

import { styled } from "utils/styled"
import { theme } from "utils/theme"

const Layout = styled("section")`
  position: relative;
  min-height: 100vh;
  padding: ${theme("space.x2")} ${theme("space.x1")};
  display: grid;
  place-content: center;
  overflow: hidden;

  background: ${theme("background.base")};
  color: ${theme("text.base")};

  & > :not(h2) {
    z-index: 1;
  }

  @media ${theme("breakpoint.720")} {
    padding: ${theme("space.x1")} ${theme("space.6")};
  }
`

const Title = styled("h2")`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 50%;
  translate: -50%;
  line-height: 0.76;
  font-size: min(20vw, ${theme("space.x3")});
  letter-spacing: -${theme("space.1")};
  white-space: nowrap;
  height: max-content;
  opacity: 0.1;
`

interface SectionProps {
  id: string
  name: string
  hideName?: boolean
  variant: "dark" | "light"
}
export const Section = ({
  id,
  name,
  hideName,
  variant,
  children,
}: PropsWithChildren<SectionProps>) => (
  <Layout id={id} data-name={name} className={variant}>
    {!hideName && <Title>{name}</Title>}
    {children}
  </Layout>
)
