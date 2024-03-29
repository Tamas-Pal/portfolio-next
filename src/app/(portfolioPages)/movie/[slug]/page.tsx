import getGenericCategoryData from '@/app/_utils/queries/getGenericCategoryData';
import { Video } from '@/app/_components/generic/media/Video';
import { Movie } from '@/types/movie';
import { Media } from '@/types/Media';
import { PropField } from '@/types/PropField';
import gridStyles from '@/styles/gridStyles';
import MovieDetails from '@/app/_components/generic/content/MovieDetails';
import Thumbnails from '@/app/_components/generic/media/Thumbnails';

type Props = {
  params: { slug: string };
  searchParams: {};
};

export async function generateStaticParams() {
  const { data: movies } = await fetch(
    `${process.env.CMS_APIURL}/movies?pagination[page]=1&pagination[pageSize]=100`,
    {}
  ).then((res) => res.json());

  return movies.map((movie: Movie) => ({ slug: movie.attributes.Slug }));
}

export default async function Movie({ params }: Props) {
  const typeFormats = { relation: 'movie', title: 'Movie', api: 'movies' };

  const { images, category }: { images: Media[]; category: PropField } =
    await getGenericCategoryData(params, typeFormats);
  const movie = category as Movie['attributes'];
  const trailerEmbedUrl = movie.Links['Trailer']
    ? movie.Links['Trailer'].split('watch?v=').join('embed/')
    : undefined;

  return (
    <div id='content' className={gridStyles + ' lg:grid-cols-[1fr_2fr]'}>
      {/* Mobile Title */}
      <section
        id='mobile-title-wrap'
        className='lg:hidden flex flex-col justify-start mt-2 lg:mt-0 gap-y-4'
      >
        <h1 id='mobile-title' className={`justify-self-start self-start title`}>
          {movie.Movie}
        </h1>
      </section>
      {/* Video */}
      {trailerEmbedUrl && (
        <section id='trailer-wrapper'>
          <Video src={trailerEmbedUrl} />
        </section>
      )}
      {/* Images */}
      <section
        id='images-wrapper'
        className='grid grid-cols-2 2xl:grid-cols-3 gap-[16px] sm:gap-8 mt-2 lg:mt-0'
      >
        <Thumbnails images={images} />
      </section>
      {/* Data with Large Screen Title */}
      <section
        id='info-wrapper'
        className='lg:row-start-1 col-start-1 row-span-2 flex flex-col justify-start mt-2 lg:mt-0 gap-y-4'
      >
        <MovieDetails images={images} movie={movie} short={false} />
      </section>
    </div>
  );
}
