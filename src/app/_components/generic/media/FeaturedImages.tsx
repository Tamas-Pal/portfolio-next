import { Media } from '@/types/Media';
import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';

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


let groupSelectors = [
  'group/one',
  'group/two',
  'group/three',
  'group/four',
  'group/five',
];
let groupOpacities = [
  'group-hover/one:opacity-100',
  'group-hover/two:opacity-100',
  'group-hover/three:opacity-100',
  'group-hover/four:opacity-100',
  'group-hover/five:opacity-100',
];
let groupGrayscales = [
  'group-hover/one:grayscale-0',
  'group-hover/two:grayscale-0',
  'group-hover/three:grayscale-0',
  'group-hover/four:grayscale-0',
  'group-hover/five:grayscale-0',
];
let groupImageFX = [
  'group-hover/one:blur-md group-hover/one:grayscale',
  'group-hover/two:blur-md group-hover/two:grayscale',
  'group-hover/three:blur-md group-hover/three:grayscale',
  'group-hover/four:blur-md group-hover/four:grayscale',
  'group-hover/five:blur-md group-hover/five:grayscale',
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

  return (
    <div
      className={`relative p-8 overflow-hidden flex flex-col lg:flex-row gap-8 justify-center items-center min-h-[264px] border border-offwhite ${
        index % 2 === 1 ? 'bg-noisedarker' : 'bg-noise'
      }`}
    >
      {images.map((image, i: number) => {
        const { url, width, height, alternativeText } = image;

        const sizes =
          '(min-width: 1880px) 440px, (min-width: 1040px) calc(30.85vw - 134px), (min-width: 780px) calc(100vw - 320px), (min-width: 640px) calc(100vw - 224px), calc(100vw - 168px)';

        if (url) {
          return (
            <Link
              key={i}
              className={`relative basis-1/3 ${groupSelectors[i]} overflow-hidden `}
              href={`/project/${image.projectSlug}`}
            >
              <Image
                className={`relative transition-[filter,transform] duration-[900ms] blur-none ${groupImageFX[i]} pointer-events-none`}
                src={url}
                width={width}
                height={height}
                alt={alternativeText}
                sizes={sizes}
                priority={true}
              />
              <div
                className={`absolute top-0 left-0 w-full h-full transition-opacity opacity-0 ${groupOpacities[i]} pointer-events-none duration-[900ms] bg-blue mix-blend-screen`}
              ></div>
              <div
                className={`absolute top-0 left-0 w-full h-full transition-opacity opacity-0 ${groupOpacities[i]} pointer-events-none duration-[900ms]`}
              >
                <p className='inline-block m-2 px-2 bg-primarytext text-offwhite'>
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
