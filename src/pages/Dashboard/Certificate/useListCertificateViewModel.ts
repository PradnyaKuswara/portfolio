import React, { useCallback, useMemo } from 'react'
import useSWR from 'swr';
import { deleteCertificate, getAllProtected } from '../../../rest/CertificateRest';

const useListCertificateViewModel = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const itemsPerPage = 10;

  const { data: certificates, isValidating, mutate } = useSWR(
    ['fetch-certificates', currentPage, itemsPerPage, searchQuery],
    ([, page, limit, query]) =>
      getAllProtected({ currentPage: page, itemsPerPage: limit, searchQuery: query }),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const totalPages = certificates ? Math.ceil(certificates.total / itemsPerPage) : 1;

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const onSearch = (query: string) => {
    setSearchQuery(query);
  };

  const refetch = useCallback(() => {
    mutate();
  }
    , [mutate]);

  const onDelete = async (uuid: string) => {
    try {
      const response = await deleteCertificate(uuid);
      return response
    }
    catch (error) {
      return error
    }
  }

  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage, itemsPerPage]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + itemsPerPage, certificates?.total || 0);
  }, [startIndex, itemsPerPage, certificates]);

  return {
    certificates,
    totalPages,
    currentPage,
    onPageChange,
    refetch,
    onSearch,
    isValidating,
    onDelete,
    startIndex,
    endIndex
  };

}

export default useListCertificateViewModel
