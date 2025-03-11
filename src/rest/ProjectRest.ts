import ProjectNamespace from "../@types/project";
import { KEY } from "../shared/constants/constantStorage";


export const getAll = async ({ currentPage, itemsPerPage }: { currentPage: number, itemsPerPage: number }) => {
  const url = `${import.meta.env.VITE_API_URL}/projects-front?page=${currentPage}&limit=${itemsPerPage}`;

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
  const url = `${import.meta.env.VITE_API_URL}/projects?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    },
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to fetch projects');
  }

  const data = await response.json();

  return {
    data: data.data,
    total: data.total
  };
}

export const storeProject = async (payload: ProjectNamespace.bodyType) => {
  const url = `${import.meta.env.VITE_API_URL}/projects`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to store project');
  }

  return await response.json();
}

export const updateProject = async (payload: ProjectNamespace.bodyType) => {
  const url = `${import.meta.env.VITE_API_URL}/projects/${payload.slugParam}`;

  delete payload.slugParam

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to update project');
  }

  return await response.json();
}

export const deleteProject = async (slug: string) => {
  const url = `${import.meta.env.VITE_API_URL}/projects/${slug}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    },
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to delete project');
  }

  return await response.json();
}