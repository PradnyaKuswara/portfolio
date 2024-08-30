'use client';

import React from 'react';
import Link from 'next/link';
import DeleteButton from '../../(components)/Button/DeleteButton';
import useSWR from 'swr';
import { getData, updateStatus } from '../../utils/data';
import Image from 'next/image';
import toast from 'react-hot-toast';

type Tag = {
    id: number;
    uuid: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

interface Article {
    id: number;
    uuid: string;
    title: string;
    thumbnail: string;
    slug: string;
    content: string;
    meta_desc: string;
    meta_keyword: string | null;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
}

export default function ArticlesPage() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;

    const limitdesc = (desc: string) => {
        return desc.length > 50 ? desc.slice(0, 50) + '...' : desc;
    };

    const { data: articles, mutate } = useSWR(
        [`articles`, currentPage, searchQuery],
        () =>
            getData(
                `${process.env.NEXT_PUBLIC_API_FETCH}/articles?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`
            ),
        { revalidateOnFocus: false }
    );

    const totalPages = articles ? Math.ceil(articles.total / itemsPerPage) : 1;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleStatusChange = async (slug: string) => {
        await updateStatus(
            `${process.env.NEXT_PUBLIC_API_FETCH}/articles/status/${slug}`
        );

        toast.success('Data update status successfully');

        mutate();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <>
            <h1 className="text-lg font-bold">Articles</h1>
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
                            href="/admin/articles/create"
                            className="btn btn-primary"
                        >
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
                                    <th>Thumbnail</th>
                                    <th>Title</th>
                                    <th>Slug</th>
                                    <th>Tags</th>
                                    <th>Meta Desc</th>
                                    <th>Meta Key</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles && articles.data.length > 0 ? (
                                    articles.data.map(
                                        (article: Article, index: number) => (
                                            <tr key={index} className="hover">
                                                <td>
                                                    {article.is_active ? (
                                                        <button
                                                            className="btn btn-success btn-sm"
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    article.slug
                                                                )
                                                            }
                                                        >
                                                            active
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-error btn-sm"
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    article.slug
                                                                )
                                                            }
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
                                                                src={`${process.env.NEXT_PUBLIC_API_URL}/${article.thumbnail}`}
                                                                alt={
                                                                    article.title
                                                                }
                                                                width={100}
                                                                height={100}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>{article.title}</td>
                                                <td>{article.slug}</td>
                                                <td>
                                                    {article.tags.map(
                                                        (tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="text-accent mr-2"
                                                            >
                                                                {tag.name}
                                                            </span>
                                                        )
                                                    )}
                                                </td>
                                                <td>
                                                    {limitdesc(
                                                        article.meta_desc
                                                    )}
                                                </td>
                                                <td>{article.meta_keyword}</td>
                                                <td>
                                                    {new Date(
                                                        article.createdAt
                                                    ).toLocaleString()}
                                                </td>
                                                <td>
                                                    {new Date(
                                                        article.updatedAt
                                                    ).toLocaleString()}
                                                </td>
                                                <td className="flex gap-2">
                                                    <Link
                                                        href={`/admin/articles/edit/${article.slug}`}
                                                        className="btn btn-sm btn-warning"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <DeleteButton
                                                        identifier={
                                                            article.slug
                                                        }
                                                        endPoint="articles"
                                                        mutatePoint={[
                                                            `articles`,
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
                                            colSpan={11}
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
                    {articles && articles.total > 0 && (
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
