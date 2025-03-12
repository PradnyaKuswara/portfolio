import React from 'react';
import { Moon, Sun } from 'react-feather';
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import useLocalStorage from '../../hooks/useLocalStorage';
// import { KEY } from '../../shared/constants/constantStorage';
import { ROUTE } from '../../shared/constants/constantRoute';

const Navbar: React.FC = () => {
  const [scrollPosition, setScrollPosition] = React.useState<number>(0);
  // const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const [currentUrl, setCurrentUrl] = React.useState<string>('');
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const {  t } = useTranslation();
  // const storage = useLocalStorage();
  // const language = storage.getLocalStorage(KEY.localStorage.locale.name);
  // const dropdownLanguage = useRef<HTMLUListElement>(null);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  // const changeLanguage = (lang: string) => {
  //   i18n.changeLanguage(lang);
  //   storage.setLocalStorage(KEY.localStorage.locale.name, lang);
  //   setDropdownOpen(false);
  // };

  // const toggleDropdown = () => {
  //   setDropdownOpen(!isDropdownOpen);
  // };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location.pathname]);

  // React.useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownLanguage.current &&
  //       !dropdownLanguage.current.contains(event.target as Node)
  //     ) {
  //       setDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  return (
    <div
      className={`navbar fixed px-4 lg:px-0 py-4 lg:py-2 z-[2] top-0 shadow-sm flex justify-between lg:justify-around ${
        scrollPosition > 0
          ? 'bg-[#FFFFFF] dark:bg-[#030712] '
          : 'bg-transparent'
      } transition-all duration-300 `}
    >
      <div className="flex items-center">
        <ul className="flex flex-row gap-2 lg:gap-4">
          <li
            className={`p-2 hover:bg-primary hover:text-white hover:rounded-md text-sm 
            ${currentUrl == '/' ? 'bg-primary text-white rounded-md' : ''}`}
          >
            <Link to={ROUTE.home.fullPath}>
              {t(`${ROUTE.home.locale}.title`)}
            </Link>
          </li>
          <li
            className={`p-2 hover:bg-primary hover:text-white hover:rounded-md text-sm 
            ${
              currentUrl == '/about' ? 'bg-primary text-white rounded-md' : ''
            }`}
          >
            <Link to={ROUTE.about.fullPath}>
              {t(`${ROUTE.about.locale}.title`)}
            </Link>
          </li>
          <li
            className={`p-2 hover:bg-primary hover:text-white hover:rounded-md text-sm 
            ${
              currentUrl == '/projects' || currentUrl == '/projects/:slug'
                ? 'bg-primary text-white rounded-md'
                : ''
            }`}
          >
            <Link to={ROUTE.project.fullPath}>
              {t(`${ROUTE.project.locale}.title`)}
            </Link>
          </li>
          <li
            className={`p-2 hover:bg-primary hover:text-white hover:rounded-md text-sm 
            ${
              currentUrl == '/blogs' || currentUrl == '/blogs/:slug'
                ? 'bg-primary text-white rounded-md'
                : ''
            }`}
          >
            <Link to={ROUTE.blog.fullPath}>
              {t(`${ROUTE.blog.locale}.title`)}
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-col flex">
        <ul className="menu menu-horizontal">
          {/* <li>
            <button
              className="btn btn-secondary btn-sm w-full flex items-center justify-between"
              type="button"
              onClick={toggleDropdown}
            >
              {language === 'id' ? (
                <span className="flag flag-country-id"></span>
              ) : language === 'ja' ? (
                <span className="flag flag-country-jp"></span>
              ) : (
                <span className="flag flag-country-gb"></span>
              )}
            </button>

            {isDropdownOpen && (
              <ul
                ref={dropdownLanguage}
                className="absolute right-1 z-10 border bg-base-100 rounded shadow mt-2 min-w-full"
              >
                <li
                  className="flex  gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => changeLanguage('en')}
                >
                  <span className="flag flag-country-gb"></span> English
                </li>
                <li
                  className="flex gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => changeLanguage('id')}
                >
                  <span className="flag flag-country-id"></span> Bahasa
                  Indonesia
                </li>
                <li
                  className="flex gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => changeLanguage('ja')}
                >
                  <span className="flag flag-country-jp"></span> 日本語
                </li>
              </ul>
            )}
          </li> */}
          <li>
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === 'dark'}
              />
              {theme === 'light' ? (
                <Sun color="#ff6e00" className="swap-off h-4 w-4" />
              ) : (
                <Moon color="#0069FF" className="swap-on h-4 w-4" />
              )}

              {theme === 'dark' ? (
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
