'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Industry } from '@/types/industry';

export default function Nav(props: { industries: Industry[] }) {
  const { industries } = props;
  const [isOpen, setIsOpen] = useState(false);
  /*const pathname = usePathname();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
*/
  const delayStyles = [
    `delay-[0ms]`,
    `delay-[75ms]`,
    `delay-[150ms]`,
    `delay-[225ms]`,
    `delay-[300ms]`,
    `delay-[375ms]`,
    `delay-[450ms]`,
    `delay-[525ms]`,
    `delay-[600ms]`,
    `delay-[675ms]`,
    `delay-[750ms]`,
    `delay-[825ms]`,
    `delay-[900ms]`,
    `delay-[975ms]`,
    `delay-[1050ms]`,
    `delay-[1125ms]`,
    `delay-[1200ms]`,
    `delay-[1275ms]`,
    `delay-[1350ms]`,
    `delay-[1425ms]`,
  ];

  const liAnimStyles = isOpen
    ? 'translate-y-0 opacity-100'
    : 'translate-y-2 opacity-0';

  const navHeights = [
    'h-[24px]',
    'h-[61px]',
    'h-[98px]',
    'h-[135px]',
    'h-[172px]',
    'h-[209px]',
    'h-[246px]',
    'h-[283px]',
  ];
  const navAnimStyles = isOpen
    ? `
    ${navHeights[industries.length - 1]} 
      origin-top scale-y-100  transition-all duration-[975ms]`
    : `h-[4px] origin-top scale-y-0 transition-all duration-[975ms] ${
        delayStyles[industries.length]
      }`;

  return (
    <nav
      id='nav'
      className={`mx-4 sm:mx-8 md:mx-20 lg:mx-32 flex justify-between mt-1 w-[min(100%,1536px)]`}
    >
      <div id='projects-wrapper'>
        <h3
          className='header-link'
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          Projects
        </h3>
        <div
          className={`top-[132px] md:top-[164px] left-0 w-[223.64px] z-50 px-8 pt-1 pb-0 flex flex-col justify-left gap-1.5 ${navAnimStyles}`}
        >
          {industries.map((industry: Industry, i: number) => (
            <Fragment key={`fragment-${industry.id}`}>
              <div
                key={`wrapper-${industry.id}`}
                id={`wrapper-${industry.id}`}
                className={`transition-[transform,opacity] ${liAnimStyles} ${
                  isOpen
                    ? `${delayStyles[i + 10]}`
                    : `${delayStyles[industries.length - i - 1]}`
                }`}
              >
                <Link
                  className={`header-link text-offwhite`}
                  href={`/industry/${industry.attributes.Slug}`}
                >
                  {`${industry.attributes.Industry}`}
                </Link>
              </div>
              {i < industries.length - 1 && (
                <div
                  key={`wrapper-hyphen-${industry.id}`}
                  id={`wrapper-hyphen-${industry.id}`}
                  className={`transition ${liAnimStyles} ${
                    isOpen
                      ? `${delayStyles[i + 10]}`
                      : `${delayStyles[industries.length - i - 1]}`
                  }`}
                >
                  <div className={`bg-offwhite h-px w-6`}></div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <Link className='header-link' href='/about'>
        <h3>About</h3>
      </Link>
    </nav>
  );
}
