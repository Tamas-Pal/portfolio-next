import GenericResultsPage from './_components/GenericResultsPage';
import getGenericCategoryData from '@/app/_utils/queries/getGenericCategoryData';
import { Category } from '@/types/category';
import { Field } from '@/types/field';
import { Tech } from '@/types/tech';

type Props = {
  params: { category: string; slug: string };
  searchParams: {};
};

// the requestable types with all their mutations: field name as relation, field name, api route
const allTypeFormats = {
  category: { relation: 'categories', title: 'Category', api: 'categories' },
  field: { relation: 'fields', title: 'Field', api: 'fields' },
  tech: { relation: 'techs', title: 'Tech', api: 'techs' },
};

// request all params for each category type
export async function generateStaticParams() {
  const paramsArray: {}[] = [];

  await Promise.all(
    Object.entries(allTypeFormats).map(async (typeFormat) => {
      const { data } = await fetch(
        `${process.env.CMS_APIURL}/${typeFormat[1].api}`
      ).then((res) => res.json());

      if (data) {
        return data.map((item: Category | Field | Tech) => {
          paramsArray.push({
            category: typeFormat[0],
            slug: item.attributes.Slug,
          });
        });
      }
    })
  );

  return paramsArray;
}

export default async function Category({ params }: Props) {
  // pull out relevant formats
  const typeFormats: { relation: string; title: string; api: string } =
    allTypeFormats[params.category as keyof typeof allTypeFormats];

  const { images, category } = await getGenericCategoryData(
    params,
    typeFormats
  );

  return (
    <GenericResultsPage
      images={images}
      category={category}
      typeFormats={typeFormats}
    />
  );
}
