'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { scrolledStyles, initStyles } from './styles/headerstyles';

const Three = dynamic(() => import('../animation/Three/Three'), {
  loading: () => (
    <h1
      className={`relative left-[36px] md:left-[48px] top-[26px] md:top-[40px] text-[33px] md:text-[44px] text-4xl logo`}
    >
      TAMÁS PÁL
    </h1>
  ),
});

export default function HomeHeader() {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isScrolled, setScrolled] = useState(false);

  // Handler when page is scrolled
  const handleScroll = () => {
    //console.log(window.scrollY);
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };


  return (
    <div
      id='header-wrap'
      className={`sticky top-0 justify-self-center self-start md:justify-self-start ${
        isScrolled ? `h-[calc(60px+12px)]` : `h-[140px]`
      } z-40 transition-[height] duration-[900ms]`}
    >
      <header
        className={`max-w-screen-2xl mx-auto -mb-8 px-1.5 rounded-b-2xl transition-all duration-[900ms] md:duration-[1800ms] ${
          isScrolled ? scrolledStyles : initStyles
        }`}
      >
        <Link href='/'>
          <Three />
        </Link>
      </header>
    </div>
  );
}
