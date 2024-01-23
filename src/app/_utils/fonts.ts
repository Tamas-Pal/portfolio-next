import {
  Unbounded,
  Fraunces,
  Work_Sans,
  Space_Grotesk,
  Bagel_Fat_One,
  Akaya_Kanadaka,
  Inconsolata,
} from 'next/font/google';

import localFont from 'next/font/local';
/*
export const work = Work_Sans({
  subsets: ['latin'],
  fallback: ['sans-serif', 'system-ui', 'arial'],
  variable: '--font-work',
  weight: ['400', '600'],
  display: 'swap',
});

export const inconsolata = Inconsolata({
  subsets: ['latin'],
  fallback: ['sans-serif', 'system-ui', 'arial'],
  weight: ['400', '600'],
  variable: '--font-inconsolata',
  display: 'swap',
});
*/
export const work = localFont({
  src: '../../../public/fonts/WorkSans-Variable.ttf',
  //subsets: ['latin'],
  fallback: ['sans-serif', 'Roboto', 'arial'],
  variable: '--font-work',
  weight: '600',
  display: 'swap',
});

export const inconsolata = localFont({
  src: [
    {
      path: '../../../public/fonts/Inconsolata-Regular.ttf',
      weight: '400',
      style: 'regular',
    },
    {
      path: '../../../public/fonts/Inconsolata-SemiBold.ttf',
      weight: '600',
      style: 'semibold',
    },
  ],
  //subsets: ['latin'],
  fallback: ['monospace', 'sans-serif', 'system-ui', 'arial'],
  weight: '400 600',
  variable: '--font-inconsolata',
  display: 'swap',
});
