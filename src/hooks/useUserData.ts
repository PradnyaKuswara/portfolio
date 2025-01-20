import { useCallback } from 'react';
import { KEY } from '../shared/constants/constantStorage';
import useLocalStorage from './useLocalStorage';
import useSWR from 'swr';

const validateToken = async (token: string) => {
  const response = await fetch(import.meta.env.VITE_API_URL + '/validate-token', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Invalid token');
  }

  const data = await response.json();
  return data;
};

const useUserData = () => {
  const storage = useLocalStorage();
  const token = storage.getLocalStorage(KEY.localStorage.auth.name);

  const { data, error, isValidating, mutate } = useSWR(token, validateToken);

  const refetch = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    userData: data?.data || null,
    isValidating,
    refetch,
    error
  };
};

export default useUserData;
