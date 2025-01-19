

export const getAll = async ({ currentPage, itemsPerPage, searchQuery }: { currentPage: number, itemsPerPage: number, searchQuery: string }) => {
  const url = `${import.meta.env.VITE_API_URL}/articles-front?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to fetch project categories');
  }

  const data = await response.json();
 
  return {
    data: data.data,
    total: data.total,
  }
}