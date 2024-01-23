import ExternalLinks from '@/app/_components/generic/content/links/ExternalLinks';
import { Project } from '@/types/project';

export default function ProjectLinks(props: {
  project: Project['attributes'];
}) {
  const { project } = props;
  // use movie links if project contains movies as industry
  const isMovie = project.industries?.data
    .map((industry) => {
      if (industry.id === 3) {
        return true;
      }
      return false;
    })
    .includes(true);
  const links = isMovie ? project.movie?.data.attributes.Links : project.Link;

  return (
    links && (
      <>
        <h2 className='uppercase font-semibold tracking-widest'>Links</h2>
        <ExternalLinks links={links} />
      </>
    )
  );
}
