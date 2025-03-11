import React, { useCallback } from 'react'
import useSWR from 'swr';
import { deleteCertificate, getAllProtected } from '../../../rest/CertificateRest';

const useListCertificateViewModel = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const itemsPerPage = 6;

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


  return {
    certificates,
    totalPages,
    currentPage,
    onPageChange,
    refetch,
    onSearch,
    isValidating,
    onDelete
  };

}

export default useListCertificateViewModel
