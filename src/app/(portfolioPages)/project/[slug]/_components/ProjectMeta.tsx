import RouteLinks from '@/app/_components/generic/content/links/RouteLinks';
import ProjectLinks from './ProjectLinks';
import MovieDetails from '@/app/_components/generic/content/MovieDetails';
import { Project } from '@/types/project';

export default function ProjectMeta(props: { project: Project['attributes'] }) {
  const { project } = props;
  const categories = project.categories!.data;
  const fields = project.fields!.data;
  const industries = project.industries!.data;

  const isMovie = industries
    .map((industry) => {
      if (industry.id === 3) {
        return true;
      }
      return false;
    })
    .includes(true);

  return (
    <section className='col-start-1 font-regular mt-4'>
      <h2 className='uppercase font-semibold tracking-widest'>Meta</h2>
      <p className='mt-0 pl-4 inline-block'>
        <span className='mr-2'>{'Year: '}</span>
        <span className='font-semibold'>{project.Year}</span>
        <br />
        <span className='mr-2'>{'Categories: '}</span>
        {categories.map((category, i) => (
          <RouteLinks
            key={i}
            field={category.attributes}
            length={categories.length}
            fieldName={'Category'}
            i={i}
          />
        ))}
        <br />
        <span className='mr-2'>{'Fields: '}</span>
        {fields.map((field, i) => (
          <RouteLinks
            key={i}
            field={field.attributes}
            length={fields.length}
            fieldName={'Field'}
            i={i}
          />
        ))}
        <br />
        <span className='mr-2'>{'Industries: '}</span>
        {industries.map((industry, i) => (
          <RouteLinks
            key={i}
            field={industry.attributes}
            length={industries.length}
            fieldName={'Industry'}
            i={i}
          />
        ))}
      </p>
      <div className='mt-4'>
        {isMovie ? (
          <MovieDetails movie={project.movie!.data.attributes} short={true} />
        ) : (
          <ProjectLinks project={project} />
        )}
      </div>
    </section>
  );
}
