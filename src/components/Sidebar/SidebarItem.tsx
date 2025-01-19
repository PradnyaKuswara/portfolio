import { ROUTE } from '../../shared/constants/constantRoute';
import { useTranslation } from 'react-i18next';
import { Icon } from '@mui/material';

const IconWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <Icon className="text-secondary" style={{ fontSize: '1.2rem' }}>
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
      ],
    },
    // {
    //   groupTitle: t(`${ROUTE.merchant.management.locale}.title`),
    //   menu: [
    //     {
    //       label: t(`${ROUTE.merchant.management.product.locale}.title`),
    //       href: ROUTE.merchant.management.product.fullPath,
    //       icon: <IconWrap>{ROUTE.merchant.management.product.icon}</IconWrap>,
    //     },
    //     {
    //       label: t(`${ROUTE.merchant.management.order.locale}.title`),
    //       href: ROUTE.merchant.management.order.fullPath,
    //       icon: <IconWrap>{ROUTE.merchant.management.order.icon}</IconWrap>,
    //     },
    //     {
    //       label: t(`${ROUTE.merchant.management.customer.locale}.title`),
    //       href: ROUTE.merchant.management.customer.fullPath,
    //       icon: <IconWrap>{ROUTE.merchant.management.customer.icon}</IconWrap>,
    //     },
    //     {
    //       label: t(`${ROUTE.merchant.management.shipment.locale}.title`),
    //       href: ROUTE.merchant.management.shipment.fullPath,
    //       icon: <IconWrap>{ROUTE.merchant.management.shipment.icon}</IconWrap>,
    //     },
    //     {
    //       label: t(`${ROUTE.merchant.management.transaction.locale}.title`),
    //       href: ROUTE.merchant.management.transaction.fullPath,
    //       icon: (
    //         <IconWrap>{ROUTE.merchant.management.transaction.icon}</IconWrap>
    //       ),
    //       children: [
    //         {
    //           label: t(
    //             `${ROUTE.merchant.management.transaction.refund.locale}.title`
    //           ),
    //           href: ROUTE.merchant.management.transaction.refund.fullPath,
    //           icon: (
    //             <IconWrap>
    //               {ROUTE.merchant.management.transaction.refund.icon}
    //             </IconWrap>
    //           ),
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   groupTitle: t(`${ROUTE.merchant.sales.locale}.title`),
    //   menu: [
    //     {
    //       label: t(`${ROUTE.merchant.sales.discount.locale}.title`),
    //       href: ROUTE.merchant.sales.discount.fullPath,
    //       icon: <IconWrap>{ROUTE.merchant.sales.discount.icon}</IconWrap>,
    //     },
    //     {
    //       label: t(`${ROUTE.merchant.sales.voucher.locale}.title`),
    //       href: ROUTE.merchant.sales.voucher.fullPath,
    //       icon: <IconWrap>{ROUTE.merchant.sales.voucher.icon}</IconWrap>,
    //     },
    //   ],
    // },
    // {
    //   groupTitle: t(`${ROUTE.merchant.notification.locale}.title`),
    //   menu: [
    //     {
    //       label: t(`${ROUTE.merchant.notification.email.locale}.title`),
    //       href: ROUTE.merchant.notification.email.fullPath,
    //       icon: <IconWrap>{ROUTE.merchant.notification.email.icon}</IconWrap>,
    //     },
    //     {
    //       label: t(`${ROUTE.merchant.notification.sms.locale}.title`),
    //       href: ROUTE.merchant.notification.sms.fullPath,
    //       icon: <IconWrap>{ROUTE.merchant.notification.sms.icon}</IconWrap>,
    //     },
    //   ],
    // },
  ];

  return {
    menus,
  };
};

export default SidebarItem;
