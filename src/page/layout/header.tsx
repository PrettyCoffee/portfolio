import { hidden } from "components/hidden"
import { styled, css } from "lib/goober"
import { theme } from "utils/theme"

import { CurrentSection } from "./current-section"
import { Icon, IconProps } from "../../components/icon"

const Title = styled.div`
  font-size: ${theme("font.lg")};
  font-weight: ${theme("font.bold")};
  letter-spacing: -${theme("space.px")};
  margin-bottom: -${theme("space.1")};
  margin-left: ${theme("space.5")};
  @media ${theme("breakpoint.720")} {
    margin-left: 0;
  }
`

const PageTitle = () => (
  <Title>
    <CurrentSection />
  </Title>
)

const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  border-radius: 50vh;
  border: 1.5px solid currentColor;
  background: black;
  width: max-content;

  li {
    line-height: 1;
  }

  @media ${theme("breakpoint.720")} {
    display: none;
  }
`

const NavLink = styled.a`
  position: relative;
  height: ${theme("space.10")};
  width: ${theme("space.10")};
  display: grid;
  place-content: center;
  border-radius: 50vh;

  &:focus-visible {
    outline: 1.5px solid currentColor;
    outline-offset: -${theme("space.1")};
  }

  @media (prefers-reduced-motion: no-preference) {
    svg {
      transition: scale 100ms ease-out;
    }
    &:hover svg {
      scale: 1.2;
    }
    &:active svg {
      scale: 1.5 0.8;
    }
  }

  &:not(:hover, :focus-visible) > span:last-of-type {
    ${hidden}
  }
`

const LinkLabel = styled.span`
  display: inline-block;
  position: absolute;
  left: calc(100% + ${theme("space.2")});
  top: 50%;
  translate: 0 -50%;
  font-size: ${theme("font.md")};
  white-space: nowrap;
`

const ExternalIcon = styled(Icon)`
  margin-bottom: ${theme("space.2")};
`

interface LinksItemProps {
  href: string
  label: string
  icon: IconProps["icon"]
}
const LinksItem = ({ href, label, icon }: LinksItemProps) => {
  const isExternal = !href.startsWith("#")
  return (
    <li>
      <NavLink
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
      >
        <Icon icon={icon} size={20} />
        <LinkLabel>
          {label}
          {isExternal && <ExternalIcon icon="external" size={8} />}
        </LinkLabel>
      </NavLink>
    </li>
  )
}
const Links = () => (
  <LinkList>
    <LinksItem label="Scroll Up" href="#" icon="arrow-up" />
    <LinksItem label="About Me" href="#about-me" icon="face" />
    <LinksItem label="Projects" href="#projects" icon="toolbox" />
    <LinksItem label="Playground" href="#playground" icon="squiggle" />
    <LinksItem
      label="Github Profile"
      href="https://github.com/PrettyCoffee"
      icon="github"
    />
  </LinkList>
)

const HeaderLayout = styled.header`
  position: fixed;
  z-index: 100;
  top: ${theme("space.1")};
  left: ${theme("space.2")};

  display: flex;
  flex-direction: column;
  align-items: start;

  mix-blend-mode: difference;
  color: white;
`

const InnerLayout = styled.div`
  display: flex;
  flex-direction: column;
  @media ${theme("breakpoint.720")} {
    flex-direction: row;
  }
`

const Divider1 = styled.div`
  border-top: 1.5px solid currentColor;
  border-left: 1.5px solid currentColor;
  margin-left: ${theme("space.5")};
  height: ${theme("space.6")};
  width: ${theme("space.10")};
  border-top-left-radius: ${theme("space.2")};

  @media ${theme("breakpoint.720")} {
    height: ${theme("space.2")};
    border-bottom: 1.5px solid currentColor;
    border-bottom-left-radius: ${theme("space.2")};
    margin-left: 0;
  }
`

const Divider2 = styled.div`
  border-left: 1.5px solid currentColor;
  margin-left: ${theme("space.5")};
  height: ${theme("space.6")};

  @media ${theme("breakpoint.720")} {
    border-left: none;
    --left-offset: calc(${theme("space.10")}); /* width Divider1 */
    --right-offset: calc(${theme("space.4")}); /* screen offset left */
    width: calc(100vw - var(--left-offset) - var(--right-offset));
    height: ${theme("space.2")};
    border-bottom: 1.5px solid currentColor;
    margin-left: 0;
  }
`

const Squares = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(${theme("space.10")} + 1.5px);

  & > * {
    margin-bottom: -${theme("space.2")};
  }

  @media ${theme("breakpoint.720")} {
    display: none;
  }
`

const Square = styled
  .div<{ inverted?: boolean }>(({ inverted }) => [
    css`
      height: ${theme("space.6")};
      width: ${theme("space.6")};
      border: ${theme("space.2px")} solid currentColor;
      rotate: 45deg;
      transform-origin: center;
      background: currentColor;
    `,
    inverted &&
      css`
        background: black;
        z-index: 1;
      `,
  ])
  .filterProps(["inverted"])

export const Header = () => (
  <HeaderLayout>
    <PageTitle />

    <InnerLayout>
      <Divider1 />
      <Links />
      <Divider2 />
      <Squares>
        <Square />
        <Square inverted />
        <Square />
      </Squares>
    </InnerLayout>
  </HeaderLayout>
)
