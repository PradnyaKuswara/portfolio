import React from 'react'
import useSWR from 'swr';
import { getAll } from '../../rest/CertificateRest';

const useAboutViewModel = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  const { data: certificates, mutate } = useSWR({ currentPage, itemsPerPage }, getAll);

  const totalPages = certificates ? Math.ceil(certificates.total / itemsPerPage) : 1;

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return {
    certificates,
    totalPages,
    currentPage,
    onPageChange,
    mutate,
  }
}

export default useAboutViewModel
