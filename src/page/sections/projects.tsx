import { Anchor } from "components/anchor"
import { Carousel } from "components/carousel"
import { DeEm, Em } from "components/em"
import { css, styled } from "lib/goober"
import { theme } from "utils/theme"

interface ProjectData {
  name: string
  description: string
  imgSrc: string
  imgBg: string
  year: number
  repoUrl: string
  projectUrl?: string
  docsUrl?: string
  stack: string[]
}
const projectList: ProjectData[] = [
  {
    year: 2026,
    name: "Boring Blocks",
    description:
      "A boring react component library for classic shadcn style productivity UIs. I am a component developer afterall and find joy in creating these things.",
    imgSrc: "/images/boring-blocks.webp",
    imgBg: "#0C0A0A",
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
    name: "Clocktopus",
    description:
      "A time tracking tool to track your working and break times. Mostly here to help me remember what I did the day before, to repeat it in a Daily.",
    imgSrc: "/images/clocktopus.webp",
    imgBg: "#0C0A0A",
    repoUrl: "https://github.com/PrettyCoffee/clocktopus",
    projectUrl: "https://prettycoffee.github.io/clocktopus",
    stack: ["React", "TypeScript", "Tailwind", "Lingui", "Radix UI"],
  },
  {
    year: 2024,
    name: "yaasl",
    description:
      "Yet Another Atomic Store Library (yaasl) is a state management system like many others. The goal was to reduce the boilerplate of atomic state and related middleware to a minimum, while not sacrificing on developer experience.",
    imgSrc: "/images/yaasl.webp",
    imgBg: "#09090B",
    repoUrl: "https://github.com/PrettyCoffee/yaasl",
    docsUrl: "https://prettycoffee.github.io/yaasl",
    stack: ["Standalone"],
  },
  {
    year: 2024,
    name: "Gaming Roulette",
    description:
      "Tool to help you (and your friends) decide what game to play next. Initially intended to be desktop only (via Tauri), it is now usable as a web app as well.",
    imgSrc: "/images/gaming-roulette.webp",
    imgBg: "#000000",
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
    imgBg: "#131C2D",
    repoUrl: "https://github.com/PrettyCoffee/yet-another-generic-startpage",
    projectUrl: "https://prettycoffee.github.io/yet-another-generic-startpage",
    stack: ["React", "TypeScript", "EmotionJS", "HeadlessUI"],
  },
]

const Layout = styled.div`
  max-width: ${theme("space.x11")};
  width: 100%;
`

const ProjectGrid = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  padding: ${theme("space.4")};
  overflow: hidden;
  border-radius: 0.5rem;
  color: ${theme("text.base")};

  display: grid;
  gap: ${theme("space.4")};
  grid-template:
    ". ." 1fr
    "name name" auto
    "description ." auto
    "stack links" auto / 1fr auto;

  @media ${theme("breakpoint.1040")} {
    grid-template:
      ". ." 1fr
      "name name" auto
      "description description" auto
      "stack links" auto / 1fr auto;
  }

  @media ${theme("breakpoint.880")} {
    aspect-ratio: 3 / 2;
  }

  @media ${theme("breakpoint.720")} {
    aspect-ratio: unset;
    height: max-content;
    grid-template:
      ". ." 10rem
      "name name" auto
      "description description" auto
      "stack links" auto / 1fr auto;
  }

  @media ${theme("breakpoint.560")} {
    grid-template:
      "." 10rem
      "name" auto
      "description" auto
      "stack" auto
      "links" auto / 1fr;
  }
`

const Image = styled
  .img<{ imgBg: string }>(
    ({ imgBg }) => css`
      position: absolute;
      inset: 0;
      z-index: -2;
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
      background-color: ${imgBg};

      transition: scale 300ms ease-out;
      *:hover > & {
        scale: 1.05;
      }

      @media ${theme("breakpoint.720")} {
        object-fit: contain;
        object-position: top center;
      }
    `
  )
  .filterProps(["imgBg"])

const ImageMask = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(45deg, ${theme("background.base")}, transparent),
    linear-gradient(0deg, ${theme("background.base")}, transparent);
`

const Name = styled.h3`
  grid-area: name;
  line-height: 1;
  font-size: ${theme("font.lg")};
  margin-bottom: -${theme("space.2")};
`
const Description = styled.p`
  grid-area: description;
`

const ProjectDetails = ({ name, year, description }: ProjectData) => (
  <>
    <Name>
      {name} ({year})
    </Name>
    <Description>{description}</Description>
  </>
)

const StackLayout = styled.div`
  grid-area: stack;
`
const Stack = ({ stack }: ProjectData) => (
  <StackLayout>
    <Em>Stack: </Em>
    <DeEm block>{stack.join(", ")}</DeEm>
  </StackLayout>
)

const Links = styled.div`
  grid-area: links;
  place-self: end;
  & > *:not(:first-of-type) {
    margin-left: ${theme("space.4")};
  }
`
const Link = styled(Anchor)`
  display: inline-flex;
  align-items: center;
  gap: ${theme("space.2")};
  height: ${theme("space.10")};
  padding: 0 ${theme("space.3")};
  border: ${theme("space.2px")} solid ${theme("stroke.base")};
  font-weight: ${theme("font.bold")};

  &:hover,
  &:focus-visible {
    background-color: ${theme("background.invert")};
    color: ${theme("text.invert")};
    text-decoration: none;
  }
`
const LinkList = ({ projectUrl, docsUrl, repoUrl }: ProjectData) => (
  <Links>
    {projectUrl && <Link href={projectUrl}>Project</Link>}
    {docsUrl && <Link href={docsUrl}>Docs</Link>}
    <Link href={repoUrl}>Repo</Link>
  </Links>
)

const Project = (project: ProjectData) => (
  <ProjectGrid className="dark">
    {/* eslint-disable-next-line react/destructuring-assignment */}
    <Image src={project.imgSrc} imgBg={project.imgBg} />
    <ImageMask />
    <ProjectDetails {...project} />
    <Stack {...project} />
    <LinkList {...project} />
  </ProjectGrid>
)

export const Projects = () => (
  <Layout>
    <Carousel.Root>
      {projectList.map(project => (
        <Carousel.Item key={project.name} title={project.name}>
          <Project key={project.name} {...project} />
        </Carousel.Item>
      ))}
    </Carousel.Root>
  </Layout>
)
