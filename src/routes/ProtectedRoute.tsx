import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { UserAtom } from '../shared/atoms/atom';
import { ROUTE } from '../shared/constants/constantRoute';
import useGlobalLoading from '../hooks/useGlobalLoading';
import { Navigate } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userData, isValidating } = useUserData();
  const [, setUser] = useRecoilState(UserAtom);
  const [, setLoading] = useGlobalLoading();

  useEffect(() => {
    console.log('ProtectedRoute rendered');
    if (userData) {
      setUser(userData);
    }
  }, [userData, setUser]);

  useEffect(() => {
    setLoading(isValidating);
  }, [isValidating, setLoading]);

  if (isValidating) {
    return null;
  }

  if (!userData) {
    return <Navigate to={ ROUTE.login.fullPath } />;
  }

  return children;
};

export default ProtectedRoute;
