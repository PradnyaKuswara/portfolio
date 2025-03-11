import React, { useCallback } from 'react'
import useSWR from 'swr';
import { deleteProjectCategory, getAllProtected } from '../../../rest/ProjectCategory';

const useListProjectCategoryViewModel = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const itemsPerPage = 6;

  const { data: projectCategories, isValidating, mutate } = useSWR(
    ['fetch-project-categories', currentPage, itemsPerPage, searchQuery],
    ([, page, limit, query]) =>
      getAllProtected({ currentPage: page, itemsPerPage: limit, searchQuery: query }),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const totalPages = projectCategories ? Math.ceil(projectCategories.total / itemsPerPage) : 1;

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
      const response = await deleteProjectCategory(uuid);
      return response
    }
    catch (error) {
      return error
    }
  }

  return {
    projectCategories,
    totalPages,
    currentPage,
    onPageChange,
    refetch,
    onSearch,
    isValidating,
    onDelete
  };
}

export default useListProjectCategoryViewModel
