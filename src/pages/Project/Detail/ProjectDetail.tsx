import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Metadata from '../../../components/Metadata';
import useProjectDetailViewModel from './useProjectDetailViewModel';
import { useLoadingBar } from 'react-top-loading-bar';
import MDXRenderer from '../../../components/TextEditor/MDXRenderer';
import CTAProject from '../../../components/Header/CTAProject';
import {
  LaravelOriginal,
  ReactOriginal,
  NextjsOriginal,
  NodejsOriginal,
  MysqlOriginal,
  PhpOriginal,
  TailwindcssOriginal,
  BootstrapOriginal,
  PostgresqlOriginal,
  TypescriptOriginal,
  JavascriptOriginal,
} from 'devicons-react';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { project, isValidating } = useProjectDetailViewModel(slug);
  const { start, complete } = useLoadingBar();

  useEffect(() => {
    if (isValidating) {
      start();
    } else {
      complete();
    }
  }, [isValidating, start, complete]);

  const stackTech = (stack: string) => {
    return stack.split(',');
  };

  return (
    <React.Fragment>
      <Metadata>
        <title>{project?.data?.title}</title>
      </Metadata>
      {project?.data ? (
        <div className="min-h-screen py-28 lg:py-36 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto">
          <div className="flex flex-col justify-start items-start gap-4">
            <h1
              className="text-xl md:text-4xl font-bold"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              {project?.data?.title}
            </h1>
            <span className="text-gray-400">
              {project?.data?.ProjectCategory.name}
            </span>
            <div className="flex justify-start gap-2">
              {stackTech(project?.data?.stack).map((stack, idx) => (
                <div key={idx}>
                  {stack.trim() == 'React' ? (
                    <ReactOriginal size={20} className="text-blue-500" />
                  ) : stack.trim() == 'Next.js' ? (
                    <NextjsOriginal size={20} className="text-red-500" />
                  ) : stack.trim() == 'Laravel' ? (
                    <LaravelOriginal size={20} className="text-red-500" />
                  ) : stack.trim() == 'PHP' ? (
                    <PhpOriginal size={20} className="text-blue-500" />
                  ) : stack.trim() == 'Node.js' ? (
                    <NodejsOriginal size={20} className="text-green-500" />
                  ) : stack.trim() == 'MySQL' ? (
                    <MysqlOriginal size={20} className="text-blue-500" />
                  ) : stack.trim() == 'Tailwind' ? (
                    <TailwindcssOriginal size={20} className="text-blue-500" />
                  ) : stack.trim() == 'Bootstrap' ? (
                    <BootstrapOriginal size={20} className="text-blue-500" />
                  ) : stack.trim() === 'PostgreSQL' ? (
                    <PostgresqlOriginal size={20} />
                  ) : stack.trim() === 'TypeScript' ? (
                    <TypescriptOriginal size={20} />
                  ) : stack.trim() === 'JavaScript' ? (
                    <JavascriptOriginal size={20} />
                  ) : (
                    stack
                  )}
                </div>
              ))}
            </div>
            <p className="leading-relaxed">{project?.data?.meta_desc}</p>
            <CTAProject project={project?.data} />
            <img src={project?.data?.image} alt={project?.data?.title} />
            <MDXRenderer code={project?.data?.description}></MDXRenderer>
          </div>
        </div>
      ) : (
        <div className="min-h-screen py-28 lg:py-36 max-w-screen-lg lg:px-8 mx-4 lg:mx-auto flex justify-center items-center">
          Project not found, sorry.
        </div>
      )}
    </React.Fragment>
  );
};

export default ProjectDetail;
