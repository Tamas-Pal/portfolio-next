// Interface automatically generated by schemas-to-ts

export interface Landing {
    id: number;
    attributes: {
      createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    Title: string;
      Slug: string;
      Blocks: any;
    };
  }
  export interface Landing_Plain {
    id: number;
    createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  Title: string;
    Slug: string;
    Blocks: any;
  }
  
  export interface Landing_NoRelations {
    id: number;
    createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  Title: string;
    Slug: string;
    Blocks: any;
  }
  
  export interface Landing_AdminPanelLifeCycle {
    id: number;
    createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  Title: string;
    Slug: string;
    Blocks: any;
  }
  