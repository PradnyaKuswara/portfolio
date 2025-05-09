import React from 'react'
import useSWR from 'swr';
import { getAll } from '../../rest/CertificateRest';

const useAboutViewModel = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  const { data: certificates, mutate, isValidating } = useSWR(
    ['fetch-certificates', currentPage, itemsPerPage],
    ([, page, limit]) => getAll({ currentPage: page, itemsPerPage: limit })
  );

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
    isValidating
  };
};

export default useAboutViewModel;
