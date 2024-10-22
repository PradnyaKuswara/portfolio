import EditForm from "@/app/(protected)/(components)/Form/EditForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tags Edit",
};

export default function TagsEdit({ params }: { params: any }) {
  const uuid = params.uuid;
  const type = "tags";
  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter tag name",
    },
  ];

  const patchEndpoint = `${process.env.NEXT_PUBLIC_API_FETCH}/tags/${uuid}`;

  return (
    <>
      <div className="card bg-base-300">
        <div className="card-body">
          <EditForm
            fields={fields}
            endPoint={patchEndpoint}
            identifier={uuid}
            type={type}
          />
        </div>
      </div>
    </>
  );
}
