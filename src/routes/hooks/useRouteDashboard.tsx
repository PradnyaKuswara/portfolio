import { Suspense, useMemo } from 'react';
import { ROUTE } from '../../shared/constants/constantRoute';
import MainDashboardPage from '../../pages/Dashboard/MainDashboardPage';
import { RouteObject } from 'react-router-dom';
import DashboardLayout from '../../components/Layout/DashboardLayout';

interface Page {
  path: string;
  component: React.ElementType;
}

const useRouteDashboard = () => {
  const routes = useMemo(() => {
    const pages: Page[] = [
      { path: ROUTE.admin.main.fullPath, component: MainDashboardPage },
    ];

    const children: RouteObject[] = pages.map(
      ({ path, component: Component }) => ({
        path,
        element: (
          <DashboardLayout>
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          </DashboardLayout>
        ),
      })
    );

    return children;
  }, []);

  return routes;
};

export default useRouteDashboard;
