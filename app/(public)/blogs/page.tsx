import { Metadata } from 'next';
import FetchBlogs from './fetch';

export const metadata: Metadata = {
    title: 'Blog',
};

const NewsPage = () => {
    return (
        <>
            <div className="min-h-screen py-36 lg:py-36 max-w-screen-xl lg:px-24 mx-4 lg:mx-auto">
                <h1
                    className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text "
                    data-aos="fade-right"
                    data-aos-delay="100"
                >
                    My Blogs
                </h1>
                <p className="mt-2" data-aos="fade-right" data-aos-delay="100">
                    List of my blogs{' '}
                </p>

                <section data-aos="fade-up" data-aos-delay="100">
                    <FetchBlogs></FetchBlogs>
                </section>
            </div>
        </>
    );
};

export default NewsPage;
