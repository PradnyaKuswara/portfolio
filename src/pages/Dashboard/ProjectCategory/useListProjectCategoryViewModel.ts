import React, { useCallback, useMemo } from 'react'
import useSWR from 'swr';
import { deleteProjectCategory, getAllProtected } from '../../../rest/ProjectCategory';

const useListProjectCategoryViewModel = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const itemsPerPage = 10;

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

  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage, itemsPerPage]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + itemsPerPage, projectCategories?.total || 0);
  }, [itemsPerPage, startIndex, projectCategories]);

  return {
    projectCategories,
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

export default useListProjectCategoryViewModel
