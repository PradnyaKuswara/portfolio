import ProjectCategoryNamespace from "./project-category";

declare namespace ProjectNamespace {
  type bodyType = {
    slugParam?: string;
    uuid?: string;
    project_category_id: string;
    title: string;
    image: string | null; // Use File type for file uploads
    description: string;
    stack: string;
    link_github?: string;
    link_project?: string;
    link_documentation?: string;
    meta_desc: string;
    meta_keyword?: string;
  };

  interface Project {
    id: bigint;
    uuid: string;
    project_category_id: bigint;
    title: string;
    image: string;
    slug: string;
    description: string;
    stack: string,
    link_github: string | null,
    link_project: string | null,
    link_documentation: string | null,
    is_active: boolean,
    meta_desc: string,
    meta_keyword: string | null,
    createdAt: string,
    updatedAt: string,

    ProjectCategory: ProjectCategoryNamespace.ProjectCategory;
  }
}

export = ProjectNamespace;