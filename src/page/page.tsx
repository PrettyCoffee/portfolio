import { Counter } from "components/counter"
import { HashLink } from "components/hash-link"
import { Section } from "components/section"
import { TextCarousel } from "components/text-carousel"
import { styled } from "lib/goober"
import { theme } from "utils/theme"

import { AboutMe } from "./sections/about-me"
import { Intro } from "./sections/intro"
import { Projects } from "./sections/projects"

const Title = styled.span`
  font-size: ${theme("font.3xl")};
  font-weight: ${theme("font.bolder")};
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
  { id: "", name: "Portfolio", hideName: true, content: <Intro /> },
  { id: "about-me", name: "About Me", hideName: true, content: <AboutMe /> },
  { id: "projects", name: "Projects", content: <Projects /> },
  { id: "waku", name: "Waku", content: <Waku /> },
  { id: "about-waku", name: "About Waku", content: <About /> },
]

export const Page = () => (
  <div>
    {sections.map(({ content, ...props }, index) => (
      <Section
        key={props.id}
        variant={index % 2 === 1 ? "light" : "dark"}
        {...props}
      >
        {content}
      </Section>
    ))}
  </div>
)
