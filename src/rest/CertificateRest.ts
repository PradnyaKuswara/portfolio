/* eslint-disable @typescript-eslint/no-explicit-any */
import { KEY } from "../shared/constants/constantStorage";

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

export const getAllProtected = async ({ currentPage, itemsPerPage, searchQuery }: { currentPage: number, itemsPerPage: number, searchQuery: string }) => {
  const url = `${import.meta.env.VITE_API_URL}/certificates?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`;

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

export const storeCertificate = async (payload: any) => {
  const url = `${import.meta.env.VITE_API_URL}/certificates`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to store certificate');
  }

  return await response.json();
}

export const updateCertificate = async (payload: any) => {
  const url = `${import.meta.env.VITE_API_URL}/certificates/${payload.uuid}`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to update certificate');
  }

  return await response.json();
}

export const deleteCertificate = async (uuid: string) => {
  const url = `${import.meta.env.VITE_API_URL}/certificates/${uuid}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(KEY.localStorage.auth.name)}`
    }
  });

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to delete certificate');
  }

  return await response.json();
}