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

export const Intro = () => (
  <H1>
    Welcome to my
    <br />
    <Typer
      values={["portfolio", "passion", "hobby", "project", "playground"]}
    />
  </H1>
)
