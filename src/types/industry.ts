// Interface automatically generated by schemas-to-ts

import { Project } from '@/types/project';
import { Project_Plain } from '@/types/project';
import { AdminPanelRelationPropertyModification } from '@/types/AdminPanelRelationPropertyModification';

export interface Industry {
  id: number;
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    Industry: string;
    projects?: { data: Project[] };
    Slug: string;
    Subheading: string;
  };
}
export interface Industry_Plain {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  Industry: string;
  projects?: Project_Plain[];
  Slug: string;
  Subheading: string;
}

export interface Industry_NoRelations {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  Industry: string;
  projects?: number[];
  Slug: string;
  Subheading: string;
}

export interface Industry_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  Industry: string;
  projects?: AdminPanelRelationPropertyModification<Project_Plain>;
  Slug: string;
  Subheading: string;
}
