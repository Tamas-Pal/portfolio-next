'use client';

import { useIsVisible } from '@/app/_utils/useIsVisible';
import { Landing } from '@/types/landing';
import { ReactNode } from 'react';

const zIndex = [
  'z-[11]',
  'z-[12]',
  'z-[13]',
  'z-[14]',
  'z-[15]',
  'z-[16]',
  'z-[17]',
  'z-[18]',
];

export function Block({
  landing,
  index,
  children,
}: {
  landing: Landing;
  index: number;
  children: ReactNode;
}) {
  // hook to animate block layout (horizontal paddings) when intersecting screen
  const [containerRef, isVisible] = useIsVisible({
    root: null,
    rootMargin: '0px',
    threshold: 0.24,
  });

  let padding =
    'pt-14 pb-12 md:pt-14 md:pb-20 lg:py-24 px-4 sm:px-8 md:px-20 lg:px-32 xl:px-32';

  // alternating background color for blocks
  let backgroundColor = (() => {
    if (landing.attributes.Blocks.length % 2 === 1) {
      if (index % 2 === 0) {
        return 'bg-noise';
      } else {
        return 'bg-noisedarker';
      }
    } else {
      if (index % 2 === 1) {
        return 'bg-noise';
      } else {
        return 'bg-noisedarker';
      }
    }
  })();

  return (
    <>
      <section
        ref={containerRef}
        className={`${padding} relative overflow-hidden ${zIndex[index]} ${
          isVisible ? padding : padding
        } grid justify-stretch  ${backgroundColor} border-t border-offwhite rounded-t-2xl upshadow transition-all duration-[900ms] 
       group`}
      >
        <div
          className={`relative grid justify-stretch items-center transition-[transform,opacity] duration-[900ms] ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-[40px] lg:translate-y-[80px] opacity-0'
          }`}
        >
          {children}
        </div>
      </section>
    </>
  );
}
