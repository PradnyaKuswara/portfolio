"use client";

import CreateForm from "@/app/(protected)/(components)/Form/CreateFrom";
import React from "react";

export default function ArticleCreate() {
  const fields = [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter title",
    },
    {
      name: "image",
      label: "Thumbnail",
      type: "file",
      placeholder: "Enter project image",
    },
    {
      name: "tags",
      label: "Tag",
      type: "text",
      placeholder: "Enter tag name",
    },
    {
      name: "content",
      label: "Content",
      type: "editor",
      placeholder: "Enter Content",
    },
    {
      name: "meta_desc",
      label: "Meta Description",
      type: "textarea",
      placeholder: "Enter Meta Description",
    },
    {
      name: "meta_keyword",
      label: "Meta Keyword",
      type: "textarea",
      placeholder: "Enter Meta Keyword",
    },
  ];

  const storeEndpoint = `${process.env.NEXT_PUBLIC_API_FETCH}/articles`;

  return (
    <>
      <div className="card bg-base-300">
        <div className="card-body">
          <CreateForm fields={fields} endPoint={storeEndpoint}></CreateForm>
        </div>
      </div>
    </>
  );
}
