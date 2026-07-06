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
  VuejsOriginal,
  AngularjsOriginal,
  ExpressOriginal,
  MongodbOriginal,
  PythonOriginal,
  GoOriginal,
  DockerOriginal,
  GitOriginal,
  Css3Original,
  Html5Original,
  FirebaseOriginal,
  SupabaseOriginal,
  FlutterOriginal,
  KotlinOriginal,
  SwiftOriginal,
} from 'devicons-react';
import {
  IconBrandOpenai,
  IconSparkles,
  IconBrain,
} from '@tabler/icons-react';

const getTechIcon = (name: string) => {
  const cleanName = name.trim().toLowerCase();
  switch (cleanName) {
    case 'react':
    case 'react.js':
    case 'reactjs':
      return <ReactOriginal size={16} />;
    case 'next.js':
    case 'nextjs':
      return <NextjsOriginal size={16} />;
    case 'laravel':
      return <LaravelOriginal size={16} />;
    case 'php':
      return <PhpOriginal size={16} />;
    case 'node.js':
    case 'nodejs':
    case 'node':
      return <NodejsOriginal size={16} />;
    case 'mysql':
      return <MysqlOriginal size={16} />;
    case 'tailwind':
    case 'tailwindcss':
    case 'tailwind css':
      return <TailwindcssOriginal size={16} />;
    case 'bootstrap':
      return <BootstrapOriginal size={16} />;
    case 'postgresql':
    case 'postgres':
      return <PostgresqlOriginal size={16} />;
    case 'typescript':
    case 'ts':
      return <TypescriptOriginal size={16} />;
    case 'javascript':
    case 'js':
      return <JavascriptOriginal size={16} />;
    case 'vue':
    case 'vue.js':
    case 'vuejs':
      return <VuejsOriginal size={16} />;
    case 'angular':
    case 'angularjs':
      return <AngularjsOriginal size={16} />;
    case 'express':
    case 'expressjs':
    case 'express.js':
      return <ExpressOriginal size={16} />;
    case 'mongodb':
    case 'mongo':
      return <MongodbOriginal size={16} />;
    case 'python':
      return <PythonOriginal size={16} />;
    case 'go':
    case 'golang':
      return <GoOriginal size={16} />;
    case 'docker':
      return <DockerOriginal size={16} />;
    case 'git':
    case 'github':
      return <GitOriginal size={16} />;
    case 'css':
    case 'css3':
      return <Css3Original size={16} />;
    case 'html':
    case 'html5':
      return <Html5Original size={16} />;
    case 'firebase':
      return <FirebaseOriginal size={16} />;
    case 'supabase':
      return <SupabaseOriginal size={16} />;
    case 'flutter':
      return <FlutterOriginal size={16} />;
    case 'kotlin':
      return <KotlinOriginal size={16} />;
    case 'swift':
      return <SwiftOriginal size={16} />;
    case 'openai':
    case 'gpt':
    case 'chatgpt':
    case 'gpt-3':
    case 'gpt-4':
      return <IconBrandOpenai size={16} className="text-emerald-600 dark:text-emerald-400" />;
    case 'claude':
    case 'anthropic':
    case 'claude AI':
      return <IconSparkles size={16} className="text-orange-500" />;
    case 'gemini':
    case 'google gemini':
      return <IconSparkles size={16} className="text-blue-500" />;
    case 'ai':
    case 'artificial intelligence':
    case 'llm':
    case 'nlp':
      return <IconBrain size={16} className="text-purple-500" />;
    default:
      return null;
  }
};

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
            <div className="flex flex-wrap gap-1.5">
              {stackTech(project?.data?.stack).map((stack, idx) => {
                const cleanStack = stack.trim();
                const icon = getTechIcon(cleanStack);
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-100 dark:bg-slate-800 text-neutral-800 dark:text-neutral-200 text-xs border border-neutral-200 dark:border-slate-700"
                  >
                    {icon}
                    <span>{cleanStack}</span>
                  </div>
                );
              })}
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
