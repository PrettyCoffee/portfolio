import { ReactNode } from "react"

import { Card } from "components/card"
import { DeEm, Em } from "components/em"
import { css, keyframes, styled } from "lib/goober"
import { theme } from "utils/theme"

interface ExpertiseItem {
  title: string
  description: ReactNode
  keywords: string[]
  icon: string
}
const expertise: ExpertiseItem[] = [
  {
    title: "Web Applications",
    keywords: [
      "React",
      "Tailwind",
      "Redux / RTK",
      "AG Grid",
      "OpenAPI Specs",
      "Lingui",
    ],
    icon: `<path d='M12 17v4'/><path d='M8 21h8'/><path d='m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15'/><circle cx='8' cy='9' r='2'/><rect x='2' y='3' width='20' height='14' rx='2'/>`,
    description:
      "Creating web applications with a user-centric mindset, focusing on privacy, usability, maintainability, and above all, quality. I resent malicious design patterns.",
  },
  {
    title: "NPM Modules",
    keywords: [
      "Component Libraries",
      "Microfrontend Widgets",
      "Authentication",
    ],
    icon: `<path d='M20.7159 7.14927C20.6458 7.03223 20.5637 6.92234 20.4707 6.82145C20.2526 6.58478 19.9531 6.41838 19.3541 6.08557L13.5541 2.86335C12.9868 2.54823 12.7032 2.39068 12.4029 2.32891C12.1371 2.27424 11.8629 2.27424 11.5971 2.32891C11.2968 2.39068 11.0132 2.54823 10.4459 2.86335L4.64594 6.08557C4.04689 6.41838 3.74737 6.58478 3.52927 6.82145C3.42942 6.9298 3.34214 7.04853 3.26878 7.17535M20.7159 7.14927C20.7912 7.27514 20.8527 7.40926 20.899 7.54935C21 7.85495 21 8.19759 21 8.88288V10.75M20.7159 7.14927L12 12M3.26878 7.17535C3.20038 7.29361 3.14407 7.4189 3.10097 7.54935C3 7.85495 3 8.19759 3 8.88288V15.1171C3 15.8024 3 16.145 3.10097 16.4506C3.19029 16.721 3.33632 16.9691 3.52927 17.1785C3.74737 17.4152 4.0469 17.5816 4.64594 17.9144L10.4459 21.1366C11.0132 21.4517 11.2968 21.6093 11.5971 21.6711C11.8166 21.7162 12 21.5304 12 21.3064L12 12M3.26878 7.17535L12 12M16.5 9.49999L7.5 4.49999M17.7504 16.4046L16.0943 18.0608C15.8979 18.2572 15.8979 18.5756 16.0943 18.772L17.7504 20.4282M21.7676 15.1341L20.4372 21.712' />`,
    description:
      "Experienced in developing npm modules used across teams, to implement consistent patterns, shared behavior, and to boost productivity of devs in their day-to-day work.",
  },
  {
    title: "Frontend Infrastructure",
    keywords: [
      "NPM Toolchain",
      "Supply Chain Security",
      "Azure DevOps Pipelines",
      "Docker Images",
    ],
    icon: `<path d='M10.0486 9.01714L8.12784 10.9379C7.90005 11.1657 7.90005 11.535 8.12784 11.7628L10.0486 13.6835M13.9514 9.01714L15.8722 10.9379C16.1 11.1657 16.1 11.535 15.8722 11.7628L13.9514 13.6835M10.5683 2.32393L7.36828 3.32393C6.15871 3.70192 5.55392 3.89092 5.10603 4.25553C4.71059 4.57744 4.40373 4.99484 4.21442 5.46829C4 6.00455 4 6.63818 4 7.90544V8.78363C4 11.1293 4 12.3021 4.25373 13.4069C4.51186 14.5309 4.96247 15.6018 5.58563 16.5721C6.19816 17.5259 7.03672 18.3459 8.71384 19.9859C9.8252 21.0726 10.3809 21.6159 11.0126 21.8361C11.652 22.059 12.348 22.059 12.9874 21.8361C13.6191 21.6159 14.1748 21.0726 15.2862 19.9859C16.9633 18.3459 17.8018 17.5259 18.4144 16.5721C19.0375 15.6018 19.4881 14.5309 19.7463 13.4069C20 12.3021 20 11.1293 20 8.78363V7.90544C20 6.63818 20 6.00455 19.7856 5.46829C19.5963 4.99484 19.2894 4.57744 18.894 4.25553C18.4461 3.89092 17.8413 3.70192 16.6317 3.32393L13.4317 2.32393C12.8999 2.15772 12.6339 2.07462 12.3626 2.04158C12.1217 2.01226 11.8783 2.01226 11.6374 2.04158C11.3661 2.07462 11.1001 2.15772 10.5683 2.32393Z' />`,
    description:
      "Evolving frontend infrastructure to strengthen security against supply chain attacks, automate workflows to reduce friction, and maintain a modern, efficient tool stack.",
  },
  {
    title: "Code Quality",
    keywords: ["Code Reviews", "Linting", "Unit Testing", "End-to-End Testing"],
    icon: `<g clip-path='url(%23clip0_220_10631)'><path d='M13.6999 11.1537C13.9854 10.1775 14.1281 9.68942 14.2667 9.48947C14.8632 8.62879 16.1358 8.62879 16.7323 9.48947C16.8709 9.68942 17.0137 10.1775 17.2991 11.1537C17.4112 11.5368 17.4672 11.7283 17.5421 11.9008C17.845 12.5982 18.4013 13.1545 19.0987 13.4574C19.2712 13.5323 19.4627 13.5883 19.8458 13.7004C20.822 13.9858 21.3101 14.1286 21.51 14.2672C22.3707 14.8637 22.3707 16.1363 21.51 16.7328C21.3101 16.8714 20.822 17.0142 19.8458 17.2996C19.4627 17.4117 19.2712 17.4677 19.0987 17.5426C18.4013 17.8455 17.845 18.4018 17.5421 19.0992C17.4672 19.2717 17.4112 19.4632 17.2991 19.8463C17.0137 20.8225 16.8709 21.3106 16.7323 21.5105C16.1358 22.3712 14.8632 22.3712 14.2667 21.5105C14.1281 21.3106 13.9854 20.8225 13.6999 19.8463C13.5878 19.4632 13.5318 19.2717 13.4569 19.0992C13.154 18.4018 12.5977 17.8455 11.9003 17.5426C11.7278 17.4677 11.5363 17.4117 11.1532 17.2996C10.177 17.0142 9.68893 16.8714 9.48898 16.7328C8.62831 16.1363 8.62831 14.8637 9.48898 14.2672C9.68893 14.1286 10.177 13.9858 11.1532 13.7004C11.5363 13.5883 11.7278 13.5323 11.9003 13.4574C12.5977 13.1545 13.154 12.5982 13.4569 11.9008C13.5318 11.7283 13.5878 11.5368 13.6999 11.1537Z'/><path d='M5.63593 2.57665C5.68802 2.39852 5.71407 2.30945 5.73371 2.26989C5.91749 1.89962 6.44565 1.89962 6.62943 2.26989C6.64907 2.30945 6.67512 2.39852 6.72721 2.57665C6.80904 2.85646 6.84996 2.99636 6.89744 3.12518C7.30241 4.22392 8.16852 5.09002 9.26726 5.495C9.39608 5.54248 9.53598 5.58339 9.81579 5.66522C9.99392 5.71732 10.083 5.74337 10.1226 5.763C10.4928 5.94679 10.4928 6.47495 10.1226 6.65873C10.083 6.67837 9.99392 6.70442 9.81579 6.75651C9.53598 6.83834 9.39608 6.87925 9.26726 6.92673C8.16852 7.33171 7.30241 8.19781 6.89744 9.29655C6.84996 9.42537 6.80904 9.56528 6.72721 9.84508C6.67512 10.0232 6.64907 10.1123 6.62943 10.1518C6.44565 10.5221 5.91749 10.5221 5.73371 10.1518C5.71407 10.1123 5.68802 10.0232 5.63593 9.84508C5.5541 9.56528 5.51318 9.42537 5.4657 9.29655C5.06072 8.19781 4.19462 7.33171 3.09588 6.92673C2.96706 6.87925 2.82716 6.83834 2.54735 6.75651C2.36922 6.70442 2.28015 6.67837 2.24059 6.65873C1.87032 6.47495 1.87032 5.94679 2.24059 5.763C2.28015 5.74337 2.36922 5.71732 2.54735 5.66522C2.82716 5.58339 2.96706 5.54248 3.09588 5.495C4.19462 5.09002 5.06072 4.22392 5.4657 3.12518C5.51318 2.99636 5.5541 2.85646 5.63593 2.57665Z'/></g><defs><clipPath id='clip0_220_10631'><rect width='24' height='24' fill='white'/></clipPath></defs>`,
    description:
      "Prioritizing code quality through best practices such as thorough code reviews, static code analysis, and automated testing to create reliable and sustainable codebases.",
  },
]

