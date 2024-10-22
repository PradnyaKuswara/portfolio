"use client";

import Link from "next/link";
import React from "react";
import { Moon, Sun } from "react-feather";
import { useTheme } from "@/app/providers/theme-provider";
import { useRouter, usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [scrollPosition, setScrollPosition] = React.useState<number>(0);
  const [currentUrl, setCurrentUrl] = React.useState<string>("");
  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const pathname = usePathname();

  const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setTheme(checked ? "dark" : "light");
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    setCurrentUrl(pathname);
  }, [pathname]);

  return (
    <div
      className={`navbar fixed px-4 lg:px-0 py-4 lg:py-2 z-[2] top-0 shadow-sm flex justify-between lg:justify-around ${
        scrollPosition > 0
          ? "bg-[#FFFFFF] dark:bg-[#030712] "
          : "bg-transparent"
      } transition-all duration-300 `}
    >
      <div className="flex items-center">
        <ul className="flex flex-row gap-2 lg:gap-4">
          <li
            className={`p-2 hover:bg-primary hover:text-white hover:rounded-md text-sm 
            ${currentUrl == "/" ? "bg-primary text-white rounded-md" : ""}`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`p-2 hover:bg-primary hover:text-white hover:rounded-md text-sm 
            ${
              currentUrl == "/about" ? "bg-primary text-white rounded-md" : ""
            }`}
          >
            <Link href="/about">About</Link>
          </li>
          <li
            className={`p-2 hover:bg-primary hover:text-white hover:rounded-md text-sm 
            ${
              currentUrl == "/projects" || currentUrl == "/projects/:slug"
                ? "bg-primary text-white rounded-md"
                : ""
            }`}
          >
            <Link href="/projects">Project</Link>
          </li>
          <li
            className={`p-2 hover:bg-primary hover:text-white hover:rounded-md text-sm 
            ${
              currentUrl == "/blogs" || currentUrl == "/blogs/:slug"
                ? "bg-primary text-white rounded-md"
                : ""
            }`}
          >
            <Link href="/blogs">Blog</Link>
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
    </div>
  );
};

export default Navbar;
