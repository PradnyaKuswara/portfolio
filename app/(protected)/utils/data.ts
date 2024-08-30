import Cookies from "js-cookie";

const token = Cookies.get('token');

export const getData = async (url: string) => {
  const response = await fetch(
    `${url}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to fetch project categories');
  }

  const data = await response.json();

  return {
    data: data.data,
    total: data.total,
  };
};

export const showData = async (url: string) => {
  const response = await fetch(
    `${url}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to fetch project category');
  }
  const data = await response.json();

  return data.data;
}

export async function updateStatus(url: string) {
  const response = await fetch(
    `${url}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(await response.text() || 'Failed to fetch project category');
  }
}

