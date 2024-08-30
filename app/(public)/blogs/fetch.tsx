'use client';

import { getData } from '@/app/(protected)/utils/data';
import React from 'react';
import useSWR from 'swr';
import { HoverEffectBlog } from '../(components)/ui/card-hover-effect-blog';

export default function FetchBlogs() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchQuery, setSearchQuery] = React.useState('');
    const itemsPerPage = 6;

    const { data: articles } = useSWR(
        [`articles-front`, currentPage, searchQuery],
        () =>
            getData(
                `${process.env.NEXT_PUBLIC_API_FETCH}/articles-front?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`
            ),
        { revalidateOnFocus: false }
    );

    const totalPages = articles ? Math.ceil(articles.total / itemsPerPage) : 1;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    React.useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [currentPage]);

    return (
        <>
            <div className="mt-4">
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
            </div>

            {articles && articles.data.length > 0 ? (
                <div>
                    {' '}
                    <HoverEffectBlog items={articles?.data} />{' '}
                </div>
            ) : (
                <div className="text-center text-lg font-bold mt-10">
                    {' '}
                    Blog not found 😢{' '}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center">
                {articles && articles.total > 6 && (
                    <div className="join grid grid-cols-2">
                        <button
                            className="join-item btn btn-outline"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="join-item btn btn-outline"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
