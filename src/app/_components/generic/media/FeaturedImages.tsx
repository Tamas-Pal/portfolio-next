'use client';

import { Media } from '@/types/Media';
import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const delays = [
  'delay-[0ms,300ms,300ms]',
  'delay-[0ms,0ms,0ms]',
  'delay-[0ms,600ms,600ms]',
  'delay-[0ms,900ms,900ms]',
  'delay-[0ms,1200ms,1200ms]',
  'delay-[0ms,1500ms,1500ms]',
  'delay-[0ms,1800ms,1800ms]',
  'delay-[0ms,2100ms,2100ms]',
  'delay-[0ms,2400ms,2400ms]',
  'delay-[0ms,2700ms,2700ms]',
  'delay-[0ms,3000ms,3000ms]',
  'delay-[0ms,3300ms,3300ms]',
  'delay-[0ms,3600ms,3600ms]',
  'delay-[0ms,3900ms,3900ms]',
  'delay-[0ms,4200ms,4200ms]',
  'delay-[0ms,4500ms,4500ms]',
  'delay-[0ms,4800ms,4800ms]',
  'delay-[0ms,5100ms,5100ms]',
  'delay-[0ms,5400ms,5400ms]',
  'delay-[0ms,5700ms,5700ms]',
  'delay-[0ms,6000ms,6000ms]',
];
/*
let groupNames = ['one', 'two', 'three', 'four', 'five']
let groupSelectors = []
let groupOpacities = []
let groupGrayscales = []

for (let i = 0; i < 5; i++) {
  groupSelectors.push(`group/${groupNames[i]}`)
  groupOpacities.push(`group/${groupNames[i]}-hover:opacity-100`)
  groupGrayscales.push(`group/${groupNames[i]}-hover:grayscale-0`)
}
console.log(groupSelectors, groupOpacities, groupGrayscales);
*/

let groupSelectors = [ 'group/one', 'group/two', 'group/three', 'group/four', 'group/five' ]
let groupOpacities = [
  'group-hover/one:opacity-100',
  'group-hover/two:opacity-100',
  'group-hover/three:opacity-100',
  'group-hover/four:opacity-100',
  'group-hover/five:opacity-100'
];
let groupGrayscales = [
  'group-hover/one:grayscale-0',
  'group-hover/two:grayscale-0',
  'group-hover/three:grayscale-0',
  'group-hover/four:grayscale-0',
  'group-hover/five:grayscale-0'
];

export default function FeaturedImages({
  projects,
  index,
}: {
  projects: Project[];
  index: number;
}) {
  const images: Media['attributes'][] = projects.map(
    (project) => project.attributes.Images!.data[0].attributes
  );

  projects.map((project, i) => {
    images[i].projectTitle = project.attributes.Title;
    images[i].projectSlug = project.attributes.Slug;
  });

  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative p-8 overflow-hidden flex flex-col md:flex-row gap-8 justify-center items-center min-h-[264px] border border-offwhite ${
        index % 2 === 0 ? 'bg-noisedarker' : 'bg-noise'
      }`} 
    >

      {images.map((image, i: number) => {
        const { url, width, height, alternativeText } = image;

        const firstImage =
          i === 0 && width >= height
            ? {
                span: '2xl:col-span-2',
                sizes:
                  '(min-width: 2860px) 1570px, (min-width: 1040px) calc(62.06vw - 192px), (min-width: 780px) calc(100vw - 168px), (min-width: 640px) calc(100vw - 72px), calc(100vw - 40px)',
              }
            : {
                span: '',
                sizes:
                  '(min-width: 1540px) calc(33.01vw - 139px), (min-width: 1040px) calc(66.67vw - 240px), (min-width: 780px) calc(99.58vw - 165px), (min-width: 640px) calc(100vw - 72px), calc(100vw - 40px)',
              };

        if (url) {
          return (
              <Link
                key={i}
                className={`relative hover:shrink-0 h-7/12 md:w-7/12 overflow-hidden ${groupSelectors[i]} transition-[flex-shrink,transform,opacity] duration-[2100ms,1200ms,1200ms] ${
                  delays[i]
                } ${
                  loaded
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-96 opacity-0'
                } `}
                href={`/project/${image.projectSlug}`}
              >
                <Image
                  className={`relative transition-[filter,border-radius] duration-[2100ms,300ms] grayscale-[50%] ${groupGrayscales[i]} pointer-events-none`}
                  src={url}
                  width={width}
                  height={height}
                  alt={alternativeText}
                  sizes={firstImage.sizes}
                  priority={true}
                  onLoadingComplete={() => {
                    setLoaded(true);
                  }}
                />

                <div
                  className={`absolute top-0 left-0 w-full h-full transition-opacity opacity-0 pointer-events-none ${groupOpacities[i]} delay-[900ms]`}
                >
                  <p className=' inline-block m-2 px-2 bg-primarytext text-offwhite'>
                    {image.projectTitle}
                  </p>
                </div>
              </Link>
          );
        }
      })}
    </div>
  );
}
