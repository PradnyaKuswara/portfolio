import { Metadata } from 'next';
import FetchArticleDetail from './fetch';

export const metadata: Metadata = {
    title: 'Detail Blog',
};

const BlogDetailPage = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;

    return (
        <>
            <div className="min-h-screen py-36 lg:py-36 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto">
                <FetchArticleDetail slug={slug}></FetchArticleDetail>
            </div>
        </>
    );
};

export default BlogDetailPage;
