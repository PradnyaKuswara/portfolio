import { Metadata } from 'next';
import AllBlogs from './all-blog';

export const metadata: Metadata = {
    title: 'Blog',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://pradnyakuswara.vercel.app/blogs',
        title: 'Blog | Pradnya Kuswara',
        description: 'List of my blogs',
        images: [
            {
                url: 'https://pradnyakuswara.vercel.app/assets/images/logo.png',
                width: 1200,
                height: 630,
                alt: 'Pradnya Kuswara',
            },
        ],
    },
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
                    <AllBlogs></AllBlogs>
                </section>
            </div>
        </>
    );
};

export default NewsPage;
