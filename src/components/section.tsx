import { PropsWithChildren } from "react"

import { styled } from "lib/goober"
import { theme } from "utils/theme"

import { ScrollingTitle } from "./scrolling-title"
import { SectionCsr } from "./section-csr"

const Background = styled.section`
  background: ${theme("background.base")};
  color: ${theme("text.base")};
  position: relative;
`

const Layout = styled.div`
  position: relative;
  min-height: 100lvh;
  padding: ${theme("space.x2")} ${theme("space.x1")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > :not(h2) {
    z-index: 1;
  }

  @media ${theme("breakpoint.720")} {
    section:not(:first-of-type) > & {
      padding: ${theme("space.x2")} ${theme("space.6")};
      min-height: calc(100lvh - ${theme("space.10")});
      padding-bottom: calc(${theme("space.x2")} - ${theme("space.10")});
    }
  }
`

const ScrollOffset = styled.div`
  height: 0;
  @media ${theme("breakpoint.720")} {
    section:not(:first-of-type) > & {
      height: ${theme("space.10")};
      background: ${theme("background.invert")};
    }
  }
`

const Title = styled.h2`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  display: grid;
  place-content: center;
  line-height: 0.76;
  font-size: min(18vw, ${theme("space.x3")});
  letter-spacing: -${theme("space.1")};
  white-space: nowrap;
  height: max-content;
  opacity: 0.1;
  overflow: hidden;
  padding-bottom: 0.5em;

  @media ${theme("breakpoint.720")} {
    top: ${theme("space.10")};
  }
`

interface SectionProps {
  id: string
  name: string
  hideName?: boolean
  variant: "dark" | "light"
}
export const Section = ({
  id,
  name,
  hideName,
  variant,
  children,
}: PropsWithChildren<SectionProps>) => (
  <Background id={id || undefined} className={variant}>
    <ScrollOffset />
    {!hideName && (
      <Title>
        <ScrollingTitle>{name}</ScrollingTitle>
      </Title>
    )}
    <Layout>
      <SectionCsr />
      {children}
    </Layout>
  </Background>
)
