import React, { useCallback } from 'react'
import useSWR from 'swr';
import { deleteProject, getAllProtected } from '../../../rest/ProjectRest';

const useListProjectViewModel = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const itemsPerPage = 6;

  const { data: projects, isValidating, mutate } = useSWR(
    ['fetch-projects', currentPage, itemsPerPage, searchQuery],
    ([, page, limit, query]) =>
      getAllProtected({ currentPage: page, itemsPerPage: limit, searchQuery: query }),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const totalPages = projects ? Math.ceil(projects.total / itemsPerPage) : 1;

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

  const onDelete = async (slug: string) => {
    try {
      const response = await deleteProject(slug);
      return response
    }
    catch (error) {
      return error
    }
  }

  return {
    projects,
    totalPages,
    currentPage,
    onPageChange,
    refetch,
    onSearch,
    isValidating,
    onDelete
  }

}

export default useListProjectViewModel
