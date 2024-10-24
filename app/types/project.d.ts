interface IProjectCategory {
  id: bigint;
  uuid: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

interface IProject {
  id: bigint;
  uuid: string;
  project_category_id: bigint;
  title: string;
  image: string;
  slug: string;
  description: string;
  stack: string;
  link_github: string | null;
  link_project: string | null;
  link_documentation: string | null;
  is_active: boolean;
  meta_desc: string;
  meta_keyword: string | null;
  createdAt: Date;
  updatedAt: Date;

  ProjectCategory: ProjectCategory;
};