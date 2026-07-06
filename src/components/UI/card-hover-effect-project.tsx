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
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../../libs/utils';
import { Link } from 'react-router-dom';
import { Project } from '../../@types/project';
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

export const HoverEffectProject = ({
  items,
  className,
}: {
  items: Project[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          to={`/projects/detail/${item.slug}`}
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
            <div className="flex flex-col gap-2">
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

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {stackTech(item.stack).map((stack, idx) => {
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
              </CardDescription>
            </div>

            <figure className="mt-3 overflow-hidden rounded-md bg-neutral-100 dark:bg-slate-900 aspect-video flex items-center justify-center">
              <img
                src={`${item.image}`}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </figure>
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
      <div className="relative z-50 h-full">
        <div className="p-4 h-full flex flex-col justify-between gap-4">{children}</div>
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
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};
