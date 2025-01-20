export const getAll = async ({ currentPage, itemsPerPage }: { currentPage: number, itemsPerPage: number }) => {
  const url = `${import.meta.env.VITE_API_URL}/certificates-front?page=${currentPage}&limit=${itemsPerPage}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to fetch certificates');
  }

  const data = await response.json();

  return {
    data: data.data,
    total: data.total
  };
}