const Layout = styled.div`
  max-width: ${theme("space.x11")};
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme("space.8")};

  @media ${theme("breakpoint.880")} {
    grid-template-columns: 1fr;
  }
`

const backgroundLoop = keyframes`
  from {
    background-position-x: 0, 2rem, 0;
  }
  to {
    background-position-x: -4rem, 6rem, -4rem;
  }
`

const ExpCard = styled(Card)<{ icon: string }>(
  ({ icon }) => css`
    position: relative;

    padding-top: ${theme("space.x1")};
    padding-bottom: ${theme("space.3")};
    padding-left: ${theme("space.4")};
    padding-right: ${theme("space.4")};

    display: flex;
    flex-direction: column;
    gap: 8px;

    overflow: hidden;

    & > * {
      position: relative;
      z-index: 2;
    }
    &::before,
    &::after {
      content: "";
      z-index: 0;
      position: absolute;
      inset: 0;
    }
    &::before {
      top: 0;
      bottom: calc(100% - 10rem);
      opacity: 0.5;

      --svg: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgb(21,24,27)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>${icon}</svg>");
      background-image: var(--svg), var(--svg), var(--svg);
      background-repeat: repeat-x;
      background-size: 4rem;
      background-position-x: 0, 2rem, 0;
      background-position-y: -2rem, 2rem, 6rem;
      transition: scale 300ms ease-out;
    }
    &::after {
      background: linear-gradient(
        0deg,
        ${theme("background.base")},
        ${theme("background.base")} calc(100% - 10rem),
        transparent
      );
    }

    &:hover::before {
      scale: 1.1;
      animation: 10s ${backgroundLoop} linear infinite;
    }
  `
).filterProps(["icon"])

const Keywords = ({ keywords }: { keywords: string[] }) => (
  <div>
    <Em>Keywords: </Em>
    <DeEm block>{keywords.join(", ")}</DeEm>
  </div>
)

const FlexSpacer = styled.div`
  flex: 1;
`

export const Expertise = () => (
  <Layout>
    {expertise.map(({ title, description, keywords, icon }) => (
      <ExpCard key={title} icon={icon}>
        <h3>{title}</h3>
        <p>{description}</p>
        <FlexSpacer />
        <Keywords keywords={keywords} />
      </ExpCard>
    ))}
  </Layout>
)
