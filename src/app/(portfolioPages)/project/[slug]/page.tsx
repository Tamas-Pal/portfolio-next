import ProjectMeta from '@/app/(portfolioPages)/project/[slug]/_components/ProjectMeta';
import { Project } from '@/types/project';
import Images from '@/app/_components/generic/media/Images';
import gridStyles from '@/styles/gridStyles';
import Markdown from '@/app/_components/generic/content/Markdown';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import RouteLinks from '@/app/_components/generic/content/links/RouteLinks';
import { Tech } from '@/types/tech';

type Props = {
  params: { slug: string };
  searchParams: {};
};

export async function generateStaticParams() {
  const { data: projects } = await fetch(`${process.env.CMS_APIURL}/projects`, {
    //cache: 'no-store',
  }).then((res) => res.json());
  return projects.map((project: Project) => project.attributes.Slug);
}

export default async function Project({ params }: Props) {
  const { data } = await fetch(
    `${process.env.CMS_APIURL}/projects/?populate=*&filters[Slug][$eq]=${params.slug}`
    // { cache: 'no-store' }
  ).then((res) => res.json());

  const project = data[0].attributes;
  const images = data[0].attributes.Images.data;

  const description: MDXRemoteSerializeResult = await serialize(
    project.Description
  );

  return (
    <div id='content' className={gridStyles + ' lg:grid-cols-[1fr_2fr]'}>
      <h1
        id='mobile-title'
        className={`lg:hidden title text-offwhite font-semibold justify-self-start self-start`}
      >
        {project.Title}
      </h1>
      <section
        id='images-wrapper'
        className='grid grid-cols-[minmax(auto,512px)] 2xl:grid-cols-[minmax(auto,512px)_minmax(auto,512px)] gap-x-12 gap-y-[16px] sm:gap-y-8 lg:gap-y-12 mt-2 lg:mt-0'
      >
        <Images images={images} />
      </section>
      <section
        id='info-wrapper'
        className='lg:row-start-1 col-start-1 row-span-2 flex flex-col justify-start mt-2 lg:mt-0 gap-y-4'
      >
        <h1
          id='title'
          className={`hidden lg:block title  place-self-center justify-self-start self-start`}
        >
          {project.Title}
        </h1>
        <div
          id='description'
          className='font-semibold uppercase tracking-widest max-w-prose'
        >
          <Markdown mdxSource={description} />
        </div>
        {/* tech list at the end of description */}
        {project.techs?.data && (
          <div>
            {project.techs?.data.map((tech: Tech, i: number) => (
              <RouteLinks
                key={i}
                field={tech.attributes}
                length={project.techs?.data.length}
                fieldName={'Tech'}
                i={i}
              />
            ))}
          </div>
        )}
        <ProjectMeta project={project} />
      </section>
    </div>
  );
}
