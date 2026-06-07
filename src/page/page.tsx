import { Section } from "components/section"

import { InitialOverlay } from "./initial-overlay"
import { InitialScroll } from "./initial-scroll"
import { sections } from "./sections/sections"

export const Page = () => (
  <div>
    <InitialScroll />
    <InitialOverlay />
    {sections.map(({ Content, ...props }, index) => (
      <Section
        key={props.id}
        variant={index % 2 === 1 ? "light" : "dark"}
        {...props}
      >
        <Content />
      </Section>
    ))}
  </div>
)
