import { PropsWithChildren } from "react"

import { slug } from "utils/slug"
import { styled } from "utils/styled"
import { theme } from "utils/theme"

import { Hidden } from "./hidden"

const Layout = styled("section")`
  position: relative;
  min-height: 100vh;
  display: grid;
  place-content: center;

  background: ${theme("background")};
  color: ${theme("text")};
`

interface SectionProps {
  title: string
  variant: "dark" | "light"
}
export const Section = ({
  title,
  variant,
  children,
}: PropsWithChildren<SectionProps>) => (
  <Layout className={variant}>
    <Hidden>
      <h2 style={{ top: 1 }} id={slug(title)}>
        {title}
      </h2>
    </Hidden>
    {children}
  </Layout>
)
