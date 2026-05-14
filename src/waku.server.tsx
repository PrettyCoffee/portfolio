import { createPages } from "waku"
import adapter from "waku/adapters/default"

import { AboutPage } from "./page/about"
import { Layout } from "./page/layout"
import { Page } from "./page/page"
import { Root } from "./page/root"

// eslint-disable-next-line @typescript-eslint/require-await -- must be async
const pages = createPages(async ({ createRoot, createLayout, createPage }) => [
  createRoot({
    render: "static",
    component: Root,
  }),

  createLayout({
    render: "static",
    path: "/",
    component: Layout,
  }),

  createPage({
    render: "static",
    path: "/",
    component: Page,
    unstable_disableSSR: true,
  }),

  createPage({
    render: "static",
    path: "/about",
    component: AboutPage,
    unstable_disableSSR: true,
  }),
])

export default adapter(pages, { static: true })
