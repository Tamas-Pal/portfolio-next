import { Category } from '@/types/category';
import { Field } from '@/types/field';
import { Industry } from '@/types/industry';
import { Movie } from '@/types/movie';
import { Tech } from '@/types/tech';

export type PropField =
  | Industry['attributes']
  | Movie['attributes']
  | Category['attributes']
  | Field['attributes']
  | Tech['attributes'];
