import './globals.css';
import type { Metadata } from 'next';
import { inconsolata } from '@/app/_utils/fonts';


export const metadata: Metadata = {
  title: 'Tamás Pál',
  description: 'Web Development and Graphic Design Portfolio',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en '>
      <body
        className={`bg-offwhite ${inconsolata.variable} font-sans selection:bg-blue selection:text-offwhite tracking-wider text-primarytext box-border`}
      >
        {children}
      </body>
    </html>
  );
}