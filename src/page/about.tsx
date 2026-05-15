import { Link } from "waku"

import { Section } from "components/section"
import { styled } from "utils/styled"
import { theme } from "utils/theme"

const H1 = styled("h1")`
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -${theme("space.px")};
`

const StyledLink = styled(Link)`
  margin-top: ${theme("space.4")};
  display: inline-block;
  text-decoration: underline;
`

export const AboutPage = () => (
  <Section title="About Waku" variant="dark">
    <H1>About Waku</H1>
    <p>The minimal React framework</p>
    <StyledLink to="/">Return home</StyledLink>
  </Section>
)
