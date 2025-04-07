import ArticleNamespace from "../@types/article";
import { KEY } from "../shared/constants/constantStorage";


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

export const getAllProtected = async ({ currentPage, itemsPerPage, searchQuery }: { currentPage: number, itemsPerPage: number, searchQuery: string }) => {
  const url = `${import.meta.env.VITE_API_URL}/articles?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
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

export const storeArticle = async (payload: ArticleNamespace.bodyType) => {
  const url = `${import.meta.env.VITE_API_URL}/articles`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to store article');
  }

  return await response.json();
}

export const updateArticle = async (payload: ArticleNamespace.bodyType) => {
  const url = `${import.meta.env.VITE_API_URL}/articles/${payload.slugParam}`;

  console.log(payload.slugParam);

  delete payload.slugParam;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to update article');
  }

  return await response.json();
}

export const deleteArticle = async (slugParam: string) => {
  const url = `${import.meta.env.VITE_API_URL}/articles/${slugParam}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    },
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to delete article');
  }

  return await response.json();
}

export const updateStatusArticle = async (slugParam: string) => {
  const url = `${import.meta.env.VITE_API_URL}/articles/status/${slugParam}`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    },
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to update status article');
  }

  return await response.json();
}

export const showArticle = async (slug?: string) => {
  const url = `${import.meta.env.VITE_API_URL}/articles-front/${slug}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to fetch article');
  }

  return await response.json();
}