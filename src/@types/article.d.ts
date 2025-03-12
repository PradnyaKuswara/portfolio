import { Tag } from "./tag";

declare namespace ArticleNamespace {
  type bodyType = {
    slugParam?: string;
    uuid?: string,
    title: string;
    thumbnail: string;
    content: string;
    meta_desc: string;
    meta_keyword: string;
    tags: string;
  }


  interface Article {
    id: bigint,
    uuid: string,
    title: string,
    thumbnail: string,
    slug: string,
    content: string,
    meta_desc: string,
    meta_keyword: string | null,
    is_active: boolean,
    createdAt: string,
    updatedAt: string,
    tags: Tag[]
  }
}

export = ArticleNamespace;
