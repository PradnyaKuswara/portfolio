import React from 'react'
import { deleteArticle, getAllProtected, updateStatusArticle } from '../../../rest/BlogRest';
import useSWR from 'swr';

const useListArticleViewModel = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const itemsPerPage = 6;

  const { data: articles, isValidating, mutate } = useSWR(
    ['fetch-articles', currentPage, itemsPerPage, searchQuery],
    ([, page, limit, query]) =>
      getAllProtected({ currentPage: page, itemsPerPage: limit, searchQuery: query }),
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  const totalPages = articles ? Math.ceil(articles.total / itemsPerPage) : 1;

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const onSearch = (query: string) => {
    setSearchQuery(query);
  };

  const refetch = React.useCallback(() => {
    mutate();
  }
    , [mutate]);

  const onDelete = async (slug: string) => {
    try {
      const response = await deleteArticle(slug);
      return response
    }
    catch (error) {
      return error
    }
  }

  const onUpdateStatus = async (slug: string) => {
    try {
      const response = await updateStatusArticle(slug);
      return response
    }
    catch (error) {
      return error
    }
  }

  const startIndex = React.useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage, itemsPerPage]);

  const endIndex = React.useMemo(() => {
    return Math.min(startIndex + itemsPerPage, articles?.total || 0);
  }, [startIndex, itemsPerPage, articles]);


  return {
    articles,
    totalPages,
    currentPage,
    onPageChange,
    refetch,
    onSearch,
    isValidating,
    onDelete,
    onUpdateStatus,
    startIndex,
    endIndex
  };
}

export default useListArticleViewModel
