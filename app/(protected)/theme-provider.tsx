'use client';

import React from 'react';

import Header from './(components)/Header';
import Sidebar from './(components)/Sidebar';

const ThemeContext = React.createContext({
    theme: 'winter',
    setTheme: (theme: string) => {},
});

export const useTheme = () => React.useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [theme, setTheme] = React.useState(
        typeof window !== 'undefined'
            ? localStorage.getItem('theme') ?? 'light'
            : 'light'
    );

    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    React.useEffect(() => {
        localStorage.setItem('theme', theme);

        const localTheme = localStorage.getItem('theme');
        const htmlElement = document.querySelector('html');

        if (htmlElement && localTheme) {
            htmlElement.setAttribute('data-theme', localTheme);
        }
    }, [theme]);

    if (!isClient) {
        return null; // Atau bisa mengembalikan loading spinner atau apa pun
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {/* <DefaultLayout theme={theme} setTheme={setTheme}>
                {children}
            </DefaultLayout> */}
            {/* <!-- ===== Page Wrapper Star ===== --> */}
            <div className="flex h-screen overflow-hidden">
                {/* <!-- ===== Sidebar Star ===== --> */}
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Star ===== --> */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* <!-- ===== Header Star ===== --> */}
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        theme={theme}
                        setTheme={setTheme}
                    />
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Star ===== --> */}
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
