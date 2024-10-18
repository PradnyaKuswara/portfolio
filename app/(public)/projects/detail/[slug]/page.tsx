import { Metadata } from "next";
import ProjectDetail from "./project";
import { showData } from "@/app/(protected)/utils/data";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project: Project = await showData(
    `${process.env.NEXT_PUBLIC_API_FETCH}/projects-front/${params.slug}`
  );
  return {
    title: project.title,
    description: project.meta_desc,
    keywords: project.meta_keyword?.split(","),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://pradnyakuswara.vercel.app/blogs/detail/" + project.slug,
      title: project.title,
      description: project.meta_desc,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_API_URL}/${project.image}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

const ProjectDetailPage = async ({ params }: { params: { slug: string } }) => {
  const project: Project = await showData(
    `${process.env.NEXT_PUBLIC_API_FETCH}/projects-front/${params.slug}`
  );

  if (!project) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
        <div className="min-h-screen py-36 lg:py-36 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto">
          <ProjectDetail project={project}></ProjectDetail>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
