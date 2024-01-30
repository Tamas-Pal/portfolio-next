import GenericResultsPage from './_components/GenericResultsPage';
import categoryQuery from '@/app/_utils/categoryQuery';
import { Category } from '@/types/category';
import { Field } from '@/types/field';
import { Tech } from '@/types/tech';

type Props = {
  params: { category: string; slug: string };
  searchParams: {};
};

// request all params for each category type
export async function generateStaticParams() {
  const categoryTypes = ['categories', 'fields', 'techs'];
  const paramsArray: {}[] = [];

  await Promise.all(
    categoryTypes.map(async (categoryType, i) => {
      const { data } = await fetch(
        `${process.env.CMS_APIURL}/${categoryType}`
      ).then((res) => res.json());

      if (data) {
        return data.map((item: Category | Field | Tech, j: number) => {
          let index = i * categoryTypes.length + j;
          paramsArray[index] = { [categoryType]: item.attributes.Slug };
        });
      }
    })
  );
  return paramsArray;
}

export default async function Category({ params }: Props) {
  // the requestable types with all their mutations: relation field name, field name, api route
  const allTypeFormats = {
    category: { relation: 'categories', title: 'Category', api: 'categories' },
    field: { relation: 'fields', title: 'Field', api: 'fields' },
    tech: { relation: 'techs', title: 'Tech', api: 'techs' },
  };

  const typeFormats: { relation: string; title: string; api: string } =
    allTypeFormats[params.category as keyof typeof allTypeFormats];

  const { images, category } = await categoryQuery(params, typeFormats);

  return (
    <GenericResultsPage
      images={images}
      category={category}
      typeFormats={typeFormats}
    />
  );
}
