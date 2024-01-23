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

//throw new Error("Error")


export default function Images(props: {
  images: Media[];
  clickable?: boolean;
}) {
  const { images } = props;
  const clickable = props.clickable === undefined ? true : props.clickable;

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
            <div
              key={i}
              className={`relative ${firstImage.span} flex items-start overflow-hidden`} //  bg-dotssm // hover:translate-x-2 hover:translate-y-[-8px] transition-transform duration-1000
            >
              <div
                // className={`transition-transform duration-[2100ms] cursor-pointer group ${
                //   loaded ? 'translate-y-0' : 'translate-y-[-101%]'
                // } ${i < delays.length ? delays[i] : ''}`}
                className={`transition duration-[1200ms] cursor-pointer group ${
                  loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-96'
                } ${i < delays.length ? delays[i] : ''}`}
                onClick={() => {
                  clickable &&
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
                  className={`object-contain object-left relative transition-[transform,filter,border-radius] duration-[2100ms,300ms,300ms] grayscale-0 rounded-none group-hover:grayscale pointer-events-none`} // group-hover:rounded-md
                  src={url}
                  width={width}
                  height={height}
                  alt={alternativeText}
                  sizes={firstImage.sizes}
                  priority={i === 0 ? true : false}
                  onLoadingComplete={() => {
                    setLoaded(true);
                  }}
                />
                {clickable && (
                  <>
                    <div
                      className={`absolute top-0 left-0 cursor-pointer w-full h-full bg-blue mix-blend-screen opacity-0 group-hover:opacity-100 transition-[opacity,border-radius] duration-[300ms] pointer-events-none `} //  group-hover:rounded-md
                      //  className={`absolute top-0 left-0 cursor-pointer w-full h-full bg-blue transition-opacity delay-300 pointer-events-none aspect-[${width}/${height}] ${hoverStyles}`}
                    ></div>
                    <div
                      className={`absolute top-0 left-0 cursor-pointer w-full h-full opacity-0 group-hover:opacity-100 transition-[opacity,border-radius] duration-[300ms] pointer-events-none `} // bg-dotssmblue group-hover:rounded-md
                      //  className={`absolute top-0 left-0 cursor-pointer w-full h-full bg-blue transition-opacity delay-300 pointer-events-none aspect-[${width}/${height}] ${hoverStyles}`}
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
      {clickable && (
        <div
          className={`fixed bg-offwhite top-0 left-0 w-full h-full z-50 cursor-pointer origin-left duration-300 transition-[opacity,transform] ${clicked.transformStyles[1]} ${clicked.modalDelayStyles[0]}`}
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
