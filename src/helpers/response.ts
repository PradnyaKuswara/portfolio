export const handleResponse = async (response: Response) => {
  const data = await response.json();

  switch (parseInt(response.status.toString())) {
    case 200:
      return data;
    case 422:
      throw new Error(data.message || 'Unprocessable Entity');
    case 400:
      throw new Error(data.message || 'Bad Request');
    case 401:
      throw new Error('Wrong credentials');
    case 403:
      throw new Error('Forbidden. You do not have access.');
    case 404:
      throw new Error('Not Found. The resource does not exist.');
    case 500:
      throw new Error('Internal Server Error. Please try again later.');
    default:
      throw new Error(data.message || 'An unexpected error occurred.')
  }
};
