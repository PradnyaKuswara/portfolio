import React from 'react'
import { getAll } from '../../rest/ProjectRest';
import useSWR from 'swr';

const useProjectViewModel = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  const { data: projects, mutate } = useSWR(
    ['fetch-projects', currentPage, itemsPerPage],
    ([, page, limit]) => getAll({ currentPage: page, itemsPerPage: limit })
  );

  const totalPages = projects ? Math.ceil(projects.total / itemsPerPage) : 1;

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return {
    projects,
    totalPages,
    currentPage,
    onPageChange,
    mutate
  }
}

export default useProjectViewModel
