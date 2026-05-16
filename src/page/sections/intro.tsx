import { TextCarousel } from "components/text-carousel"
import { styled } from "utils/styled"
import { theme } from "utils/theme"

const H1 = styled("h1")`
  font-size: ${theme("space.x1")};
  font-weight: 700;
  letter-spacing: -${theme("space.px")};
  line-height: 1;
  white-space: nowrap;
`

export const Intro = () => (
  <H1>
    Welcome to my
    <br />
    <TextCarousel
      values={["portfolio", "passion", "hobby", "project", "playground"]}
    />
  </H1>
)
