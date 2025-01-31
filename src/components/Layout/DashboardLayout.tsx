import React from 'react';
import SidebarContainer from '../Sidebar/SidebarContainer';
import PageHeader from '../Header/PageHeader';
import Header from '../Header/DashboardHeader';
import { cn } from '../../libs/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div
      className={cn(
        'rounded-md flex flex-col md:flex-row w-full md:flex-1 mx-auto border border-neutral-200 dark:border-neutral-700',
        'lg:h-screen overflow-x-hidden'
      )}
    >
      <SidebarContainer />

      <div className="lg:flex lg:flex-1 flex-col overflow-hidden">
        <div className="md:rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-base-100 flex flex-col gap-2 flex-1 w-full h-full">
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-auto">
            <Header />
            <main className="max-w-screen">
              <div className="mx-auto max-w-screen-2xl p-4 md:p-8 2xl:p-10 md:mt-14">
                <PageHeader />
                <div className="mt-4 max-w-full">{children}</div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
