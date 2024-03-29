// Interface automatically generated by schemas-to-ts

import { Project } from '@/types/project';
import { Project_Plain } from '@/types/project';
import { AdminPanelRelationPropertyModification } from '@/types/AdminPanelRelationPropertyModification';

export interface Category {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    Category: string;
    projects?: { data: Project[] };
    Slug: string;
  };
}
export interface Category_Plain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  Category: string;
  projects?: Project_Plain[];
  Slug: string;
}

export interface Category_NoRelations {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  Category: string;
  projects?: number[];
  Slug: string;
}

export interface Category_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  Category: string;
  projects?: AdminPanelRelationPropertyModification<Project_Plain>;
  Slug: string;
}
