import { ROUTE } from '../../shared/constants/constantRoute';
import { useTranslation } from 'react-i18next';
import { Icon } from '@mui/material';

const IconWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <Icon className="text-accent" style={{ fontSize: '1.2rem' }}>
      {children}
    </Icon>
  );
};

const SidebarItem = () => {
  const { t } = useTranslation();

  const menus = [
    {
      groupTitle: t(`${ROUTE.admin.locale}.title`),
      menu: [
        {
          label: t(`${ROUTE.admin.main.locale}.title`),
          href: ROUTE.admin.main.fullPath,
          icon: <IconWrap>{ROUTE.admin.main.icon}</IconWrap>,
        },
        {
          label: t(`${ROUTE.admin.certificate.locale}.title`),
          href: ROUTE.admin.certificate.fullPath,
          icon: <IconWrap>{ROUTE.admin.certificate.icon}</IconWrap>,
        },
        {
          label: t(`${ROUTE.admin.blog.locale}.title`),
          href: ROUTE.admin.blog.fullPath,
          icon: <IconWrap>{ROUTE.admin.blog.icon}</IconWrap>,
        },
        {
          label: t(`${ROUTE.admin.projectCategory.locale}.title`),
          href: ROUTE.admin.projectCategory.fullPath,
          icon: <IconWrap>{ROUTE.admin.projectCategory.icon}</IconWrap>,
        },
        {
          label: t(`${ROUTE.admin.project.locale}.title`),
          href: ROUTE.admin.project.fullPath,
          icon: <IconWrap>{ROUTE.admin.project.icon}</IconWrap>,
        },
      ],
    },
  ];

  return {
    menus,
  };
};

export default SidebarItem;
