import React from 'react';
import Navbar from '../Header/Navbar';
import Footer from '../Footer/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="p-1 bg-gradient-to-r from-primary via-secondary to-accent w-full fixed z-50 top-0"></div>
      <header className="max-w-screen-md">
        <Navbar />
      </header>

      <main className="min-h-screen">{children}</main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AppLayout;
