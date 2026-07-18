import { PropsWithChildren } from "react"

import { Slot } from "components/slot"
import { styled } from "lib/goober"

import { CopyEmail } from "./copy-email"

const A = styled.a`
  display: inline-block;
  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover {
    text-decoration: underline;
  }
`

const NoWrap = styled.span`
  display: inline-flex;
  flex-direction: row-reverse;
`

const isExternal = (href: string) => href.startsWith("http")
const isEmail = (href: string) => href.startsWith("mailto:")

const EmailWrapper = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => (
  <NoWrap>
    {children}
    <CopyEmail href={href} />
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
  const Wrapper = isEmail(href) ? EmailWrapper : Slot
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
