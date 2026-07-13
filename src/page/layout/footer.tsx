import { styled } from "lib/goober"
import { theme } from "utils/theme"

const FooterLayout = styled.footer`
  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  padding: ${theme("space.6")};
  mix-blend-mode: difference;
  color: white;

  @media ${theme("breakpoint.720")} {
    position: absolute;
    bottom: 0;
  }
`

const Link = styled.a`
  &:hover {
    text-decoration: underline;
  }
`

export const Footer = () => (
  <FooterLayout>
    {"© 2026 "}
    <Link
      href="https://github.com/PrettyCoffee"
      target="_blank"
      rel="noreferrer"
    >
      PrettyCoffee
    </Link>
    <br />
    <Link
      href="https://github.com/PrettyCoffee/portfolio/blob/main/LICENSE"
      target="_blank"
      rel="noreferrer"
    >
      AGPL-3.0
    </Link>
    {" · "}
    <Link
      href="https://github.com/PrettyCoffee/portfolio"
      target="_blank"
      rel="noreferrer"
    >
      Source Code
    </Link>
  </FooterLayout>
)
