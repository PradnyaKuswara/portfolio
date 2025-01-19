export const ROUTE = {
  home: {
    locale: 'home-page',
    path: 'home',
    fullPath: '/',
    name: 'Home Page',
  },
  about: {
    locale: 'about-page',
    path: 'about',
    fullPath: '/about/',
    name: 'About Page',
  },
  blog: {
    locale: 'blog-page',
    path: 'blog',
    fullPath: '/blogs/',
    name: 'Blog Page',
  },
  project: {
    locale: 'projects-page',
    path: 'project',
    fullPath: '/projects/',
    name: 'Project Page',
  },
  login: {
    locale: 'login-page',
    path: 'login',
    fullPath: '/login/',
    name: 'Login Page',
  },
  admin: {
    locale: 'admin-page',
    path: 'admin',
    fullPath: '/admin/',
    name: 'Admin Page',
    icon: 'admin',
    main: {
      keys: ['admin', 'dashboard'],
      locale: 'admin-page.main-dashboard',
      path: 'dashboard',
      fullPath: '/admin/dashboard/',
      name: 'Dashboard Page',
      icon: 'dashboard',
      description: 'Dashboard page for admin',
    }
  }
}