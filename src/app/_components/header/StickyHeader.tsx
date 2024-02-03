'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function StickyHeader({ isPage = false }: { isPage: boolean }) {
  // Hook to trigger handler if scrolled
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isScrolled, setScrolled] = useState(false);

  // Update state when page is scrolled
  const handleScroll = () => {
    if (window.scrollY > 112) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <Link
      className={`sticky top-8 w-full h-10 z-40 flex justify-center items-center `}
      href={isPage ? '/' : '#intro-wrap'}
    >
      <div
        className={`overflow-hidden px-1 h-8 flex gap-x-2 justify-center items-center transition-all duration-[900ms] ${
          isScrolled && 'backdrop-blur-md bg-offwhite/25 opacity-100'
        } ${isPage && !isScrolled && 'opacity-0'}
        `}
      >
        <div className={`bg-dotssm w-6 h-6`}></div>
        <div
          className={`relative ${
            isScrolled ? '-top-4' : 'top-4'
          } flex flex-col font-semibold text-offwhite tracking-wider transition-[top] duration-[900ms]`}
        >
          <h3
            className={`flex flex-col justify-center items-center h-8 transition-opacity duration-[600ms] ${
              isScrolled ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {!isPage && 'Welcome!'}
          </h3>
          <h3
            className={`flex flex-col justify-center items-center h-8 text-blue uppercase transition-opacity duration-[600ms] ${
              !isScrolled ? 'opacity-0' : 'opacity-100'
            }`}
          >
            Tamás Pál
          </h3>
        </div>
        <div className={`bg-dotssm w-6 h-6`}></div>
      </div>
    </Link>
  );
}
