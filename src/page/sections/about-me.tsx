import { Card } from "components/card"
import { Em } from "components/em"
import { styled } from "utils/styled"
import { theme } from "utils/theme"

const AboutCard = styled(Card)`
  display: grid;
  grid-template:
    "img title" auto
    "img text" auto
    "facts text" 1fr / min-content 1fr;
  gap: ${theme("space.6")} ${theme("space.10")};
  padding: ${theme("space.10")};

  @media ${theme("breakpoint.1040")} {
    grid-template:
      "title title" auto
      "img facts" auto
      "text text" 1fr / auto 1fr;
  }
  @media ${theme("breakpoint.560")} {
    grid-template:
      "title" auto
      "img" auto
      "facts" auto
      "text" auto;
  }
`

const Image = styled("img")`
  grid-area: img;
  height: ${theme("space.x3")};
  width: ${theme("space.x3")};
  padding: ${theme("space.4")};
  border: ${theme("space.1")} solid ${theme("stroke.invert")};
  box-shadow: ${theme("shadow.box.high")};
  object-fit: contain;

  @media ${theme("breakpoint.1040")} {
    height: ${theme("space.x2")};
    width: ${theme("space.x2")};
  }
  @media ${theme("breakpoint.560")} {
    height: ${theme("space.x3")};
    width: ${theme("space.x3")};
  }
`

const Title = styled("h2")`
  grid-area: title;
  font-size: ${theme("space.8")};
  margin: 0;
  line-height: 1;
`
const Text = styled("div")`
  grid-area: text;
  p {
    font-size: ${theme("space.6")};
    text-align: justify;
    &:not(:first-of-type) {
      margin-top: ${theme("space.6")};
    }
  }
`

const Facts = styled("div")`
  grid-area: facts;
  align-self: end;

  @media ${theme("breakpoint.1040")} {
    font-size: ${theme("space.5")};
  }
`

export const AboutMe = () => (
  <AboutCard inverted>
    <Title>About Me</Title>

    <Image src="/images/avatar.webp" alt="profile avatar" />

    <Facts>
      B Sc Informatics
      <br />
      German | English
      <br />
      <Em>Skills:</Em>
      <br />
      TypeScript, React, Redux, CSS, Tailwind, Web Design
    </Facts>

    <Text>
      <p>
        I am a {new Date().getFullYear() - 1996} year old professional{" "}
        <Em>web developer</Em> who earned an Informatics degree in 2020 and has
        worked in the field since then, specializing in frontend infrastructure
        and component development.
      </p>
      <p>
        Most of the time, I create <Em>frontend</Em> apps with <Em>React</Em>{" "}
        and&nbsp;
        <Em>Typescript</Em>, <Em>design</Em> my own stuff and build cool
        projects out of joy and to learn new things.
      </p>
    </Text>
  </AboutCard>
)
