import { createPages } from 'waku';
import adapter from 'waku/adapters/default';
import RootLayout from './page/layout';
import Page from './page/page';
import AboutPage from './page/about';
import Root from './page/root';

const pages = createPages(
  async ({ createRoot, createLayout, createPage }) => [
    createRoot({
      render: "static",
      component: Root,
    }),

    createLayout({
      render: 'static',
      path: '/',
      component: RootLayout,
    }),

    createPage({
      render: 'static',
      path: '/',
      component: Page,
      unstable_disableSSR: true,
    }),

    createPage({
      render: 'static',
      path: '/about',
      component: AboutPage,
      unstable_disableSSR: true,
    }),
  ],
);

export default adapter(pages);
