import { Metadata } from 'next';
import FetchProjectDetail from './fetch';

export const metadata: Metadata = {
    title: 'Detail Project',
};

const ProjectDetailPage = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;

    return (
        <>
            <div className="min-h-screen py-36 lg:py-36 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto">
                <FetchProjectDetail slug={slug}></FetchProjectDetail>
            </div>
        </>
    );
};

export default ProjectDetailPage;
