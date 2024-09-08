'use client';

import { showData } from '@/app/(protected)/utils/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GitHub, Link2, User } from 'react-feather';

interface ProjectDetailProps {
    project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
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
                    <p className="leading-7 lg:leading-7 max-w-full">
                        {project.meta_desc}
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
