"use client";

import TableOfContent from "@/app/(public)/(components)/toc";
import Image from "next/image";
import React from "react";
import { Clock, Copy, Facebook, Instagram, Twitter } from "react-feather";
import toast from "react-hot-toast";
import readingDuration from "reading-duration";

interface BlogDetailProps {
  article: Article;
}

export default function BlogDetail({ article }: BlogDetailProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
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
    toast.success("Link copied to clipboard");
  };

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div> This article is not avaliable now 😫</div>
      </div>
    );
  }

  return (
    <>
      <section className="grid grid-cols-12 mx-auto gap-4">
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
            <div className="text-2xl lg:text-4xl night:text-red font-extrabold leading-normal">
              {article.title}
            </div>
          </div>
          <div className="flex flex-row gap-2 mt-2 items-center">
            {article.tags.map((tag) => (
              <div key={tag.id} className="badge badge-primary">
                {tag.name}
              </div>
            ))}

            <div className="flex gap-2 items-center">
              <Clock size={14} />
              <p className="text-sm">{readingTime(article.content)}</p>
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <span className="text-sm leading-7 lg:leading-7 max-w-xl">
              {` Written on ${formatDate(
                article.createdAt.toString()
              )} by Pradnya Kuswara.`}
            </span>
            <span className="text-sm  max-w-xl">
              {`Last updated on ${formatDate(article.updatedAt.toString())}.`}
            </span>

            <div className="flex flex-col mt-2 md:hidden">
              {/* <FloatingDock items={links}></FloatingDock> */}
              <div className="flex gap-4">
                <div className="rounded-full bg-secondary p-2 flex items-center hover:bg-primary">
                  <Copy
                    className="cursor-pointer text-secondary-content"
                    size={15}
                    onClick={() => copyLink()}
                  />
                </div>
                <div className="rounded-full bg-secondary p-2 flex items-center hover:bg-primary">
                  <Facebook
                    className="cursor-pointer text-secondary-content"
                    size={15}
                  />
                </div>
                <div className="rounded-full bg-secondary p-2 flex items-center hover:bg-primary">
                  <Instagram
                    className="cursor-pointer text-secondary-content"
                    size={15}
                  />
                </div>
                <div className="rounded-full bg-secondary p-2 flex items-center hover:bg-primary">
                  <Twitter
                    className="cursor-pointer text-secondary-content"
                    size={15}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row mt-2 gap-2 border border-neutral-500"></div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-4">
            <div className="col-span-1 lg:col-span-4 ">
              <article>
                <div
                  dangerouslySetInnerHTML={{
                    __html: article.content,
                  }}
                ></div>
              </article>
            </div>

            <div className="hidden lg:col-span-2 lg:flex">
              {/* table of content */}
              <aside className="h-full">
                <div className="sticky top-20">
                  <div className=" bg-gray-100 dark:bg-[#262626] p-4 rounded-md flex flex-col gap-4 mb-2">
                    <div className="font-bold text-lg">Table of Content</div>
                    <TableOfContent></TableOfContent>
                  </div>
                  <div className="flex flex-col">
                    {/* <FloatingDock items={links}></FloatingDock> */}
                    <div className="flex gap-4">
                      <div className="rounded-full bg-secondary p-2 flex items-center hover:bg-primary">
                        <Copy
                          className="cursor-pointer text-secondary-content"
                          size={15}
                          onClick={() => copyLink()}
                        />
                      </div>
                      <div className="rounded-full bg-secondary p-2 flex items-center hover:bg-primary">
                        <Facebook
                          className="cursor-pointer text-secondary-content"
                          size={15}
                        />
                      </div>
                      <div className="rounded-full bg-secondary p-2 flex items-center hover:bg-primary">
                        <Instagram
                          className="cursor-pointer text-secondary-content"
                          size={15}
                        />
                      </div>
                      <div className="rounded-full bg-secondary p-2 flex items-center hover:bg-primary">
                        <Twitter
                          className="cursor-pointer text-secondary-content"
                          size={15}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
