import React from 'react'
import { getAll } from '../../rest/BlogRest';
import useSWR from 'swr';

const useBlogViewModel = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const itemsPerPage = 6;

  const { data: blogs, mutate } = useSWR({ currentPage, itemsPerPage, searchQuery }, getAll);

  const totalPages = blogs ? Math.ceil(blogs.total / itemsPerPage) : 1;

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return {
    blogs,
    totalPages,
    currentPage,
    searchQuery,
    onPageChange,
    onSearchChange,
    mutate,
  }


}

export default useBlogViewModel
