import { Suspense, useMemo } from 'react';
import { ROUTE } from '../../shared/constants/constantRoute';
import MainDashboardPage from '../../pages/Dashboard/MainDashboardPage';
import { RouteObject } from 'react-router-dom';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import ProtectedRoute from '../ProtectedRoute';
import CertificatePage from '../../pages/Dashboard/Certificate/CertificatePage';
import BlogPage from '../../pages/Dashboard/Blog/BlogPage';
import ProjectCategoryPage from '../../pages/Dashboard/ProjectCategory/ProjectCategoryPage';
import ProjectPage from '../../pages/Dashboard/Project/ProjectPage';

interface Page {
  path: string;
  component: React.ElementType;
}

const useRouteDashboard = () => {
  const routes = useMemo(() => {
    const pages: Page[] = [
      { path: ROUTE.admin.main.fullPath, component: MainDashboardPage },
      { path: ROUTE.admin.certificate.fullPath, component: CertificatePage },
      { path: ROUTE.admin.blog.fullPath, component: BlogPage },
      {
        path: ROUTE.admin.projectCategory.fullPath,
        component: ProjectCategoryPage,
      },
      { path: ROUTE.admin.project.fullPath, component: ProjectPage },
    ];

    const children: RouteObject[] = pages.map(
      ({ path, component: Component }) => ({
        path,
        element: (
          <ProtectedRoute>
            <DashboardLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Component />
              </Suspense>
            </DashboardLayout>
          </ProtectedRoute>
        ),
      })
    );

    return children;
  }, []);

  return routes;
};

export default useRouteDashboard;
