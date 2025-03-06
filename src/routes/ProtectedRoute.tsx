import React, { useEffect } from 'react';
import useGlobalLoading from '../hooks/useGlobalLoading';
import useUserData from '../hooks/useUserData';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTE } from '../shared/constants/constantRoute';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [, setLoading] = useGlobalLoading();
  const { userData, isValidating, error, refetch } = useUserData();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(isValidating);
  }, [isValidating, setLoading]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (error) {
      navigate(ROUTE.login.fullPath, { replace: true });
    }
  }, [error, navigate]);

  return userData ? children : null;
};

export default ProtectedRoute;
