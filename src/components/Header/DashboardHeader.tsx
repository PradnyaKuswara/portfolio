import { useTheme } from '../../hooks/useTheme';
import PageSearchFilter from '../Filter/PageSearchFilter';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="hidden lg:flex fixed bg-white dark:bg-black text-black dark:text-white top-0 z-[10]  w-full  border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-3  md:px-5 2xl:px-10 w-11/12">
        <div>
          <PageSearchFilter />
        </div>

        <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-end xl:w-auto xl:justify-normal">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <div className="flex-col flex">
              <ul className="menu menu-horizontal">
                <li>
                  <label className="flex cursor-pointer gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
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
                    <input
                      type="checkbox"
                      value={theme}
                      className="toggle toggle-sm theme-controller"
                      onChange={toggleTheme}
                      checked={theme === 'dark'}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
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
                </li>
              </ul>
            </div>
          </ul>

          {/* <!-- User Area --> */}
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
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
