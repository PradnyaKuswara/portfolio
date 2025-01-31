import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { Link, LinkProps } from 'react-router-dom';

import { useTheme } from '../../hooks/useTheme';
import { SidebarContext } from '../../contexts/context';
import PageSearchFilter from '../Filter/PageSearchFilter';
import { Icon } from '@mui/material';
import { cn } from '../../libs/utils';
import { useSidebar } from '../../hooks/useSidebar';

interface Link {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  onClick?: () => void;
}

interface LinkWithChildren extends Link {
  children?: {
    label: string;
    href: string;
    icon: React.JSX.Element | React.ReactNode;
  }[];
}

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<'div'>)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          `h-full pl-4 py-4 hidden bg-base-100 md:flex md:flex-col w-[220px] flex-shrink-0 ${
            !open ? 'border-r border-gray-200 dark:border-gray-700' : ''
          }`,
          className
        )}
        animate={{
          width: animate ? (open ? '220px' : '65px') : '220px',
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => {
  const { open, setOpen } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div
        className={cn(
          'h-10 px-4 lg:px-8 py-8 flex flex-row md:hidden items-center justify-between bg-white dark:bg-black text-black dark:text-white top-0 z-[40]  shadow-md border-b border-gray-200 dark:border-gray-700 w-screen gap-4'
        )}
        {...props}
      >
        <div className="flex justify-start z-20 w-full">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)}
          />
        </div>

        <div>
          <PageSearchFilter />
        </div>

        <div>
          <label className="grid cursor-pointer place-items-center gap-2">
            <input
              type="checkbox"
              value={theme}
              className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
              onChange={toggleTheme}
              checked={theme === 'dark'}
            />
            <svg
              className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>
        <div>
          <div className="dropdown dropdown-end">
            <div className="flex items-center">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-8 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="text-xs">Admin</div>
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className={cn(
                'fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between',
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
}: {
  link: LinkWithChildren;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  const [isExpanded, setIsExpanded] = useState(false); // Untuk mengontrol submenu

  // Render item menu
  const renderLinkContent = () => {
    const hasChildren = link.children && link.children.length > 0;

    return (
      <>
        {/* Jika link memiliki children, tambahkan toggle expand */}
        <button
          onClick={() => {
            if (hasChildren) {
              setIsExpanded(!isExpanded);
            } else if (link.onClick) {
              link.onClick();
            }
          }}
          className="flex items-center justify-between gap-2 py-2 w-full"
        >
          <div className="flex items-center gap-2">
            {link.icon}
            <motion.span
              animate={{
                display: animate
                  ? open
                    ? 'inline-block'
                    : 'none'
                  : 'inline-block',
                opacity: animate ? (open ? 1 : 0) : 1,
              }}
              className="text-accent text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
            >
              {link.label}
            </motion.span>
          </div>
          {hasChildren && open && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="transition-transform duration-75"
            >
              <Icon>keyboard_arrow_up</Icon>
            </motion.div>
          )}
        </button>

        {/* Navigasi langsung jika tidak ada children */}
        {!hasChildren && !link.onClick && (
          <Link
            to={link.href}
            className="absolute inset-0 z-10"
            aria-label={link.label}
          />
        )}

        {/* Submenu untuk children */}
        {hasChildren && isExpanded && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pl-6 flex flex-col gap-2"
          >
            {link.children &&
              link.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className="flex items-center gap-2 py-1 text-sm text-secondary hover:text-primary transition"
                >
                  {child.icon}
                  <span>{child.label}</span>
                </Link>
              ))}
          </motion.div>
        )}
      </>
    );
  };

  return (
    <div className={cn('sidebar-link relative', className)}>
      {renderLinkContent()}
    </div>
  );
};
