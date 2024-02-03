import { Movie } from '@/types/movie';
import ExternalLinks from './links/ExternalLinks';
import RouteLinks from './links/RouteLinks';
import { Media } from '@/types/Media';
import Markdown from './Markdown';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import ProjectList from './ProjectList';

export default async function MovieDetails(props: {
  images?: Media[];
  movie: Movie['attributes'];
  short: boolean;
}) {
  const { movie, short } = props;

  const description: MDXRemoteSerializeResult = await serialize(
    movie.Description
  );

  return (
    <>
      {/* Show link to movie if called in the description of project */}
      <div className=''>
        {short ? (
          <>
            <span className='mr-2 pl-4 inline-block'>{'Movie: '}</span>
            <RouteLinks
              key={0}
              field={movie}
              length={1}
              fieldName={'Movie'}
              i={0}
            />
          </>
        ) : (
          // Show plain text title if dedicated movie page
          <h1
            className={`hidden lg:block place-self-center justify-self-start self-start title`}
          >
            {movie.Movie}
          </h1>
        )}
        {/* Show extra details if dedicated movie page */}
        {!short && (
          <>
            <span className='inline-block lg:mt-4 uppercase tracking-wider font-semibold'>
              <Markdown mdxSource={description} />
            </span>
            <br />
            <span className='mr-2 mt-8 inline-block font-regular'>
              {'Production Year: '}
            </span>
            <span className='font-semibold'>{movie.ProductionYear}</span>
          </>
        )}
        <br />
        <span className={`mr-2 ${short && 'pl-4'} inline-block font-regular`}>
          {'Links: '}
        </span>
        <ExternalLinks links={movie.Links} />
      </div>
      {/* Show linked projects if dedicated movie page */}
      {!short && (
        <div className='-mt-4'>
          <ProjectList images={props.images!} />
        </div>
      )}
    </>
  );
}
