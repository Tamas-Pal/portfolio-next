import Thumbnails from '@/app/_components/generic/media/Thumbnails';
import { Media } from '@/types/Media';
import { PropField } from '@/types/PropField';
import ProjectList from '../../../../_components/generic/content/ProjectList';
import gridStyles from '@/styles/gridStyles';

const qs = require('qs');

type Props = {
  images: Media[];
  category: PropField;
  typeFormats: { relation: string; title: string; api: string };
};

export default async function GenericResultsPage({
  images,
  category,
  typeFormats,
}: Props) {
  const categoryTitle = category[typeFormats.title as keyof PropField];

  return (
    <div id='content' className={gridStyles + ' lg:grid-cols-[1fr_2fr]'}>
      <section
        id='mobile-title-wrap'
        className='lg:hidden flex flex-col justify-start mt-2 lg:mt-0 gap-y-4'
      >
        <h1 id='mobile-title' className={`justify-self-start self-start title`}>
          {categoryTitle as string}
        </h1>
      </section>

      <section
        id='images-wrapper'
        className='min-w-full grid grid-cols-2 2xl:grid-cols-3 gap-[16px] sm:gap-8 mt-2 lg:mt-0'
      >
        <Thumbnails images={images} />
      </section>

      <section
        id='info-wrapper'
        className='lg:row-start-1 col-start-1 row-span-2 flex flex-col justify-start mt-2 lg:mt-0 gap-y-4'
      >
        <h1
          id='title'
          className={`hidden lg:block place-self-center justify-self-start self-start title`}
        >
          {categoryTitle as string}
        </h1>
        <div className='-mt-4'>
          <ProjectList images={images} />
        </div>
      </section>
    </div>
  );
}
