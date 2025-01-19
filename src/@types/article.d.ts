import { Tag } from "./tag";

export type Article = {
  id: bigint;
  uuid: string;
  title: string;
  thumbnail: string;
  slug: string;
  content: string;
  meta_desc: string;
  meta_keyword: string | null;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
};