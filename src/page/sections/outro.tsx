import { Anchor } from "components/anchor"
import { css, styled } from "lib/goober"
import { theme } from "utils/theme"

const Title = styled.div<{ size: "3xl" | "2xl" | "xl" | "lg" }>(
  ({ size }) => css`
    font-size: ${theme(`font.${size}`)};
    font-weight: ${theme("font.bold")};
    margin: ${theme("space.1")} 0;
    color: ${theme("text.gentle")};
    a {
      color: ${theme("text.base")};
    }
  `
)

const Stack = styled.div`
  position: absolute;
  bottom: ${theme("space.6")};
  right: ${theme("space.6")};
  display: inline-flex;
  justify-content: end;
  flex-wrap: wrap;
  gap: ${theme("space.1")};
  max-width: 50vw;
  text-align: end;

  a {
    white-space: nowrap;
  }

  @media ${theme("breakpoint.560")} {
    display: none;
  }
`

const MobileSmall = styled.span`
  @media ${theme("breakpoint.400")} {
    font-size: ${theme("font.lg")};
  }
`

export const Outro = () => (
  <>
    <Title size="lg">Wondering what to do next?</Title>
    <Title size="3xl">
      Have a look at my{" "}
      <Anchor href="https://github.com/PrettyCoffee">GitHub profile</Anchor>!
    </Title>
    <Title size="2xl">
      Or email me at{" "}
      <MobileSmall>
        <Anchor href="mailto:contact@prettycoffee.dev">
          contact@
          <wbr />
          prettycoffee.dev
        </Anchor>
      </MobileSmall>
    </Title>

    <Stack>
      <div>{"This page is powered by "}</div>
      <div>
        <Anchor href="https://react.dev">⚛️ React</Anchor>
        {", "}
        <Anchor href="https://waku.gg">⛩️ Waku</Anchor>
        {", and "}
        <Anchor href="https://goober.js.org">🥜 Goober</Anchor>.
      </div>
    </Stack>
  </>
)
