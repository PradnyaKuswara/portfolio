/* eslint-disable @typescript-eslint/no-explicit-any */
import { KEY } from "../shared/constants/constantStorage";


export const getAllProtected = async ({ currentPage, itemsPerPage, searchQuery }: { currentPage: number, itemsPerPage: number, searchQuery: string }) => {
  const url = `${import.meta.env.VITE_API_URL}/project-categories?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    },
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to fetch project categories');
  }

  const data = await response.json();

  return {
    data: data.data,
    total: data.total
  };
}

export const storeProjectCategory = async (payload: any) => {
  const url = `${import.meta.env.VITE_API_URL}/project-categories`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to store project category');
  }

  return await response.json();
}

export const updateProjectCategory = async (payload: any) => {
  const url = `${import.meta.env.VITE_API_URL}/project-categories/${payload.uuid}`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to update project category');
  }

  return await response.json();
}

export const deleteProjectCategory = async (uuid: string) => {
  const url = `${import.meta.env.VITE_API_URL}/project-categories/${uuid}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    }
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to delete project category');
  }

  return await response.json();
}