'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { scrolledStyles, initStyles } from './styles/headerstyles';

const Three = dynamic(() => import('../animation/Three/Three'), {
  loading: () => (
    <h1
      className={`relative left-[36px] md:left-[50px] top-[26px] md:top-[40px] font-semibold text-[33px] 
            md:text-[44px] text-4xl logo`}
    >
      TAMÁS PÁL
    </h1>
  ),
});

export default function PagesHeader() {
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
      className={`sticky top-0 justify-self-center px-4 sm:px-8 md:mx-20 lg:px-32 2xl:mx-32 ${
        isScrolled ? `h-[calc(60px+12px)]` : `h-[140px]`
      } z-[100] w-full max-w-[1792px] transition-[height] duration-[900ms]`}
    >
      <div
        className={`flex justify-center lg:justify-start relative max-w-[1536px] transition-all duration-[900ms] md:duration-[1800ms]`}
      >
        <header
          className={`relative rounded-b-2xl transition-all duration-[900ms] md:duration-[1800ms] px-1.5 ${
            isScrolled ? scrolledStyles : initStyles
          } ${isScrolled ? `lg:-left-[calc(29px)]` : `lg:-left-[calc(52px)]`}`}
        >
          <Link href='/'>
            <Three />
          </Link>
        </header>
      </div>
    </div>
  );
}
