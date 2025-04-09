import React, { useEffect } from 'react';
import useBlogDetailViewModel from './useBlogDetailViewModel';
import { useLoadingBar } from 'react-top-loading-bar';
import { useParams } from 'react-router-dom';
import Metadata from '../../../../components/Metadata';
import MDXRenderer from '../../../../components/TextEditor/MDXRenderer';
import CTABlog from '../../../../components/Header/CTABlog';

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
      {blog?.data ? (
        <div className="min-h-screen py-28 lg:py-36 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1
              className="text-xl md:text-4xl font-bold mb-4"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              {blog?.data?.title}
            </h1>
            <p className="leading-relaxed">{blog?.data?.meta_desc}</p>
            <CTABlog blog={blog?.data} />
            <img src={blog?.data?.thumbnail} alt={blog?.data?.title} />
            <MDXRenderer code={blog?.data?.description}></MDXRenderer>
          </div>
        </div>
      ) : (
        <div className="min-h-screen py-28 lg:py-36 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto flex justify-center items-center">
          Blog not found, sorry.
        </div>
      )}
    </React.Fragment>
  );
};

export default BlogDetail;
