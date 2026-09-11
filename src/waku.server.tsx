import { createPages } from "waku"
import adapter from "waku/adapters/default"

import { Layout } from "./page/layout/layout"
import { Page } from "./page/page"
import { Root } from "./page/root"

// oxlint-disable-next-line typescript/require-await -- must be async
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
])

export default adapter(pages, { static: true })
