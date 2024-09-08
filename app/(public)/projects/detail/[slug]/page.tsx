import { Metadata } from 'next';
import ProjectDetail from './project';
import { showData } from '@/app/(protected)/utils/data';

export const fetchArticleData = async (slug: string) => {
    const dataFetch = await showData(
        `${process.env.NEXT_PUBLIC_API_FETCH}/projects-front/${slug}`
    );

    return dataFetch;
};

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const project: Project = await fetchArticleData(params.slug);
    return {
        title: project.title,
        description: project.meta_desc,
        keywords: project.meta_keyword?.split(','),
    };
}

const ProjectDetailPage = async({ params }: { params: { slug: string } }) => {
    const project: Project = await fetchArticleData(params.slug);

    return (
        <>
            <div className="min-h-screen py-36 lg:py-36 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto">
                <ProjectDetail project={project}></ProjectDetail>
            </div>
        </>
    );
};

export default ProjectDetailPage;
