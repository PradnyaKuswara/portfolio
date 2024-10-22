import EditForm from "@/app/(protected)/(components)/Form/EditForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Project Categories Edit",
};

export default function ProjectCategoriesEdit({ params }: { params: any }) {
  const uuid = params.uuid;
  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter project category name",
    },
  ];

  const patchEndpoint = `${process.env.NEXT_PUBLIC_API_FETCH}/project-categories/${uuid}`;

  return (
    <>
      <div className="card bg-base-300">
        <div className="card-body">
          <EditForm
            fields={fields}
            endPoint={patchEndpoint}
            identifier={uuid}
            type="project-categories"
          />
        </div>
      </div>
    </>
  );
}
