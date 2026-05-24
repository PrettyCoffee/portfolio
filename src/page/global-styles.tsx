import { css, ExtractCss } from "lib/goober"
import { theme } from "utils/theme"

const varsToString = (vars: Record<string, string>) =>
  Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n")

const themeVars = css`
  :root,
  .dark {
    ${varsToString(theme.getCssVars("dark"))}
  }
  .light {
    ${varsToString(theme.getCssVars("light"))}
  }
`

const globalStyles = css`
  @layer base {
    :root {
      background: ${theme("background.base")};
      color: ${theme("text.base")};

      font-family: "Noto Serif", serif;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    @media (prefers-reduced-motion: no-preference) {
      :root {
        scroll-behavior: smooth;
      }
    }

    html,
    body,
    #root {
      min-height: 100%;
    }

    ::selection {
      background: ${theme("text.base")};
      color: ${theme("background.base")};
    }

    a:focus-visible {
      outline: ${theme("space.2px")} solid ${theme("text.base")};
      outline-offset: ${theme("space.2px")};
      border-radius: ${theme("space.px")};
    }
  }
`

const cssReset = css`
  @layer base {
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border: 0 solid;
    }

    ul,
    ol {
      list-style: none;
    }

    a {
      text-decoration: none;
      color: inherit;
      &::visited {
        color: inherit;
      }
    }

    button,
    input,
    select,
    textarea {
      font: inherit;
      font-feature-settings: inherit;
      font-variation-settings: inherit;
      letter-spacing: inherit;
      color: inherit;
      border-radius: 0;
      background-color: transparent;
    }

    button:not([disabled]) {
      cursor: pointer;
    }
  }
`

export const GlobalStyles = () => (
  <>
    <style>{cssReset.toString()}</style>
    <style>{globalStyles.toString()}</style>
    <style>{themeVars.toString()}</style>
    <ExtractCss />
  </>
)
