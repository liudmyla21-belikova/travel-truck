import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/page';
import 'modern-normalize/modern-normalize.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Travel Trucks',
  description: 'Find your comfortable truck',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <TanStackProvider>
          <main>
            <Header />
            {children}
          </main>
        </TanStackProvider>
      </body>
    </html>
  );
}
