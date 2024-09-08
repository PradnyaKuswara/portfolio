// page.tsx
import { Metadata } from 'next';
import BlogDetail from './blog';
import { showData } from '@/app/(protected)/utils/data';

export const fetchArticleData = async (slug: string) => {
    const dataFetch = await showData(
        `${process.env.NEXT_PUBLIC_API_FETCH}/articles-front/${slug}`
    );

    return dataFetch;
};

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const article: Article = await fetchArticleData(params.slug);
    return {
        title: article.title,
        description: article.meta_desc,
        keywords: article.meta_keyword?.split(','),
    };
}

const BlogDetailPage = async({ params }: { params: { slug: string } }) => {
    const article: Article = await fetchArticleData(params.slug);

    return (
        <div className="min-h-screen py-36 lg:py-36 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto">
            <BlogDetail article={article}  />
        </div>
    );
};

export default BlogDetailPage;
