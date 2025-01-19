import React from 'react'
import { getAll } from '../../rest/ProjectRest';
import useSWR from 'swr';

const useProjectViewModel = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  const { data: projects } = useSWR({ currentPage, itemsPerPage }, getAll);

  const totalPages = projects ? Math.ceil(projects.total / itemsPerPage) : 1;

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return {
    projects,
    totalPages,
    currentPage,
    onPageChange,
  }
}

export default useProjectViewModel
