import { Link } from "waku"

import { Counter } from "components/counter"
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
    <H1>Waku</H1>
    <p>Hello world!</p>
    <Counter />
    <StyledLink to="/about">About page</StyledLink>
  </div>
)
