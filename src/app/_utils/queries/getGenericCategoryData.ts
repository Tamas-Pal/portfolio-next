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
    , { cache: 'force-cache' }).then((res) => res.json());

  // put first linked image of each project in an array,
  // and populate it with project's title and slug
  const images: Media[] = [];
  projects.map((project: Project, i: number) => {
    images[i] = project.attributes.Images!.data[0];
    images[i]!.attributes.projectSlug = project.attributes.Slug;
    images[i]!.attributes.projectTitle = project.attributes.Title;
  });

  const { data } = await fetch(
    `${process.env.CMS_APIURL}/${typeFormats.api}/?populate=*&filters[Slug][$eq]=${params.slug}`, { cache: 'force-cache' }
  ).then((res) => res.json());

  let category = data[0].attributes[typeFormats.title];

  return { images, category };
}
