import { FC } from "react"

import { IconProps } from "components/icon"

import { AboutMe } from "./about-me"
import { Intro } from "./intro"
import { Outro } from "./outro"
import { Projects } from "./projects"

interface Section {
  id: string
  name: string
  hideName?: boolean
  Content: FC
  header: {
    caption?: string
    icon: IconProps["icon"]
  }
}

export const sections: Section[] = [
  {
    id: "",
    name: "Portfolio",
    hideName: true,
    Content: Intro,
    header: { caption: "Scroll Up", icon: "arrow-up" },
  },
  {
    id: "about-me",
    name: "About Me",
    hideName: true,
    Content: AboutMe,
    header: { icon: "face" },
  },
  {
    id: "projects",
    name: "Projects",
    Content: Projects,
    header: { icon: "toolbox" },
  },
  {
    id: "playground",
    name: "Playground",
    Content: () => null,
    header: { icon: "squiggle" },
  },
  {
    id: "outro",
    name: "Outro",
    Content: Outro,
    header: { icon: "forward" },
  },
]
