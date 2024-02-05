import qs from 'qs';
import { Project } from '@/types/project';
import { Media } from '@/types/Media';
import { PropField } from '@/types/PropField';

export default async function getGenericCategoryData(
  params: { category?: string; slug: string },
  typeFormats: { relation: string; title: string; api: string }
) {
  // request projects of category with linked images
  const imageQuery = qs.stringify(
    {
      populate: ['Images', typeFormats.relation],
      sort: ['Year:desc', 'Title'],
      filters: {
        [typeFormats.relation]: {
          Slug: {
            $eq: params.slug,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  const { data: projects } = await fetch(
    `${process.env.CMS_APIURL}/projects?${imageQuery}`
  ).then((res) => res.json());

  // put first linked image of each project in an array,
  // and populate it with project's title and slug
  const images: Media[] = [];
  projects.map((project: Project, i: number) => {
    images[i] = project.attributes.Images!.data[0];
    images[i]!.attributes.projectSlug = project.attributes.Slug;
    images[i]!.attributes.projectTitle = project.attributes.Title;
  });

  let category: PropField;
  // 1. if no projects:
  if (!projects[0] || !projects[0].attributes[typeFormats.relation].data) {
    // (Category name is fetched through relation field of project,
    // so if there are no projects, a new fetch is needed for the category.)
    const { data } = await fetch(
      `${process.env.CMS_APIURL}/${typeFormats.api}/?populate=*&filters[Slug][$eq]=${params.slug}`
    ).then((res) => res.json());

    category = data[0].attributes;

    // 2. if there is an array of projects >>
  } else if (Array.isArray(projects[0].attributes[typeFormats.relation].data)) {
    category = projects[0].attributes[typeFormats.relation].data[0].attributes;
    // 3. if there is only one project >>
  } else {
    category = projects[0].attributes[typeFormats.relation].data.attributes;
  }

  return { images, category };
}