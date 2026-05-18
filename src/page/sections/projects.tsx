import { Card } from "components/card"
import { DeEm, Em } from "components/em"
import { styled } from "utils/styled"
import { theme } from "utils/theme"

interface Project {
  name: string
  description: string
  imgSrc: string
  imgSize: string
  year: number | "wip"
  repoUrl: string
  projectUrl?: string
  docsUrl?: string
  stack: string[]
}
const projectList: Project[] = [
  {
    year: 2026,
    name: "Boring Blocks",
    description:
      "A boring react component library for classic shadcn style productivity UIs. I am a component developer afterall and find joy in creating these things.",
    imgSrc: "/images/boring-blocks.webp",
    imgSize: "8rem",
    repoUrl: "https://github.com/PrettyCoffee/boring-blocks",
    docsUrl: "https://prettycoffee.github.io/boring-blocks",
    stack: [
      "React",
      "TypeScript",
      "Tailwind",
      "Floating UI",
      "DnD Kit",
      "Lingui",
    ],
  },
  {
    year: 2026,
    name: "Portfolio v4",
    description:
      "The latest version of my portfolio, created to show off my fun projects. You are currently looking at it.",
    imgSrc: "/images/avatar.webp",
    imgSize: "8rem",
    repoUrl: "https://github.com/PrettyCoffee/portfolio",
    stack: ["React", "TypeScript", "Waku", "Goober"],
  },
  {
    year: 2026,
    name: "Clocktopus",
    description:
      "A time tracking tool to track your working and break times. Mostly here to help me remember what I did the day before, to repeat it in a Daily.",
    imgSrc: "/images/clocktopus.webp",
    imgSize: "6rem",
    repoUrl: "https://github.com/PrettyCoffee/clocktopus",
    projectUrl: "https://prettycoffee.github.io/clocktopus",
    stack: ["React", "TypeScript", "Tailwind", "Lingui", "Radix UI"],
  },
  {
    year: 2024,
    name: "yaasl",
    description:
      "Yet Another Atomic Store Library (yaasl) is a state management system like many others. The goal was to reduce the boilerplate of atomic state and related middleware to a minimum, while not sacrificing on developer experience.",
    imgSrc: "/images/yaasl.svg",
    imgSize: "7rem",
    repoUrl: "https://github.com/PrettyCoffee/yaasl",
    docsUrl: "https://prettycoffee.github.io/yaasl",
    stack: ["Standalone"],
  },
  {
    year: 2024,
    name: "Gaming Roulette",
    description:
      "Tool to help you (and your friends) decide what game to play next. Initially intended to be desktop only (via Tauri), it is now usable as a web app as well.",
    imgSrc: "/images/gaming-roulette.svg",
    imgSize: "5rem",
    repoUrl: "https://github.com/PrettyCoffee/gaming-roulette",
    projectUrl: "https://prettycoffee.github.io/gaming-roulette",
    stack: ["React", "TypeScript", "Tauri", "Tailwind", "Radix UI"],
  },
  {
    year: 2022,
    name: "Yet another generic startpage",
    description:
      "A browser startpage with a generic layout and many settings to modify its appearance and behavior.",
    imgSrc: "/images/yags.webp",
    imgSize: "8rem",
    repoUrl: "https://github.com/PrettyCoffee/yet-another-generic-startpage",
    projectUrl: "https://prettycoffee.github.io/yet-another-generic-startpage",
    stack: ["React", "TypeScript", "EmotionJS", "HeadlessUI"],
  },
]

const ProjectList = styled("ul")`
  display: flex;
  flex-direction: column;
  gap: ${theme("space.10")};
  width: 100%;
  max-width: ${theme("space.x11")};
`

const ProjectGrid = styled("li")`
  ${Card.styles({})}
  display: grid;
  grid-template:
    "img name name" min-content
    "img description description" auto
    "img stack links" auto / auto 1fr auto;
  gap: ${theme("space.6")};

  @media ${theme("breakpoint.880")} {
    grid-template:
      "img name name" min-content
      "img description description" auto
      "stack stack links" auto / min-content 1fr auto;
  }

  @media ${theme("breakpoint.560")} {
    grid-template:
      "img name" min-content
      "description description" auto
      "stack stack" auto
      "links links" auto / min-content 1fr;
  }
`

const ImageLayout = styled("div")`
  grid-area: img;
  place-self: center;
  height: ${theme("space.x2")};
  width: ${theme("space.x2")};
  display: grid;
  place-content: center;
  flex-shrink: 0;

  @media ${theme("breakpoint.720")} {
    height: ${theme("space.x1")};
    width: ${theme("space.x1")};
  }
`
const Image = styled("img")`
  object-fit: contain;
  height: inherit;
  width: inherit;
`
const ProjectImage = ({ imgSrc, imgSize }: Project) => (
  <ImageLayout>
    <Image src={imgSrc} style={{ maxHeight: imgSize, maxWidth: imgSize }} />
  </ImageLayout>
)

const Name = styled("h3")`
  grid-area: name;
  line-height: 1;
  margin-bottom: ${theme("space.4")};
  align-self: end;
  font-size: 1.125rem;
  margin-bottom: -1.125rem;

  @media ${theme("breakpoint.560")} {
    align-self: center;
    font-size: 1.25rem;
    margin-bottom: 0;
  }
`
const Description = styled("p")`
  grid-area: description;
  align-self: start;
`

const ProjectDetails = ({ name, description }: Project) => (
  <>
    <Name>{name}</Name>
    <Description>{description}</Description>
  </>
)

const StackLayout = styled("div")`
  grid-area: stack;
`
const Stack = ({ stack }: Project) => (
  <StackLayout>
    <Em>Stack: </Em>
    <DeEm block>{stack.join(", ")}</DeEm>
  </StackLayout>
)

const Links = styled("div")`
  grid-area: links;
  place-self: end;
  & > *:not(:first-of-type) {
    margin-left: ${theme("space.4")};
  }
`
const Link = styled("a")`
  display: inline-flex;
  align-items: center;
  gap: ${theme("space.2")};
  height: ${theme("space.10")};
  padding: 0 ${theme("space.3")};
  border: ${theme("space.2px")} solid ${theme("stroke.base")};
  font-weight: 800;

  &:hover,
  &:focus-visible {
    background-color: ${theme("background.invert")};
    color: ${theme("text.invert")};
  }
`
const LinkList = ({ projectUrl, docsUrl, repoUrl }: Project) => (
  <Links>
    {projectUrl && (
      <Link href={projectUrl} target="_blank" rel="noreferrer">
        Project
      </Link>
    )}
    {docsUrl && (
      <Link href={docsUrl} target="_blank" rel="noreferrer">
        Docs
      </Link>
    )}
    <Link href={repoUrl} target="_blank" rel="noreferrer">
      Repo
    </Link>
  </Links>
)

const Project = (project: Project) => (
  <ProjectGrid>
    <ProjectImage {...project} />
    <ProjectDetails {...project} />
    <Stack {...project} />
    <LinkList {...project} />
  </ProjectGrid>
)

export const Projects = () => (
  <ProjectList>
    {projectList.map(project => (
      <ProjectGrid key={project.name}>
        <ProjectImage {...project} />
        <ProjectDetails {...project} />
        <Stack {...project} />
        <LinkList {...project} />
      </ProjectGrid>
    ))}
  </ProjectList>
)
