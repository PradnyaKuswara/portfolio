"use client";
import EditForm from "@/app/(protected)/(components)/Form/EditForm";
import React from "react";

export default function ArticlesEdit({ params }: { params: any }) {
  const slug = params.slug;

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

  const patchEndpoint = `${process.env.NEXT_PUBLIC_API_FETCH}/articles/${slug}`;

  return (
    <>
      <div className="card bg-base-300">
        <div className="card-body">
          <EditForm
            fields={fields}
            endPoint={patchEndpoint}
            identifier={slug}
            type="articles"
          />
        </div>
      </div>
    </>
  );
}
