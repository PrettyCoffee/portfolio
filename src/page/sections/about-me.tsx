import { styled } from "utils/styled"
import { theme } from "utils/theme"

const Card = styled("div")`
  display: flex;
  gap: ${theme("space.10")};
  padding: ${theme("space.10")};
  max-width: ${theme("space.220")};

  background-color: ${theme("background.invert")};
  color: ${theme("text.invert")};
  box-shadow: ${theme("shadow.box.high")};

  &::selection,
  *::selection {
    background-color: ${theme("background.base")};
    color: ${theme("text.base")};
  }
`

const Image = styled("img")`
  height: ${theme("space.60")};
  width: ${theme("space.60")};
  padding: ${theme("space.4")};
  border: ${theme("space.1")} solid ${theme("stroke.invert")};
  box-shadow: ${theme("shadow.box.high")};
`

const Column = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: min-content;
  gap: ${theme("space.10")};
`

const ProfileText = styled("div")`
  h2 {
    font-size: ${theme("space.8")};
    margin: 0;
    line-height: 1;
  }
  p {
    font-size: ${theme("space.6")};
    margin-top: ${theme("space.6")};
    text-align: justify;
  }
`

const Em = styled("em")`
  color: ${theme("accent.yellow")};
`

export const AboutMe = () => (
  <Card>
    <Column>
      <Image src="/images/profile.png" alt="profile avatar" />
      <div>
        B Sc Informatics
        <br />
        German | English
        <br />
        <Em>Skills:</Em>
        <br />
        TypeScript, React, Redux, CSS, Tailwind, Web Design
      </div>
    </Column>
    <ProfileText>
      <h2>About Me</h2>
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
    </ProfileText>
  </Card>
)
