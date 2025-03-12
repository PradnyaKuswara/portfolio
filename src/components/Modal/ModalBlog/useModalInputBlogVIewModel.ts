import { useForm } from "react-hook-form";
import { BlogSchema, DefaultBlog } from "../../../shared/schemas/BlogSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import ArticleNamespace from "../../../@types/article";
import { storeArticle, updateArticle } from "../../../rest/BlogRest";

const useModalInputBlogVIewModel = () => {
  const schema = useMemo(() => {
    return BlogSchema();
  }, [])

  const form = useForm(
    {
      mode: "all",
      resolver: yupResolver(schema),
      defaultValues: DefaultBlog
    }
  );

  const onSubmit = async ({ payload }: { payload: ArticleNamespace.bodyType }) => {
    try {
      const response = await storeArticle(payload);
      return response;
    } catch (error) {
      return error;
    }
  }

  const onEdit = async ({ payload }: { payload: ArticleNamespace.bodyType }) => {
    try {
      const response = await updateArticle(payload);
      return response;
    } catch (error) {
      return error;
    }
  }

  return {
    form
    , onSubmit
    , onEdit
  }
}

export default useModalInputBlogVIewModel
