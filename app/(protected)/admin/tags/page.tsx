"use client";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import DeleteButton from "../../(components)/Button/DeleteButton";
import { getData } from "../../utils/data";

export default function TagsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const { data: tags } = useSWR(
    [`tags`, currentPage, searchQuery],
    () =>
      getData(
        `${process.env.NEXT_PUBLIC_API_FETCH}/tags?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`
      ),
    { revalidateOnFocus: false }
  );

  const totalPages = tags ? Math.ceil(tags.total / itemsPerPage) : 1;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <h1 className="text-lg font-bold">Tags</h1>
      <div className="card shadow-lg p-4">
        <div className="card-header">
          <div className="flex justify-between">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <Link href="/admin/tags/create" className="btn btn-primary">
              + Add Data
            </Link>
          </div>
        </div>
        <div className="mt-4 ">
          <div className="overflow-x-auto">
            <table className="table border">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tags && tags.data.length > 0 ? (
                  tags.data.map((tag: ITag, index: number) => (
                    <tr key={index} className="hover">
                      <td>{index + 1}</td>
                      <td>{tag.name}</td>
                      <td>{new Date(tag.createdAt).toLocaleString()}</td>
                      <td>{new Date(tag.updatedAt).toLocaleString()}</td>
                      <td className="flex gap-2">
                        <Link
                          href={`/admin/tags/edit/${tag.uuid}`}
                          className="btn btn-sm btn-warning"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          identifier={tag.uuid}
                          endPoint="tags"
                          mutatePoint={[`tags`, currentPage, searchQuery]}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          {tags && tags.data.length > 0 && (
            <div className="flex justify-center mt-4">
              <button
                className="btn btn-outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-4">
                {currentPage} / {totalPages}
              </span>
              <button
                className="btn btn-outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
