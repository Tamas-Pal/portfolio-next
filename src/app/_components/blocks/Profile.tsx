import { Media } from '@/types/Media';
import Images from '../generic/media/Images';
import Markdown from '../generic/content/Markdown';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

// called by ProfileBlock and About
export default function Profile({
  title,
  intro,
  bg,
  image,
}: {
  title: string;
  intro: MDXRemoteSerializeResult;
  bg: MDXRemoteSerializeResult;
  image: Media;
}) {
  return (
    <div
      id='content'
      className={`w-full justify-self-center max-w-screen-2xl grid grid-cols-1 lg:grid-cols-[minmax(auto,768px)_auto] 2xl:grid-cols-[minmax(auto,435px)_1fr_minmax(256px,auto)] grid-flow-rows gap-x-[96px] gap-y-[32px] lg:gap-y-[96px]`}
    >
      <div className='flex flex-col gap-12 rounded-br-2xl md:pr-12 lg:pr-24 xl:pr-24 md:pb-8 md:pt-8 lg:pt-0 lg:max-w-[435px] md:border-e'>
        <h1 className={`title hidden lg:block`}>
          <span className=''>{title}</span>
        </h1>
        <div className='font-regular pl-8 pr-4 max-w-prose'>
          <Markdown mdxSource={intro} />
        </div>
        <div className='font-semibold max-w-prose'>
          <Markdown mdxSource={bg} />
        </div>
      </div>

      <div className='hidden 2xl:block 2xl:border-t h-0 self-center'></div>

      <div className='row-start-1 lg:row-auto flex flex-col gap-12 lg:justify-self-end 2xl:self-center'>
        <h1 className={`title lg:hidden`}>{title}</h1>
        <div className='max-w-[240px] sm:max-w-[320px] overflow-hidden justify-self-center self-center lg:justify-self-end'>
          <Images images={[image]} isProfile={true} />
        </div>
      </div>
    </div>
  );
}
