declare namespace ProjectCategoryNamespace {
  type bodyType = {
    uuid?: string;
    name: string;
  };

  interface ProjectCategory {
    id: bigint;
    uuid: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
}

export = ProjectCategoryNamespace;