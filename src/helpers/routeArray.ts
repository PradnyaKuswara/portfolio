import { ROUTE } from "../shared/constants/constantRoute";

interface RouteItem {
  path: string;
  fullPath: string;
  name: string;
  description?: string;
  [key: string]: unknown;
  icon?: string | null;
  locale?: string | null;
  getFullPath?: (param: string) => string;
}

export const findRouteArrayCurrent = (
  path: string,
  node: RouteItem = ROUTE.admin,
  trail: RouteItem[] = []
): RouteItem[] => {
  if (node.fullPath === path) {
    return [...trail, node];
  }

  if (node.getFullPath) {
    const pathParts = path.split('/').filter(Boolean);
    const fullPathParts = node.fullPath.split('/').filter(Boolean);

    if (fullPathParts.length === pathParts.length) {
      const params: { [key: string]: string } = {};
      let partSlice = ''

      let isMatch = true;
      fullPathParts.forEach((part, index) => {
        if (part.startsWith(':')) {
          params[part.slice(1)] = pathParts[index];
          partSlice = part.slice(1);
        } else if (part !== pathParts[index]) {
          isMatch = false;
        }
      });

      if (isMatch) {
        const fullPathWithParams = node.getFullPath(params[partSlice]);
        if (fullPathWithParams === path) {
          return [...trail, node];
        }
      }
    }
  }

  for (const key in node) {
    if (
      typeof node[key] === 'object' &&
      node[key] !== null &&
      ('fullPath' in node[key] || 'getFullPath' in node[key])
    ) {
      const result = findRouteArrayCurrent(path, node[key] as RouteItem, [
        ...trail,
        node,
      ]);

      if (result.length) return result;
    }
  }

  return []
};


export const searchRouteFromArrayCurrent = ({ location }: { location: string }) => {
  const routeItem = findRouteArrayCurrent(location);

  const searchObjectBreadCrumb = routeItem.find((item) => {
    if (item.fullPath === location) return true;

    if (item.getFullPath) {
      const pathParts = location.split('/').filter(Boolean);
      const fullPathParts = item.fullPath.split('/').filter(Boolean);

      if (fullPathParts.length === pathParts.length) {
        const params: { [key: string]: string } = {};
        let isMatch = true;

        fullPathParts.forEach((part, index) => {
          if (part.startsWith(':')) {
            params[part.slice(1)] = pathParts[index];
          } else if (part !== pathParts[index]) {
            isMatch = false;
          }
        });

        if (isMatch) {
          const fullPathWithParams = item.getFullPath(params.id);
          if (fullPathWithParams === location) {
            return true;
          }
        }
      }
    }

    return false;
  });

  return searchObjectBreadCrumb;
};
