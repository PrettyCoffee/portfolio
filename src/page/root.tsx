import { PropsWithChildren } from "react"

import { theme } from "utils/theme"

import { GlobalStyles } from "./global-styles"

const title = "PrettyCoffee"
const subtitle = "Portfolio"
const description = "Portfolio of PrettyCoffee."

// eslint-disable-next-line @typescript-eslint/require-await -- must be async to run extractCss in GlobalStyles at the end of ssg execution
export const Root = async ({ children }: PropsWithChildren) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" type="image/png" sizes="48x48" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content={theme.tokens.dark.background.base} />
      <link rel="stylesheet" href="/fonts/fonts.css" />

      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={subtitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://prettycoffee.dev/" />
      <meta
        property="og:image"
        content="https://prettycoffee.dev/preview-og.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="PrettyCoffee – Portfolio" />

      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://prettycoffee.dev/preview-og.png"
      />

      <GlobalStyles />
    </head>

    <body>
      <div id="root">{children}</div>
    </body>
  </html>
)
