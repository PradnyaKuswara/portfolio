import { handleResponse } from "../helpers/response";
import { KEY } from "../shared/constants/constantStorage";

export interface fetchParams {
  storage: {
    setLocalStorage: (key: string, value: string) => void;
    getLocalStorage: (key: string) => string | null;
    removeLocalStorage: (key: string) => void;
  },
}

export interface loginParams extends fetchParams {
  insertParams: {
    email: string;
    password: string;
  }
}

export const login = async ({ storage, insertParams }: loginParams) => {
  const response = await fetch(import.meta.env.VITE_API_URL + '/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(insertParams)
  })

  const res = await handleResponse(response);

  storage.setLocalStorage(KEY.localStorage.auth.name, res.token)

  return res;
}

export const logout = async ({ storage }: fetchParams) => {
  const response = await fetch(import.meta.env.VITE_API_URL + '/logout/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${storage.getLocalStorage(KEY.localStorage.auth.name)}`
    }
  })

  const res = await handleResponse(response);

  storage.removeLocalStorage(KEY.localStorage.auth.name)

  return res;
}