// Interface automatically generated by schemas-to-ts

import { Media } from '@/types/Media';
import { Category } from '@/types/category';
import { Field } from '@/types/field';
import { Tech } from '@/types/tech';
import { Movie } from '@/types/movie';
import { Industry } from '@/types/industry';
import { Category_Plain } from '@/types/category';
import { Field_Plain } from '@/types/field';
import { Tech_Plain } from '@/types/tech';
import { Movie_Plain } from '@/types/movie';
import { Industry_Plain } from '@/types/industry';
import { AdminPanelRelationPropertyModification } from '@/types/AdminPanelRelationPropertyModification';

export interface Project {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    Title: string;
    Description?: string;
    Slug: string;
    Images?: { data: Media[] };
    EmbeddedMedia?: any;
    Year: number;
    categories?: { data: Category[] };
    fields?: { data: Field[] };
    techs?: { data: Tech[] };
    Link?: any;
    movie?: { data: Movie };
    industries?: { data: Industry[] };
  };
}
export interface Project_Plain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  Title: string;
  Description?: string;
  Slug: string;
  Images?: Media[];
  EmbeddedMedia?: any;
  Year: number;
  categories?: Category_Plain[];
  fields?: Field_Plain[];
  techs?: Tech_Plain[];
  Link?: any;
  movie?: Movie_Plain;
  industries?: Industry_Plain[];
}

export interface Project_NoRelations {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  Title: string;
  Description?: string;
  Slug: string;
  Images?: number[];
  EmbeddedMedia?: any;
  Year: number;
  categories?: number[];
  fields?: number[];
  techs?: number[];
  Link?: any;
  movie?: number;
  industries?: number[];
}

export interface Project_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  Title: string;
  Description?: string;
  Slug: string;
  Images?: AdminPanelRelationPropertyModification<Media>[];
  EmbeddedMedia?: any;
  Year: number;
  categories?: AdminPanelRelationPropertyModification<Category_Plain>;
  fields?: AdminPanelRelationPropertyModification<Field_Plain>;
  techs?: AdminPanelRelationPropertyModification<Tech_Plain>;
  Link?: any;
  movie?: AdminPanelRelationPropertyModification<Movie_Plain>;
  industries?: AdminPanelRelationPropertyModification<Industry_Plain>;
}
