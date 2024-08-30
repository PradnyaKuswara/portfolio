'use client';

import Link from 'next/link';
import React from 'react';
import { Moon, Sun } from 'react-feather';

interface NavbarProps {
    theme: string;
    setTheme: (theme: string) => void;
}

const Navbar = ({ theme, setTheme }: NavbarProps) => {
    const [scrollPosition, setScrollPosition] = React.useState(0);

    const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setTheme(checked ? 'dark' : 'light');
    };

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`navbar fixed px-4 lg:px-0 py-4 lg:py-2 z-[2] top-0 shadow-sm flex justify-between lg:justify-around ${
                scrollPosition > 0
                    ? 'bg-[#FFFFFF] dark:bg-[#000000] '
                    : 'bg-transparent'
            } transition-all duration-300 `}
        >
            <div className="flex items-center">
                <ul className="flex flex-row gap-2 lg:gap-4">
                    <li className="p-2 hover:bg-primary hover:text-white hover:rounded-md text-sm">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="p-2 hover:bg-primary hover:text-white hover:rounded-md text-sm">
                        <Link href="/about">About</Link>
                    </li>
                    <li className="p-2 hover:bg-primary hover:text-white hover:rounded-md text-sm">
                        <Link href="/projects">Project</Link>
                    </li>
                    <li className="p-2 hover:bg-primary hover:text-white hover:rounded-md text-sm">
                        <Link href="/blogs">Blogs</Link>
                    </li>
                </ul>
            </div>

            <div className="flex-col flex">
                <ul className="menu menu-horizontal">
                    <li>
                        <label className="swap swap-rotate">
                            <input
                                type="checkbox"
                                onChange={handleTheme}
                                checked={theme === 'dark'}
                            />
                            {theme === 'light' ? (
                                <Sun
                                    color="#ff6e00"
                                    className="swap-off h-4 w-4"
                                />
                            ) : (
                                <Moon
                                    color="#0069FF"
                                    className="swap-on h-4 w-4"
                                />
                            )}

                            {theme === 'dark' ? (
                                <Moon
                                    color="#0069FF"
                                    className="swap-off h-4 w-4"
                                />
                            ) : (
                                <Sun
                                    color="#ff6e00"
                                    className="swap-on h-4 w-4"
                                />
                            )}
                        </label>
                    </li>
                </ul>
            </div>

            {/* <div className="flex justify-between items-center lg:hidden">
                <label className="swap swap-rotate">
                    <input
                        type="checkbox"
                        onChange={handleTheme}
                        checked={theme === 'night'}
                    />
                    {theme === 'winter' ? (
                        <Sun color="#ff6e00" className="swap-off h-6 w-6" />
                    ) : (
                        <Moon color="#0069FF" className="swap-on h-6 w-6" />
                    )}

                    {theme === 'night' ? (
                        <Moon color="#0069FF" className="swap-off h-6 w-6" />
                    ) : (
                        <Sun color="#ff6e00" className="swap-on h-6 w-6" />
                    )}
                </label>
                <div className="dropdown lg:hidden dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2"
                    >
                        <li>
                            <div className="flex items-center">
                                <Link href="/#about" className="text-sm">
                                    About
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <Link href="/#portfolio" className="text-sm">
                                    Portfolio
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <Link href="#news" className="text-sm">
                                    News
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <Link href="/#contact" className="text-sm">
                                    Contact
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div> */}
        </div>
    );
};

export default Navbar;
