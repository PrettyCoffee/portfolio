import { PropsWithChildren } from "react"

import { styled } from "lib/goober"

import { CopyEmail } from "./copy-email"

const A = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const NoWrap = styled.span`
  display: inline-block;
  a {
    overflow-wrap: anywhere;
  }
`

const isExternal = (href: string) => href.startsWith("http")
const isEmail = (href: string) => href.startsWith("mailto:")

const EmailWrapper = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => (
  <NoWrap>
    <CopyEmail href={href} />
    {children}
  </NoWrap>
)

interface AnchorProps {
  href: string
  className?: string
}
export const Anchor = ({
  href,
  children,
  className,
}: PropsWithChildren<AnchorProps>) => {
  const Wrapper = isEmail(href) ? EmailWrapper : NoWrap
  return (
    <Wrapper href={href} className={className}>
      <A
        href={href}
        target={isExternal(href) ? "_blank" : "_self"}
        rel="noreferrer"
      >
        {children}
      </A>
    </Wrapper>
  )
}
