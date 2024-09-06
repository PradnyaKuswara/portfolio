'use client';

import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import { getData } from '../../utils/data';
import DeleteButton from '../../(components)/Button/DeleteButton';

interface Certificates {
    id: number;
    uuid: string;
    name: string;
    organization: string;
    month_obtained: string;
    year_obtained: string;
    month_expired: string;
    year_expired: string;
    url: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export default function Certificates() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;

    const limitdesc = (desc: string) => {
        return desc.length > 50 ? desc.slice(0, 50) + '...' : desc;
    };

    const { data: certificates } = useSWR(
        [`certificates`, currentPage, searchQuery],
        () =>
            getData(
                `${process.env.NEXT_PUBLIC_API_FETCH}/certificates?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`
            ),
        { revalidateOnFocus: false }
    );

    const totalPages = certificates
        ? Math.ceil(certificates.total / itemsPerPage)
        : 1;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset ke halaman pertama setiap kali pencarian berubah
    };
    return (
        <>
            <h1 className="text-lg font-bold">Certificates</h1>
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
                        <Link
                            href="/admin/certificates/create"
                            className="btn btn-primary"
                        >
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
                                    <th>organization</th>
                                    <th>Month Obtained</th>
                                    <th>Year Obtained</th>
                                    <th>Month Expired</th>
                                    <th>Year Expired</th>
                                    <th>Url</th>
                                    <th>Description</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {certificates &&
                                certificates.data.length > 0 ? (
                                    certificates.data.map(
                                        (
                                            certificate: Certificates,
                                            index: number
                                        ) => (
                                            <tr key={index} className="hover">
                                                <td>{index + 1}</td>
                                                <td>{certificate.name}</td>
                                                <td>
                                                    {certificate.organization}
                                                </td>
                                                <td>
                                                    {certificate.month_obtained}
                                                </td>
                                                <td>
                                                    {certificate.year_obtained}
                                                </td>
                                                <td>
                                                    {certificate.month_expired}
                                                </td>
                                                <td>
                                                    {certificate.year_expired}
                                                </td>
                                                <td>{certificate.url}</td>
                                                <td>
                                                    {limitdesc(certificate.description)}
                                                </td>

                                                <td>
                                                    {new Date(
                                                        certificate.createdAt
                                                    ).toLocaleString()}
                                                </td>
                                                <td>
                                                    {new Date(
                                                        certificate.updatedAt
                                                    ).toLocaleString()}
                                                </td>
                                                <td className="flex gap-2">
                                                    <Link
                                                        href={`/admin/certificates/edit/${certificate.uuid}`}
                                                        className="btn btn-sm btn-warning"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <DeleteButton
                                                        identifier={
                                                            certificate.uuid
                                                        }
                                                        endPoint="certificates"
                                                        mutatePoint={[
                                                            `certificates`,
                                                            currentPage,
                                                            searchQuery,
                                                        ]}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={12}
                                            className="text-center"
                                        >
                                            No data
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Controls */}
                    {certificates && certificates.total > 0 && (
                        <div className="flex justify-center mt-4">
                            <button
                                className="btn btn-outline"
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className="mx-4">
                                {currentPage} / {totalPages}
                            </span>
                            <button
                                className="btn btn-outline"
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
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
