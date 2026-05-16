import { Counter } from "components/counter"
import { HashLink } from "components/hash-link"
import { Section } from "components/section"
import { Typer } from "components/typer"
import { styled } from "utils/styled"
import { theme } from "utils/theme"

const H1 = styled("h1")`
  font-size: ${theme("space.20")};
  font-weight: 700;
  letter-spacing: -${theme("space.px")};
  line-height: 1;
  white-space: nowrap;
`

const Title = styled("span")`
  font-size: ${theme("space.10")};
  font-weight: 800;
  letter-spacing: -${theme("space.px")};
`

export const Page = () => (
  <div>
    <Section id="intro" variant="dark">
      <H1>
        Welcome to my
        <br />
        <Typer
          values={["portfolio", "passion", "hobby", "project", "playground"]}
        />
      </H1>
    </Section>

    <Section id="waku" variant="light">
      <Title>
        {"Waku is "}
        <Typer values={["awesome", "great", "fun"]} />
      </Title>
      <p>Hello world!</p>
      <Counter />
      <HashLink hash="about">About page</HashLink>
    </Section>

    <Section id="about" variant="dark">
      <Title>About Waku</Title>
      <p>The minimal React framework</p>
      <HashLink hash="waku">Return home</HashLink>
    </Section>
  </div>
)
