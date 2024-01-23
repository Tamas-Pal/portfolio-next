'use client';

import { Media } from '@/types/Media';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const delays = [
  'delay-[0ms]',
  'delay-[300ms]',
  'delay-[600ms]',
  'delay-[900ms]',
  'delay-[1200ms]',
  'delay-[1500ms]',
  'delay-[1800ms]',
  'delay-[2100ms]',
  'delay-[2400ms]',
  'delay-[2700ms]',
  'delay-[3000ms]',
  'delay-[3300ms]',
  'delay-[3600ms]',
  'delay-[3900ms]',
  'delay-[4200ms]',
  'delay-[4500ms]',
  'delay-[4800ms]',
  'delay-[5100ms]',
  'delay-[5400ms]',
  'delay-[5700ms]',
  'delay-[6000ms]',
];

export default function Thumbnails(props: { images: Media[] }) {
  const { images } = props;

  const [loaded, setLoaded] = useState(false);

  return images.map((image: Media, i: number) => {
    const { url, width, height, projectSlug, alternativeText, projectTitle } =
      image.attributes;

    /* const buffer = await fetch(url).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const { base64 } = await getPlaiceholder(buffer, { size: 4 });*/

    const orientation = width > height ? 'landscape' : 'portrait';

    let sizes = calculateSizes(width, height);

    if (url) {
      return (
        <div
          key={i}
          className={`overflow-hidden flex justify-stretch items-stretch relative aspect-square`}
        >
          <Link
            key={i}
            className={`relative w-full aspect-square hover:bg-none group ${loaded ? 'translate-y-0 opacity-100' : '-translate-y-96 opacity-0' } ${
              i < delays.length ? delays[i] : ''
            } transition-[transform,opacity] duration-[1200ms]`}
            href={`/project/${projectSlug}`}
          >
            <Image
              className={`object-cover object-center origin-left group-hover:grayscale pointer-events-none`}
              key={i}
              src={url}
              fill={true}
              alt={alternativeText}
              //sizes={`calc(100vw-24px), (min-width: 1024px) calc((100vw-192px)/2), (min-width: 1536px) calc(((100vw-264px)*0.67-(128px/3)`}
              sizes={sizes}
              priority={i === 0 ? true : false}
              //  placeholder="blur"
              //  blurDataURL={base64}
              onLoadingComplete={() => {
                setLoaded(true);
              }}
            />
            <div
              className={`absolute top-0 left-0 w-full h-full bg-blue mix-blend-screen transition-opacity opacity-0 pointer-events-none group-hover:opacity-100`}
            ></div>
            <div
              className={`absolute top-0 left-0 w-full h-full transition-opacity opacity-0 pointer-events-none group-hover:opacity-100 `}
            >
              <p className='inline-block m-2 px-2 bg-primarytext text-offwhite font-regular'>
                {projectTitle}
              </p>
            </div>
          </Link>
        </div>
      );
    }
  });
}

const calculateSizes = (width: number, height: number) => {
  let sizes =
    '(min-width: 1540px) calc(22.19vw - 101px), (min-width: 1040px) calc(33.33vw - 136px), (min-width: 780px) calc(50vw - 100px), (min-width: 640px) calc(50vw - 52px), calc(50vw - 28px)';

  if (width > height) {
    const aspectRatio = width / height;

    if (aspectRatio <= 1.25) {
      sizes =
        '(min-width: 1540px) calc(28vw - 101px), (min-width: 1040px) calc(42vw - 136px), (min-width: 780px) calc(63vw - 100px), (min-width: 640px) calc(63vw - 52px), calc(63vw - 28px)';
      return sizes;
    }

    if (aspectRatio <= 1.34) {
      sizes =
        '(min-width: 1540px) calc(30vw - 101px), (min-width: 1040px) calc(45vw - 136px), (min-width: 780px) calc(67vw - 100px), (min-width: 640px) calc(67vw - 52px), calc(67vw - 28px)';
      return sizes;
    }

    if (aspectRatio <= 1.5) {
      sizes =
        '(min-width: 1540px) calc((33.3vw - 101px), (min-width: 1040px) calc(50vw - 136px), (min-width: 780px) calc(75vw - 100px), (min-width: 640px) calc(75vw - 52px), calc(75vw - 28px)';
      return sizes;
    }

    if (aspectRatio <= 1.67) {
      sizes =
        '(min-width: 1540px) calc(37vw - 101px), (min-width: 1040px) calc(56vw - 136px), (min-width: 780px) calc(84vw - 100px), (min-width: 640px) calc(84vw - 52px), calc(84vw - 28px)';
      return sizes;
    }

    if (aspectRatio <= 1.78) {
      sizes =
        '(min-width: 1540px) calc(40vw - 101px), (min-width: 1040px) calc(60vw - 136px), (min-width: 780px) calc(89vw - 100px), (min-width: 640px) calc(89vw - 52px), calc(89vw - 28px)';
      return sizes;
    }

    if (aspectRatio <= 2) {
      sizes =
        '(min-width: 1540px) calc(45vw - 101px), (min-width: 1040px) calc(67vw - 136px), (min-width: 780px) calc(100vw - 100px), (min-width: 640px) calc(100vw - 52px), calc(100vw - 28px)';
      return sizes;
    }

    if (aspectRatio <= 2.5) {
      sizes =
        '(min-width: 1540px) calc(55.48vw - 101px), (min-width: 1040px) calc(83.33vw - 136px), (min-width: 780px) calc(125vw - 100px), (min-width: 640px) calc(125vw - 52px), calc(125vw - 28px)';
      return sizes;
    }
    if (aspectRatio <= 3) {
      sizes =
        '(min-width: 1540px) calc(66.57vw - 101px), (min-width: 1040px) calc(100vw - 136px), (min-width: 780px) calc(150vw - 100px), (min-width: 640px) calc(150vw - 52px), calc(150vw - 28px)';
      return sizes;
    }
  }
  return sizes;
};
