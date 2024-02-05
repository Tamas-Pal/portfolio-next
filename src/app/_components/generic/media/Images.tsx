'use client';

import { Media } from '@/types/Media';
import Image from 'next/image';
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

const modalDelays = ['delay-[450ms] md:delay-0', 'delay-[750ms] md:delay-300'];

export default function Images({
  images,
  isProfile = false,
}: {
  images: Media[];
  isProfile?: boolean;
}) {
  const [clicked, setClicked] = useState({
    url: images[0].attributes.url,
    width: images[0].attributes.width,
    height: images[0].attributes.height,
    alternativeText: images[0].attributes.alternativeText,
    transformStyles: ['opacity-0', '-translate-x-full'],
    modalDelayStyles: [modalDelays[0], modalDelays[1]],
  });

  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {images.map((image: Media, i: number) => {
        const { url, width, height, alternativeText } = image.attributes;

        let imageProps: { span: string; sizes: string };
        if (!isProfile) {
          // first image spans two columns in portfolio pages
          imageProps =
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
        } else {
          // this config is for profile block
          imageProps = {
            span: '',
            sizes:
              '(min-width: 1280px) 320px, (min-width: 1040px) calc(41.82vw - 207px), (min-width: 640px) 320px, 240px',
          };
        }

        if (url) {
          return (
            <div
              key={i}
              className={`relative ${imageProps.span} flex items-start overflow-hidden`}
            >
              <div
                className={`transition duration-[1200ms] cursor-pointer group ${
                  loaded
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-96'
                } ${i < delays.length ? delays[i] : ''}`}
                onClick={() => {
                  isProfile &&
                    setClicked({
                      url,
                      width,
                      height,
                      alternativeText,
                      transformStyles: ['opacity-100', 'translate-x-0'],
                      modalDelayStyles: [modalDelays[0], modalDelays[1]],
                    });
                }}
              >
                <Image
                  className={`object-contain object-left relative transition-[transform,filter] duration-[2100ms,900ms] ${
                    isProfile &&
                    'grayscale-0 group-hover:grayscale blur-none group-hover:blur-md'
                  } pointer-events-none`}
                  src={url}
                  width={width}
                  height={height}
                  alt={alternativeText}
                  sizes={imageProps.sizes}
                  priority={i === 0 ? true : false}
                  onLoadingComplete={() => {
                    setLoaded(true);
                  }}
                />
                {isProfile && (
                  <>
                    <div
                      className={`absolute top-0 left-0 cursor-pointer w-full h-full bg-blue mix-blend-screen opacity-0 group-hover:opacity-100 transition-[opacity] duration-[900ms] pointer-events-none `}
                    ></div>
                    <div
                      className={`absolute top-0 left-0 cursor-pointer w-full h-full opacity-0 group-hover:opacity-100 transition-[opacity] duration-[900ms] pointer-events-none `}
                    >
                      <p className='absolute top-0 m-2 ml-2 px-2 bg-primarytext text-offwhite'>
                        {alternativeText}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        }
      })}
      {isProfile && (
        <div
          className={`fixed bg-offwhite top-0 left-0 w-full h-full z-[110] cursor-pointer origin-left duration-300 transition-[opacity,transform] ${clicked.transformStyles[1]} ${clicked.modalDelayStyles[0]}`}
          onClick={() => {
            setClicked((prev) => {
              return {
                ...prev,
                transformStyles: ['opacity-0', '-translate-x-full'],
                modalDelayStyles: [modalDelays[1], modalDelays[0]],
              };
            });
          }}
        >
          <div
            className={`w-[calc(100%-8px)] h-[calc(100%-8px)] bg-offblack m-1 rounded-2xl flex justify-center lg:p-16 simpleshadow`}
          >
            <Image
              className={`object-contain object-center transition-opacity duration-300 ${clicked.transformStyles[0]} ${clicked.modalDelayStyles[1]}`}
              src={clicked.url}
              width={clicked.width}
              height={clicked.height}
              alt={clicked.alternativeText}
              sizes={`(min-width: 1024px) calc(100vw-136px), calc(100vw-8px)`}
            />
          </div>
        </div>
      )}
    </>
  );
}
