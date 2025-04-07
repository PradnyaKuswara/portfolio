import React, { useEffect } from 'react';
import useBlogViewModel from './useBlogViewModel';
import { HoverEffectBlog } from '../../components/UI/card-hover-effect-blog';
import MetadataBlogPage from './MetadataBlogPage';
import { useTranslation } from 'react-i18next';
import { useLoadingBar } from 'react-top-loading-bar';

const BlogPage: React.FC = () => {
  const {
    blogs,
    totalPages,
    currentPage,
    searchQuery,
    onPageChange,
    onSearchChange,
    isValidating,
  } = useBlogViewModel();

  const { start, complete } = useLoadingBar();

  useEffect(() => {
    if (isValidating) {
      start();
    } else {
      complete();
    }
  }, [isValidating, start, complete]);

  const { t } = useTranslation();

  return (
    <>
      <MetadataBlogPage />
      <div className="min-h-screen py-28 lg:py-36 max-w-screen-xl lg:px-24 mx-4 lg:mx-auto">
        <h1
          className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text "
          data-aos="fade-right"
          data-aos-delay="100"
        >
          {t('blog-page.section-blog.title')}
        </h1>
        <p className="mt-2" data-aos="fade-right" data-aos-delay="100">
          {t('blog-page.section-blog.title-2')}{' '}
        </p>

        <section data-aos="fade-up" data-aos-delay="100">
          <div className="mt-4">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder={t('words.search')}
                value={searchQuery}
                onChange={onSearchChange}
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
          {blogs && blogs.data.length > 0 ? (
            <div>
              {' '}
              <HoverEffectBlog items={blogs?.data} />{' '}
            </div>
          ) : (
            <div className="text-center text-lg font-bold mt-10">
              {' '}
              {t('blog-page.section-blog.not-found')} 😢{' '}
            </div>
          )}
          <div className="flex justify-center">
            {blogs && blogs.total > 6 && (
              <div className="join grid grid-cols-2">
                <button
                  className="join-item btn btn-outline"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {t('words.button.previous')}
                </button>
                <button
                  className="join-item btn btn-outline"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {t('words.button.next')}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;
