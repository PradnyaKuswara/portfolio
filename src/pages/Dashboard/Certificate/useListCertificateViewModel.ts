import React from 'react'
import useSWR from 'swr';
import { getAllProtected } from '../../../rest/CertificateRest';

const useListCertificateViewModel = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const itemsPerPage = 6;

  const { data: certificates, isValidating, mutate } = useSWR(
    ['fetch-certificates', currentPage, itemsPerPage, searchQuery],
    ([, page, limit, query]) =>
      getAllProtected({ currentPage: page, itemsPerPage: limit, searchQuery: query })
  );

  const totalPages = certificates ? Math.ceil(certificates.total / itemsPerPage) : 1;

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const onSearch = (query: string) => {
    setSearchQuery(query);
  };

  return {
    certificates,
    totalPages,
    currentPage,
    onPageChange,
    mutate,
    onSearch,
    isValidating
  };

}

export default useListCertificateViewModel
