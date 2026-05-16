import { Counter } from "components/counter"
import { HashLink } from "components/hash-link"
import { Section } from "components/section"
import { TextCarousel } from "components/text-carousel"
import { styled } from "utils/styled"
import { theme } from "utils/theme"

import { AboutMe } from "./sections/about-me"
import { Intro } from "./sections/intro"

const Title = styled("span")`
  font-size: ${theme("space.10")};
  font-weight: 800;
  letter-spacing: -${theme("space.px")};
`

const Waku = () => (
  <>
    <Title>
      {"Waku is "}
      <TextCarousel values={["awesome", "great", "fun"]} />
    </Title>
    <p>Hello world!</p>
    <Counter />
    <HashLink hash="about-waku">About page</HashLink>
  </>
)

const About = () => (
  <>
    <Title>About Waku</Title>
    <p>The minimal React framework</p>
    <HashLink hash="waku">Return home</HashLink>
  </>
)

const sections = [
  { id: "intro", content: <Intro /> },
  { id: "about-me", content: <AboutMe /> },
  { id: "waku", content: <Waku /> },
  { id: "about-waku", content: <About /> },
]

export const Page = () => (
  <div>
    {sections.map(({ id, content }, index) => (
      <Section key={id} id={id} variant={index % 2 === 1 ? "light" : "dark"}>
        {content}
      </Section>
    ))}
  </div>
)
