import { Metadata } from 'next';
import AllProjects from './all-project';

export const metadata: Metadata = {
    title: 'Project',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://pradnyakuswara.vercel.app/projects',
        title: 'Project | Pradnya Kuswara',
        description: 'List of my projects',
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

const PortfoliosPage = () => {
    return (
        <>
            <div className="min-h-screen py-36 lg:py-36 max-w-screen-xl lg:px-24 mx-4 lg:mx-auto">
                <h1
                    className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text "
                    data-aos="fade-right"
                    data-aos-delay="100"
                >
                    My Projects
                </h1>
                <p className="mt-2" data-aos="fade-right" data-aos-delay="100">
                    Showcase of my works{' '}
                </p>
                <section data-aos="fade-up" data-aos-delay="100">
                    <AllProjects></AllProjects>
                </section>
            </div>
        </>
    );
};

export default PortfoliosPage;
