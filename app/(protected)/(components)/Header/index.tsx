import Link from 'next/link';
import DropdownUser from './DropdownUser';
import Image from 'next/image';
import { Moon, Sun } from 'react-feather';

const Header = (props: {
    sidebarOpen: string | boolean | undefined;
    setSidebarOpen: (arg0: boolean) => void;
    theme: string;
    setTheme: (theme: string) => void;
}) => {
    const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        props.setTheme(checked ? 'dark' : 'light');
    };

    return (
        <header className="sticky bg-white dark:bg-black text-black dark:text-white top-0 z-[1] flex w-full shadow-md ">
            <div className="flex flex-grow items-center justify-between px-4 py-5 shadow-2 md:px-5 2xl:px-10">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSidebarOpen(!props.sidebarOpen);
                        }}
                        className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-dark-3 dark:bg-dark-2 lg:hidden"
                    >
                        <span className="relative block h-5.5 w-5.5 cursor-pointer">
                            <span className="du-block absolute right-0 h-full w-full">
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-[0] duration-200 ease-in-out dark:bg-white ${
                                        !props.sidebarOpen &&
                                        '!w-full delay-300'
                                    }`}
                                ></span>
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-150 duration-200 ease-in-out dark:bg-white ${
                                        !props.sidebarOpen &&
                                        'delay-400 !w-full'
                                    }`}
                                ></span>
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-dark delay-200 duration-200 ease-in-out dark:bg-white ${
                                        !props.sidebarOpen &&
                                        '!w-full delay-500'
                                    }`}
                                ></span>
                            </span>
                            <span className="absolute right-0 h-full w-full rotate-45">
                                <span
                                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-dark delay-300 duration-200 ease-in-out dark:bg-white ${
                                        !props.sidebarOpen && '!h-0 !delay-[0]'
                                    }`}
                                ></span>
                                <span
                                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-dark duration-200 ease-in-out dark:bg-white ${
                                        !props.sidebarOpen && '!h-0 !delay-200'
                                    }`}
                                ></span>
                            </span>
                        </span>
                    </button>
                    {/* <!-- Hamburger Toggle BTN --> */}

                    <Link className="block flex-shrink-0 lg:hidden" href="/">
                        Kojidev Dashboard
                    </Link>
                </div>

                <div className="hidden xl:block">
                    <div>
                        <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
                            Dashboard
                        </h1>
                        <p className="font-medium">
                            Welcome to Kojidev Dashboard
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
                    <ul className="flex items-center gap-2 2xsm:gap-4">
                        <div className="flex-col flex">
                            <ul className="menu menu-horizontal">
                                <li>
                                    <label className="swap swap-rotate">
                                        <input
                                            type="checkbox"
                                            onChange={handleTheme}
                                            checked={props.theme === 'dark'}
                                        />
                                        {props.theme === 'light' ? (
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

                                        {props.theme === 'dark' ? (
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
                    </ul>

                    {/* <!-- User Area --> */}
                    <DropdownUser />
                    {/* <!-- User Area --> */}
                </div>
            </div>
        </header>
    );
};

export default Header;
