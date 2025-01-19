import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import { useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

import { getLocalizedText } from '../../helpers/localize';
import {
  findRouteArrayCurrent,
  searchRouteFromArrayCurrent,
} from '../../helpers/routeArray';

const PageHeader: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const breadcrumbTrail = findRouteArrayCurrent(location.pathname);
  const searchObjectBreadCrumb = searchRouteFromArrayCurrent({
    location: location.pathname,
  });

  return (
    <>
      <div className="breadcrumbs text-xs">
        <ul>
          {breadcrumbTrail.map((item, index) => (
            <li key={item.fullPath}>
              {index === breadcrumbTrail.length - 1 ? (
                <span className="inline-flex items-center gap-1">
                  <Icon
                    className="text-secondary"
                    style={{ fontSize: '0.8rem' }}
                  >
                    {item.icon}
                  </Icon>
                  {getLocalizedText(
                    t,
                    `${item?.locale}.title`,
                    item?.name || 'Default Title'
                  )}
                </span>
              ) : (
                <Link
                  to={item.fullPath}
                  className="inline-flex items-center gap-1"
                >
                  <Icon
                    className="text-secondary"
                    style={{ fontSize: '0.8rem' }}
                  >
                    {item.icon}
                  </Icon>
                  {getLocalizedText(
                    t,
                    `${item?.locale}.title`,
                    item?.name || 'Default Title'
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-1 mt-2">
        <h1 className="text-2xl font-extrabold">
          {getLocalizedText(
            t,
            `${searchObjectBreadCrumb?.locale}.title`,
            searchObjectBreadCrumb?.name || 'Default Title'
          )}
        </h1>
        <p className="text-xs">
          {getLocalizedText(
            t,
            `${searchObjectBreadCrumb?.locale}.description`,
            searchObjectBreadCrumb?.description || 'Default Description'
          )}
        </p>
      </div>
    </>
  );
};

export default PageHeader;
