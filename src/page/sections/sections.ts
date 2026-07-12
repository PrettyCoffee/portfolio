import { FC } from "react"

import { IconProps } from "components/icon"

import { AboutMe } from "./about-me"
import { Experience } from "./experience"
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
    Content: AboutMe,
    header: { icon: "face" },
  },
  {
    id: "experience",
    name: "Experience",
    Content: Experience,
    header: { icon: "squiggle" },
  },
  {
    id: "projects",
    name: "Projects",
    Content: Projects,
    header: { icon: "toolbox" },
  },
  {
    id: "outro",
    name: "Outro",
    Content: Outro,
    header: { icon: "forward" },
  },
]
