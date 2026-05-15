import { Link } from "waku"

import { Counter } from "components/counter"
import { Section } from "components/section"
import { Typer } from "components/typer"
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

export const Page = () => (
  <div>
    <Section title="Waku" variant="dark">
      <H1>
        <Typer prepend="Waku is" values={["awesome", "great", "fun"]} />
      </H1>
      <p>Hello world!</p>
      <Counter />
      <StyledLink to="/about">About page</StyledLink>
    </Section>
    <Section title="Waku" variant="light">
      <H1>
        <Typer prepend="Waku is" values={["awesome", "great", "fun"]} />
      </H1>
      <p>Hello world!</p>
      <Counter />
      <StyledLink to="/about">About page</StyledLink>
    </Section>
  </div>
)
