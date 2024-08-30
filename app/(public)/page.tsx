'use client';

import HeroSection from './(components)/hero';

function HomePage() {
    return (
        <>
            <HeroSection></HeroSection>
            <div className="max-w-screen-lg mx-6 lg:mx-auto pt-0 pb-10 lg:pt-20 lg:pb-20 ">
                <section
                    className="flex flex-col justify-center items-center text-center gap-4 mt-20"
                    data-aos="fade-up"
                >
                    <div className="badge badge-primary">
                        <span className="text-xs">Featured</span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl night:text-red font-extrabold">
                        I Like Building Things
                    </h1>
                    <p className="leading-7 lg:leading-7 max-w-xl text-sm">
                        During my free time, I like to build things that I find
                        interesting. I like to learn new things and experiment
                        with new technologies. I like to build things that I can
                        use in my daily life. I like to build things that I can
                        share with others.
                    </p>
                </section>

                {/* <section
                    id="featured-projects"
                    className="mt-20"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text ">
                        Featured Projects
                    </h1>
                    <HoverEffectProject items={projects} />
                    <div className="flex justify-end">
                        <Link href="" className="btn btn-sm btn-primary  ">
                            <span>View All Projects</span>
                            <ArrowRight></ArrowRight>
                        </Link>
                    </div>
                </section>

                <section
                    id="newest-blogs"
                    data-aos="fade-up"
                    data-aos-delay="400"
                    className="mt-20"
                >
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent inline-block text-transparent bg-clip-text ">
                        Newest Blogs
                    </h1>
                    <HoverEffectBlog items={projects} />
                    <div className="flex justify-end">
                        <Link href="" className="btn btn-sm btn-primary">
                            View All Blogs
                            <ArrowRight></ArrowRight>
                        </Link>
                    </div>
                </section> */}
            </div>
        </>
    );
}

export default HomePage;
