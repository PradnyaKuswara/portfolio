'use client';

import { cn } from '@/app/lib/utils';
import {
    LaravelOriginal,
    ReactOriginal,
    NextjsOriginal,
    NodejsOriginal,
    MysqlOriginal,
    PhpOriginal,
} from 'devicons-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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

export const HoverEffectProject = ({
    items,
    className,
}: {
    items: Project[];
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const limitdesc = (desc: string) => {
        return desc.length > 70 ? desc.slice(0, 70) + '...' : desc;
    };

    const stackTech = (stack: string) => {
        return stack.split(',');
    };

    return (
        <div
            className={cn(
                'grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-6',
                className
            )}
        >
            {items.map((item, idx) => (
                <Link
                    href={`/projects/detail/${item.slug}`}
                    key={idx}
                    className="relative group  block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8]  block  rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: {
                                        duration: 0.15,
                                        delay: 0.2,
                                    },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card>
                        <div className="flex justify-between">
                            <div className="badge badge-secondary text-xs text-secondary-content">
                                {item.ProjectCategory.name}
                            </div>
                            <div className="flex gap-2">
                                <div className="rounded-full bg-primary w-3 h-3"></div>
                                <div className="rounded-full bg-primary w-3 h-3"></div>
                                <div className="rounded-full bg-primary w-3 h-3"></div>
                            </div>
                        </div>
                        <CardTitle>{item.title}</CardTitle>

                        <CardDescription>
                            <p
                                className={cn(
                                    'mt-2 tracking-wide leading-normal text-sm',
                                    className
                                )}
                            >
                                {limitdesc(item.meta_desc)}
                            </p>

                            <div className="flex justify-start gap-2 mt-2">
                                {stackTech(item.stack).map((stack, idx) => (
                                    <div key={idx}>
                                        {stack.trim() == 'React' ? (
                                            <ReactOriginal
                                                size={20}
                                                className="text-blue-500"
                                            />
                                        ) : stack.trim() == 'Next.js' ? (
                                            <NextjsOriginal
                                                size={20}
                                                className="text-red-500"
                                            />
                                        ) : stack.trim() == 'Laravel' ? (
                                            <LaravelOriginal
                                                size={20}
                                                className="text-red-500"
                                            />
                                        ) : stack.trim() == 'PHP' ? (
                                            <PhpOriginal
                                                size={20}
                                                className="text-blue-500"
                                            />
                                        ) : stack.trim() == 'Node.js' ? (
                                            <NodejsOriginal
                                                size={20}
                                                className="text-green-500"
                                            />
                                        ) : stack.trim() == 'MySQL' ? (
                                            <MysqlOriginal
                                                size={20}
                                                className="text-blue-500"
                                            />
                                        ) : (
                                            stack
                                        )}
                                    </div>
                                ))}
                            </div>

                            <figure className="mt-3">
                                <Image
                                    src={`http://localhost:8080/${item.image}`}
                                    alt=""
                                    width={400}
                                    height={100}
                                    className="aspect-video"
                                />
                            </figure>
                        </CardDescription>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export const Card = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                'rounded-lg h-full w-full  overflow-hidden  border border-base-300 dark:border-gray-500  relative z-20 ',
                className
            )}
        >
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};
export const CardTitle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <>
            <h4 className={cn(' font-extrabold tracking-wide mt-2', className)}>
                {children}
            </h4>
        </>
    );
};
export const CardDescription = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return <>{children}</>;
};
