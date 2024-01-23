import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        onetwo: '1fr 2fr',
      },
      fontFamily: {
        sans: ['var(--font-inconsolata)'],
        fraunces: ['var(--font-fraunces)'],
        maragsa: ['var(--font-maragsa)'],
        work: ['var(--font-work)'],
        title: ['var(--font-work)'],
        txt: ['var(--font-inconsolata)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          noise: "url('/noise.svg')", //'#aaaaaa'
          noiseanim: "url('/noise-animated.svg')",
          noisedarker: "url('/noise-darker.svg')",
          noisedarkeranim: "url('/noise-darkeranimated.svg')",
        dotssm: "url('/bg-pattern-sm.svg')", //'#a4a4a4'
        arrow: "url('/arrow.svg')", 
        arrowblue: "url('/arrow-blue.svg')", 
        sine: "url('/sine.svg')", 
      },
      colors: {
        highlight: '#09090b',
        bg: '#aaaaaa',
        bgdarker: '#a4a4a4',
        /*offwhite: '#f1f5f9',*/
        offwhite: '#f2f6fa',
        offblack: '#121212',
        blue: '#0000d3',
        charcoal: '#3c4142',
        primarytext: '#444',
      },
    },
  },
};
export default config;
