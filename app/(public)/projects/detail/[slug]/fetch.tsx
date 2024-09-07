'use client';

import { showData } from '@/app/(protected)/utils/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GitHub, Link2, User } from 'react-feather';

type ProjectCategory = {
    id: bigint;
    uuid: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

type Project = {
    id: bigint;
    uuid: string;
    project_category_id: bigint;
    title: string;
    image: string;
    slug: string;
    description: string;
    stack: string;
    link_github: string | null;
    link_project: string | null;
    link_documentation: string | null;
    is_active: boolean;
    meta_desc: string;
    meta_keyword: string | null;
    createdAt: Date;
    updatedAt: Date;

    ProjectCategory: ProjectCategory;
};

interface FetchProjectDetailProps {
    slug: string;
}

export default function FetchProjectDetail({ slug }: FetchProjectDetailProps) {
    const [project, setProject] = React.useState<Project | undefined>(
        undefined
    );

    React.useEffect(() => {
        const fetchData = async () => {
            const dataFetch = await showData(
                `${process.env.NEXT_PUBLIC_API_FETCH}/projects-front/${slug}`
            );

            setProject(dataFetch);
        };

        fetchData();
    }, [slug]);

    if (!project) return <div>Loading...</div>;

    return (
        <>
            <section className="grid grid-cols-12 mx-auto  gap-4">
                <div className="col-span-12 flex justify-center">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${project.image}`}
                        alt={`${project.title}`}
                        className="rounded-sm aspect-video"
                        width={1000}
                        height={1000}
                    ></Image>
                </div>
                <div className="col-span-12 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl night:text-red font-extrabold">
                            {project.title}
                        </h1>
                        <div className="badge badge-secondary p-4 badge-outline">
                            <span className="text-xs">
                                {project.ProjectCategory.name}
                            </span>
                        </div>
                    </div>
                    <p className="leading-7 lg:leading-7 max-w-xl">
                        Self-hostable branded link shortener built with Next.js
                        & Notion API
                    </p>
                    <div className="flex flex-row mt-2 gap-2">
                        <div className="flex items-center gap-2">
                            <User width={16} height={16} />
                            <Link href="#">Pradnya Kuswara</Link>
                        </div>

                        {project.link_github &&
                        project.link_github != 'null' ? (
                            <>
                                <div>-</div>
                                <div className="flex items-center gap-2 underline">
                                    <GitHub width={16} height={16} />
                                    <Link href={project.link_github}>
                                        Repository
                                    </Link>
                                </div>
                            </>
                        ) : null}

                        {project.link_project &&
                        project.link_project != 'null' ? (
                            <>
                                <div>-</div>
                                <div className="flex items-center gap-2 underline">
                                    <Link2 width={16} height={16} />
                                    <Link href={project.link_project}>
                                        Project
                                    </Link>
                                </div>
                            </>
                        ) : null}

                        {project.link_documentation &&
                        project.link_documentation != 'null' ? (
                            <>
                                <div>-</div>
                                <div className="flex items-center gap-2 underline">
                                    <Link2 width={16} height={16} />
                                    <Link href={project.link_documentation}>
                                        Documentation
                                    </Link>
                                </div>
                            </>
                        ) : null}
                    </div>
                    <div className="border-t mt-2"></div>
                    {/* use dangerhtml */}
                    <div
                        dangerouslySetInnerHTML={{
                            __html: project.description,
                        }}
                    ></div>
                </div>
            </section>
        </>
    );
}
