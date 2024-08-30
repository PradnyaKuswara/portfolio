'use client';

import { getData } from '@/app/(protected)/utils/data';
import React from 'react';
import useSWR from 'swr';
import { HoverEffectProject } from '../(components)/ui/card-hover-effect-project';

export default function FetchProjects() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 6;

    const { data: projects } = useSWR(
        [`projects-front`, currentPage],
        () =>
            getData(
                `${process.env.NEXT_PUBLIC_API_FETCH}/projects-front?page=${currentPage}&limit=${itemsPerPage}`
            ),
        { revalidateOnFocus: false }
    );

    const totalPages = projects ? Math.ceil(projects.total / itemsPerPage) : 1;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    React.useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [currentPage]);

    return (
        <>
            {projects?.data.length > 0 ? (
                <HoverEffectProject items={projects?.data} />
            ) : (
                <div className="text-center text-lg font-bold mt-10">
                    {' '}
                    Project not found 😢{' '}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center">
                {projects && projects.total > 6 && (
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
