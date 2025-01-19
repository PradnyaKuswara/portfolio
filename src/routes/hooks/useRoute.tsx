import { Suspense, useMemo } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import { ROUTE } from '../../shared/constants/constantRoute';
import HomePage from '../../pages/Home/HomePage';
import AboutPage from '../../pages/About/AboutPage';
import AppLayout from '../../components/Layout/AppLayout';
import BlogPage from '../../pages/Blog/BlogPage';
import ProjectPage from '../../pages/Project/ProjectPage';
import LoginPage from '../../pages/Auth/Login/LoginPage';
import useRouteDashboard from './useRouteDashboard';

interface Page {
  path: string;
  component: React.ElementType;
}

export const useRoute = () => {
  const routeDashboard = useRouteDashboard();

  const routes = useMemo(() => {
    const pages: Page[] = [
      { path: ROUTE.home.fullPath, component: HomePage },
      { path: ROUTE.about.fullPath, component: AboutPage },
      { path: ROUTE.blog.fullPath, component: BlogPage },
      { path: ROUTE.project.fullPath, component: ProjectPage },
    ];

    const children: RouteObject[] = pages.map(
      ({ path, component: Component }) => ({
        path,
        element: (
          <AppLayout>
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          </AppLayout>
        ),
      })
    );

    children.push({
      path: ROUTE.login.fullPath,
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <LoginPage />
        </Suspense>
      ),
    });

    children.push(...routeDashboard);

    children.push({
      path: '*',
      element: <h1>NotFound</h1>,
    });

    return children;
  }, [routeDashboard]);

  return useRoutes(routes);
};
