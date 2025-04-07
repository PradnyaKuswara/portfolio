import React, { useEffect } from 'react';
import useBlogDetailViewModel from './useBlogDetailViewModel';
import { useLoadingBar } from 'react-top-loading-bar';
import { useParams } from 'react-router-dom';
import Metadata from '../../../../components/Metadata';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blog, isValidating } = useBlogDetailViewModel(slug);
  const { start, complete } = useLoadingBar();

  useEffect(() => {
    if (isValidating) {
      start();
    } else {
      complete();
    }
  }, [isValidating, start, complete]);
  return (
    <React.Fragment>
      <Metadata>
        <title>{blog?.data?.title}</title>
      </Metadata>
      <div className="min-h-screen py-28 lg:py-36 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            {blog?.data?.title}
          </h1>
          <img src={blog?.data?.thumbnail} alt={blog?.data?.title} />
          <p
            className="mt-2 leading-relaxed"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            {blog?.data?.description}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BlogDetail;
