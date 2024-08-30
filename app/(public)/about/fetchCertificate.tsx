'use client';

import { getData } from '@/app/(protected)/utils/data';
import React from 'react';
import useSWR from 'swr';
import { HoverEffectSertificate } from '../(components)/ui/card-hover-effect-sertificate';

export default function FetchCertificates() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchQuery, setSearchQuery] = React.useState('');
    const itemsPerPage = 6;

    const { data: certificates } = useSWR(
        [`certificates-front`, currentPage, searchQuery],
        () =>
            getData(
                `${process.env.NEXT_PUBLIC_API_FETCH}/certificates-front?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`
            ),
        { revalidateOnFocus: false }
    );

    const totalPages = certificates
        ? Math.ceil(certificates.total / itemsPerPage)
        : 1;

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
            {certificates && certificates.data.length > 0 ? (
                <div>
                    {' '}
                    <HoverEffectSertificate
                        items={certificates.data}
                    ></HoverEffectSertificate>{' '}
                </div>
            ) : (
                <div className="text-center text-lg font-bold mt-10">
                    {' '}
                    Certificate not found 😢{' '}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center">
                {certificates && certificates.total > 6 && (
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
