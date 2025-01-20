import React from 'react';
import useLoginViewModel from './useLoginViewModel';
import useGlobalLoading from '../../../hooks/useGlobalLoading';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../shared/constants/constantRoute';
import MetadataLoginPage from './MetadataLoginPage';

const LoginPage: React.FC = () => {
  const { onLogin } = useLoginViewModel();
  const [loading, setLoading] = useGlobalLoading();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const res = await onLogin({ email, password });
    setLoading(false);
    if (res instanceof Error) {
      return toast.error(res.message);
    }

    toast.success('Login success');
    navigate(ROUTE.admin.main.fullPath, { replace: true });
  };

  return (
    <>
      <MetadataLoginPage />
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-4 space-y-4  rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center">Login</h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
