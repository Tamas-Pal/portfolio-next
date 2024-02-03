import getGenericCategoryData from '@/app/_utils/queries/getGenericCategoryData';
import gridStyles from '@/styles/gridStyles';
import { Industry } from '@/types/industry';
import { Movie } from '@/types/movie';
import { MovieList } from './MovieList';
import Thumbnails from '@/app/_components/generic/media/Thumbnails';
import ProjectList from '@/app/_components/generic/content/ProjectList';

type Props = {
  params: { slug: string };
  searchParams: {};
};

export async function generateStaticParams() {
  const { data: industries } = await fetch(
    `${process.env.CMS_APIURL}/industries`
  ).then((res) => res.json());

  return industries.map((industry: Industry) => ({
    slug: industry.attributes.Slug,
  }));
}

export default async function Industry({ params }: Props) {
  const typeFormats = {
    relation: 'industries',
    title: 'Industry',
    api: 'industries',
  };

  let moviesData: Movie[] = [];

  // separate query for movie list if relevant
  if (params.slug === 'the-movies') {
    const { data } = await fetch(
      `${process.env.CMS_APIURL}/movies?populate[0]=projects&sort[0]=ProductionYear:desc`
    ).then((res) => res.json());
    moviesData = data;
  }

  const { images, category } = await getGenericCategoryData(params, typeFormats);
  const industry = category as Industry['attributes'];

  return (
    <div id='content' className={gridStyles + ' lg:grid-cols-[1fr_2fr]'}>
      {/* Title + subheading section only on mobile */}
      <section
        id='mobile-title-wrap'
        className='lg:hidden flex flex-col justify-start mt-2 lg:mt-0 gap-y-4'
      >
        <h1 id='mobile-title' className={`justify-self-start self-start title`}>
          {industry.Industry}
        </h1>
        <p className='font-semibold tracking-widest uppercase max-w-prose'>
          {`${industry.Subheading}`}
        </p>
      </section>

      {/* Project Thumbnails */}
      <section
        id='images-wrapper'
        className='grid grid-cols-2 2xl:grid-cols-3 gap-[16px] sm:gap-8 mt-2 lg:mt-0'
      >
        <Thumbnails images={images} />
      </section>

      {/* Project title + subheading (only on larger and above) and details section */}
      <section
        id='info-wrapper'
        className='lg:row-start-1 col-start-1 row-span-2 flex flex-col justify-start mt-2 lg:mt-0 gap-y-4'
      >
        <h1
          id='title'
          className={`hidden lg:block place-self-center justify-self-start self-start title`}
        >
          {industry.Industry}
        </h1>
        <p className='hidden lg:block tracking-widest uppercase font-semibold max-w-lg'>
          {`${industry.Subheading}`}
        </p>

        {/* movies need nested list as opposed to simple projects */}
        {params.slug === 'the-movies' ? (
          <MovieList moviesData={moviesData} />
        ) : (
          <ProjectList images={images} />
        )}
      </section>
    </div>
  );
}
