import { styled } from "utils/styled"
import { theme } from "utils/theme"

const FooterLayout = styled("footer")`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: ${theme("space.6")};
  mix-blend-mode: difference;
  color: white;
`

const Link = styled("a")`
  text-decoration: underline;
  margin-top: ${theme("space.4")};
  display: inline-block;
`

export const Footer = () => (
  <FooterLayout>
    <div>
      visit{" "}
      <Link href="https://waku.gg/" target="_blank" rel="noreferrer">
        waku.gg
      </Link>{" "}
      to learn more
    </div>
  </FooterLayout>
)
