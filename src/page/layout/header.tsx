import { Hidden } from "components/hidden"
import { styled } from "utils/styled"
import { theme } from "utils/theme"

import { CurrentSection } from "./current-section"
import { Icon, IconProps } from "../../components/icon"

const LinkList = styled("ul")`
  display: flex;
  flex-direction: column;
  border-radius: 50vh;
  border: 1.5px solid white;
  background: black;

  li {
    line-height: 1;
  }
`

const NavLink = styled("a")`
  position: relative;
  height: ${theme("space.10")};
  width: ${theme("space.10")};
  display: grid;
  place-content: center;
  border-radius: 50vh;

  &:focus-visible {
    outline: 1.5px solid white;
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
    ${Hidden.styles}
  }
`

const LinkLabel = styled("span")`
  display: inline-block;
  position: absolute;
  left: calc(100% + ${theme("space.2")});
  top: 50%;
  translate: 0 -50%;
  font-size: ${theme("space.4")};
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

const HeaderLayout = styled("header")`
  position: fixed;
  z-index: 100;
  top: ${theme("space.4")};
  left: ${theme("space.4")};
  bottom: ${theme("space.16")};

  display: flex;
  flex-direction: column;
  align-items: start;

  mix-blend-mode: difference;
  color: white;
`

const PageTitle = styled("div")`
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -${theme("space.px")};
  margin-bottom: -${theme("space.1")};
  margin-left: calc(${theme("space.10")} / 2);
`

const VDivider = styled("div")`
  border-right: 1.5px solid white;
  flex: 1;
  margin-left: calc(${theme("space.10")} / 2);
  max-height: ${theme("space.6")};
`

const HDivider = styled("div")`
  border-top: 1.5px solid white;
  margin-left: calc(${theme("space.10")} / 2);
  width: ${theme("space.10")};
`

const Squares = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(${theme("space.10")} + 1.5px);
`

const Square = styled("div")<{ invert?: boolean }>(({ css, invert }) => [
  css`
    height: ${theme("space.6")};
    width: ${theme("space.6")};
    border: ${theme("space.2px")} solid white;
    margin-bottom: -${theme("space.2")};
    rotate: 45deg;
    transform-origin: center;
    background: white;
  `,
  invert &&
    css`
      background: black;
      z-index: 1;
    `,
])

export const Header = () => (
  <HeaderLayout>
    <PageTitle>
      <CurrentSection />
    </PageTitle>
    <HDivider />
    <VDivider />

    <Links />

    <VDivider />
    <Squares>
      <Square />
      <Square invert />
      <Square />
    </Squares>
  </HeaderLayout>
)
