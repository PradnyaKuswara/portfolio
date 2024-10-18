// page.tsx
import { Metadata } from "next";
import BlogDetail from "./blog";
import { showData } from "@/app/(protected)/utils/data";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article: Article = await showData(
    `${process.env.NEXT_PUBLIC_API_FETCH}/articles-front/${params.slug}`
  );

  return {
    title: article.title,
    description: article.meta_desc,
    keywords: article.meta_keyword?.split(","),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://pradnyakuswara.vercel.app/blogs/detail/" + article.slug,
      title: article.title,
      description: article.meta_desc,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_API_URL}/${article.thumbnail}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

const BlogDetailPage = async ({ params }: { params: { slug: string } }) => {
  const article: Article = await showData(
    `${process.env.NEXT_PUBLIC_API_FETCH}/articles-front/${params.slug}`
  );

  if (!article) {
    return <div>Loading....</div>;
  }

  return (
    <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <div className="min-h-screen pt-36 pb-10 lg:pt-36 lg:pb-10 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto">
        <BlogDetail article={article} />
      </div>
    </div>
  );
};

export default BlogDetailPage;
