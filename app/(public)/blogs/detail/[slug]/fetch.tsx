'use client';

import { showData } from '@/app/(protected)/utils/data';
import Image from 'next/image';
import React from 'react';
import { Clock, Copy, Share } from 'react-feather';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import toast from 'react-hot-toast';
import readingDuration from 'reading-duration';
import { notFound } from 'next/navigation';

type Tag = {
    id: bigint;
    uuid: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

type Article = {
    id: bigint;
    uuid: string;
    title: string;
    thumbnail: string;
    slug: string;
    content: string;
    meta_desc: string;
    meta_keyword: string | null;
    is_active: boolean;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
};

interface FetchArticleDetailProps {
    slug: string;
}

export default function FetchArticleDetail({ slug }: FetchArticleDetailProps) {
    const [article, setArticle] = React.useState<Article | undefined>(
        undefined
    );

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const readingTime = (content: string) => {
        return readingDuration(content, {
            wordsPerMinute: 200,
            emoji: false,
        });
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard');
    };

    React.useEffect(() => {
        const fetchData = async () => {
            const dataFetch = await showData(
                `${process.env.NEXT_PUBLIC_API_FETCH}/articles-front/${slug}`
            );

            setArticle(dataFetch);
        };

        fetchData();
    }, [slug]);

    if (!article) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div> This article is not avaliable now 😫</div>
            </div>
        );
    }

    return (
        <>
            <section className="grid grid-cols-12 mx-auto  gap-4">
                <div className="col-span-12 flex justify-center">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${article.thumbnail}`}
                        alt={`${article.title}`}
                        width={1000}
                        height={1000}
                        className="rounded-lg aspect-video"
                    ></Image>
                </div>
                <div className="col-span-12 flex flex-col gap-2 mt-2">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl night:text-red font-extrabold leading-normal">
                            {article.title}
                        </h1>
                    </div>
                    <div className="flex flex-row gap-2 mt-2">
                        {article.tags.map((tag) => (
                            <div key={tag.id} className="badge badge-primary">
                                {tag.name}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col mt-2">
                        <span className="text-sm leading-7 lg:leading-7 max-w-xl">
                            {` Written on ${formatDate(
                                article.createdAt.toString()
                            )} by Pradnya Kuswara.`}
                        </span>
                        <span className="text-sm  max-w-xl">
                            {`Last updated on ${formatDate(
                                article.updatedAt.toString()
                            )}.`}
                        </span>
                    </div>

                    <div className="flex flex-row mt-2 gap-2 border"></div>
                    <div className="flex justify-between gap-4 px-2 lg:px-0">
                        <div className="flex gap-2 items-center">
                            <Clock size={20} />
                            {readingTime(article.content)}
                        </div>
                        <div className="flex gap-2">
                            <div className="dropdown dropdown-end">
                                <Share
                                    className="cursor-pointer"
                                    size={20}
                                    tabIndex={0}
                                />
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                                >
                                    <li>
                                        <button
                                            className="flex items-center gap-2"
                                            onClick={() => copyLink()}
                                        >
                                            <Copy size={20} />
                                            <p>Copy Link</p>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row mt-2 gap-2 border"></div>

                    {/* render article content not using froala editor view*/}
                    <FroalaEditorView model={article.content} />
                </div>
            </section>
        </>
    );
}
