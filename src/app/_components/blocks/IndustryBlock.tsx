import { Block } from '@/types/Block';
import Link from 'next/link';
import FeaturedImages from '../generic/media/FeaturedImages';

export const IndustryBlock = ({
  industryBlock,
  index,
}: {
  industryBlock: Block;
  index: number;
}) => {
  const industry = industryBlock.industry!.data.attributes;
  const projects = industryBlock.projects.data;
  
  return (
    <div
      className={`justify-self-center flex ${
        index % 2 === 1 ? 'flex-row' : 'flex-row-reverse'
      } gap-6 sm:gap-12 justify-center items-center max-w-screen-2xl`}
    >
      <Link
        className='shrink-0 self-stretch flex flex-col gap-2 items-center w-[38px]'
        href={`/industry/${industry.Slug}`}
      >
        <div className={`bg-dotssm w-[38px] grow`}></div>
        <div className={`border-offwhite border-t w-[38px]`}></div>
        
        {/* vertical title animating on block hover - invisible title to preserve space + sliding double title */}
        <div className='relative overflow-hidden w-[38px] '>
          <h1 className={`collapse title [writing-mode:vertical-lr]`}>
            {industry.Industry}
          </h1>
          <h1
            className={`ml-0.5 ${
              index % 2 === 0 ? 'bg-noise' : 'bg-noisedarker'
            } absolute top-[calc(-98%-1rem)] pointer-events-none group-hover:top-[0%] transition-all duration-[2100ms] [white-space:nowrap;] title [writing-mode:vertical-lr]`}
          >
            {`${industry.Industry} ${industry.Industry}`}
          </h1>
        </div>
        <div className={`border-offwhite border-t w-[38px]`}></div>
        <div className={`bg-dotssm w-[38px] grow rotate-180`}></div>
      </Link>
      <div className='flex flex-col gap-4 md:gap-6'>
        <div className='flex justify-between items-start gap-3'>
          <h2 className='uppercase tracking-widest font-semibold'>
            {industry.Subheading}
          </h2>
          <Link
            className='bg-arrow hover:bg-arrowblue transition duration-300 mt-1 w-8 h-4 shrink-0'
            href={`/industry/${industry.Slug}`}
          ></Link>
        </div>
        <FeaturedImages projects={projects} index={index} />
      </div>
    </div>
  );
};
