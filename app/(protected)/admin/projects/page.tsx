"use client";

import React from "react";
import Link from "next/link";
import DeleteButton from "../../(components)/Button/DeleteButton";
import useSWR from "swr";
import { getData, updateStatus } from "../../utils/data";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const { data: projects, mutate } = useSWR(
    [`projects`, currentPage, searchQuery],
    () =>
      getData(
        `${process.env.NEXT_PUBLIC_API_FETCH}/projects?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`
      ),
    { revalidateOnFocus: false }
  );

  const totalPages = projects ? Math.ceil(projects.total / itemsPerPage) : 1;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleStatusChange = async (slug: string) => {
    await updateStatus(
      `${process.env.NEXT_PUBLIC_API_FETCH}/projects/status/${slug}`
    );

    toast.success("Data update status successfully");
    mutate();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset ke halaman pertama setiap kali pencarian berubah
  };

  return (
    <>
      <h1 className="text-lg font-bold">Projects</h1>
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
            <Link href="/admin/projects/create" className="btn btn-primary">
              + Add Data
            </Link>
          </div>
        </div>
        <div className="mt-4 ">
          <div className="overflow-x-auto">
            <table className="table border">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>No</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Slug</th>
                  <th>Stack</th>
                  <th>Github</th>
                  <th>Project</th>
                  <th>Documentation</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects && projects.data.length > 0 ? (
                  projects.data.map((project: IProject, index: number) => (
                    <tr key={index} className="hover">
                      <td>
                        {project.is_active ? (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleStatusChange(project.slug)}
                          >
                            active
                          </button>
                        ) : (
                          <button
                            className="btn btn-error btn-sm"
                            onClick={() => handleStatusChange(project.slug)}
                          >
                            inactive
                          </button>
                        )}
                      </td>
                      <td>{index + 1}</td>
                      <td>
                        <div className="avatar">
                          <div className="w-14 rounded">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}/${project.image}`}
                              alt={project.title}
                              width={100}
                              height={100}
                            />
                          </div>
                        </div>
                      </td>
                      <td>{project.title}</td>
                      <td>{project.ProjectCategory.name}</td>
                      <td>{project.slug}</td>
                      <td>{project.stack}</td>
                      <td>{project.link_github || "-"}</td>
                      <td>{project.link_project || "-"}</td>
                      <td>{project.link_documentation || "-"}</td>
                      <td>{new Date(project.createdAt).toLocaleString()}</td>
                      <td>{new Date(project.updatedAt).toLocaleString()}</td>
                      <td className="flex gap-2">
                        <Link
                          href={`/admin/projects/edit/${project.slug}`}
                          className="btn btn-sm btn-warning"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          identifier={project.slug}
                          endPoint="projects"
                          mutatePoint={[`projects`, currentPage, searchQuery]}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={12} className="text-center">
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          {projects && projects.data.length > 0 && (
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
