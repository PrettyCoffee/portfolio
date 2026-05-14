import type { PropsWithChildren } from 'react';
import { Footer } from 'components/footer';
import { Header } from 'components/header';
import '../styles.css';

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <main className="m-6 flex items-center *:min-h-64 *:min-w-64 lg:m-0 lg:min-h-svh lg:justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
