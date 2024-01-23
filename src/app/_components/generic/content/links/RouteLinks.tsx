import { Category } from '@/types/category';
import { Field } from '@/types/field';
import { Industry } from '@/types/industry';
import { Movie } from '@/types/movie';
import { Tech } from '@/types/tech';
import Link from 'next/link';
import { Fragment } from 'react';

type PropField =
  | Industry['attributes']
  | Movie['attributes']
  | Category['attributes']
  | Field['attributes']
  | Tech['attributes'];

export default function RouteLinks(props: {
  field: PropField;
  length: number;
  fieldName: string;
  i: number;
}) {
  const { field, length, fieldName, i } = props;
  const divider = length > i + 1 ? ' / ' : '';
  return (
    <Fragment key={i}>
      <Link
        className='main-link'
        key={i}
        href={`/${fieldName.toLowerCase()}/${field.Slug}`}
      >
        {field[fieldName as keyof PropField] as string}
      </Link>
      {divider}
    </Fragment>
  );
}
