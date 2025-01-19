import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Icon } from '@mui/material';
import { mappingSearch } from '../../shared/constants/constantMappingSearch';
import { getLocalizedText } from '../../helpers/localize';

const PageSearchFilter = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filteredPages, setFilteredPages] = useState<
    {
      name: string;
      fullPath: string;
      path: string;
      locale: string;
      description: string;
      icon: string;
      keys: string[];
    }[]
  >([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { t } = useTranslation();

  const pages = mappingSearch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const results = pages.filter((page) =>
        page.keys.some((key) => key.toLowerCase().includes(value.toLowerCase()))
      );
      const uniqueResults = Array.from(
        new Map(results.map((item) => [item.fullPath, item])).values()
      );
      setFilteredPages(uniqueResults);
      setHighlightIndex(uniqueResults.length > 0 ? 0 : -1);
    } else {
      const defaultPages = pages.slice(0, 5);
      setFilteredPages(defaultPages);
      setHighlightIndex(defaultPages.length > 0 ? 0 : -1);
    }
  };

  const handleFocus = () => {
    if (!query) {
      const defaultPages = pages.slice(0, 5);
      setFilteredPages(defaultPages);
      setHighlightIndex(defaultPages.length > 0 ? 0 : -1);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path); // Navigasi ke halaman yang dipilih
    setQuery(''); // Reset query pencarian
    setFilteredPages([]); // Reset hasil pencarian
    setHighlightIndex(-1); // Reset indeks yang disorot
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredPages.length === 0) return;

    if (filteredPages.length > 1) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % filteredPages.length;
          scrollToHighlighted(nextIndex);
          return nextIndex;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightIndex((prevIndex) => {
          const nextIndex =
            (prevIndex - 1 + filteredPages.length) % filteredPages.length;
          scrollToHighlighted(nextIndex);
          return nextIndex;
        });
      } else if (e.key === 'Enter' && highlightIndex >= 0) {
        e.preventDefault();
        handleNavigate(filteredPages[highlightIndex].fullPath); // Menavigasi ke halaman yang disorot
      }
    } else if (
      e.key === 'Enter' &&
      highlightIndex >= 0 &&
      filteredPages[highlightIndex]
    ) {
      e.preventDefault();
      handleNavigate(filteredPages[highlightIndex].fullPath); // Menavigasi ke halaman yang disorot
    }
  };

  const scrollToHighlighted = (index: number) => {
    const listElement = listRef.current;
    const itemElement = listElement?.children[index] as HTMLLIElement;
    if (itemElement) {
      itemElement.scrollIntoView({ block: 'nearest' });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFilteredPages([]);
        setHighlightIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative lg:block" ref={dropdownRef}>
        <label className="input input-bordered rounded-sm flex items-center gap-2 input-sm w-full lg:w-[30rem]">
          <input
            type="text"
            className="grow"
            placeholder="Search pages..."
            value={query}
            onChange={handleSearch}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <ul
        ref={listRef}
        className="absolute z-10 mt-2 w-full max-w-[90%] lg:max-w-[30rem] left-1/2 lg:left-4 transform -translate-x-1/2 lg:-translate-x-0 shadow-lg bg-white dark:bg-gray-800 rounded-md max-h-72 overflow-y-auto"
      >
        {filteredPages.map((page, index) => (
          <li
            key={page.fullPath}
            className={`flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
              index === highlightIndex
                ? 'bg-secondary text-secondary-content'
                : ''
            }`}
            onClick={() => handleNavigate(page.fullPath)}
          >
            <div>
              <Icon
                className={
                  index === highlightIndex ? 'text-white' : 'text-secondary'
                }
                style={{ fontSize: '1.4rem' }}
              >
                {page.icon}
              </Icon>
            </div>

            <div>
              <h1
                className={`text-base font-semibold ${
                  index === highlightIndex ? 'text-base-100' : 'text-secondary'
                }`}
              >
                {getLocalizedText(
                  t,
                  `${page?.locale}.title`,
                  page?.name || 'Default Title'
                )}
              </h1>
              <p
                className={`text-sm ${
                  index === highlightIndex ? 'text-base-100' : 'text-secondary'
                }`}
              >
                {getLocalizedText(
                  t,
                  `${page?.locale}.description`,
                  page?.description || 'Default Description'
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PageSearchFilter;
