"use client";

import Link from "next/link";
import DropdownUser from "./DropdownUser";
import { Moon, Sun } from "react-feather";
import { useTheme } from "@/app/providers/theme-provider";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setTheme(checked ? "dark" : "light");
  };

  return (
    <header className="fixed bg-white dark:bg-black text-black dark:text-white top-0 z-[1] flex w-screen shadow-sm px-10 ">
      <div className="flex flex-grow items-center justify-between px-4 py-3 shadow-2 md:px-5 2xl:px-10">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <Link className="block flex-shrink-0 lg:hidden" href="/">
            Kojidev Dashboard
          </Link>
        </div>

        <div className="hidden xl:block">
          <div>
            <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
              Dashboard
            </h1>
            <p className="font-medium">Welcome to Kojidev Dashboard</p>
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
                      checked={theme === "dark"}
                    />
                    {theme === "light" ? (
                      <Sun color="#ff6e00" className="swap-off h-4 w-4" />
                    ) : (
                      <Moon color="#0069FF" className="swap-on h-4 w-4" />
                    )}

                    {theme === "dark" ? (
                      <Moon color="#0069FF" className="swap-off h-4 w-4" />
                    ) : (
                      <Sun color="#ff6e00" className="swap-on h-4 w-4" />
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
