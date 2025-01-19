import { login } from '../../../rest/AuthRest';
import useLocalStorage from '../../../hooks/useLocalStorage';


const useLoginViewModel = () => {
  const storage = useLocalStorage();

  const onLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const insertParams = {
        email,
        password
      }

      const response = await login({ storage, insertParams });
      return response
    } catch (error) {
      return error
    }
  }

  return {
    onLogin
  }
}

export default useLoginViewModel
