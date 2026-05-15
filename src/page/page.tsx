import { Counter } from "components/counter"
import { HashLink } from "components/hash-link"
import { Section } from "components/section"
import { Typer } from "components/typer"
import { styled } from "utils/styled"
import { theme } from "utils/theme"

const Title = styled("span")`
  font-size: ${theme("space.10")};
  font-weight: 800;
  letter-spacing: -${theme("space.px")};
`

export const Page = () => (
  <div>
    <Section title="Waku" variant="light">
      <Title>
        {"Waku is "}
        <Typer values={["awesome", "great", "fun"]} />
      </Title>
      <p>Hello world!</p>
      <Counter />
      <HashLink hash="about">About page</HashLink>
    </Section>

    <Section title="About" variant="dark">
      <Title>About Waku</Title>
      <p>The minimal React framework</p>
      <HashLink hash="waku">Return home</HashLink>
    </Section>
  </div>
)
