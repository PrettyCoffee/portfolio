import { extractCss } from "goober"

import { theme } from "utils/theme"

// enables IDE css syntax highlighting
const css = (strings: TemplateStringsArray, ...values: (string | number)[]) =>
  strings
    .flatMap((string, index) => [string, values[index] || ""])
    .join("")
    .replaceAll(/\s+/g, " ")

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
      scroll-behavior: smooth;
      background: ${theme.read("background")};
      color: ${theme.read("text")};

      font-family: "Noto Serif", serif;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    html,
    body,
    #root {
      min-height: 100%;
    }

    ::selection {
      background: ${theme.read("text")};
      color: ${theme.read("background")};
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

// extractCss always empties the cache when the server reloads
// storing it in an environment variable helps to persist the styles across reloads
const getGooberStyles = () => {
  process.env["goober"] ??= ""
  process.env["goober"] += `\n${extractCss()}`
  return process.env["goober"]
}

export const GlobalStyles = () => (
  <>
    <style>{cssReset}</style>
    <style>{globalStyles}</style>
    <style>{themeVars}</style>
    <style id="_goober">{getGooberStyles()}</style>
  </>
)
