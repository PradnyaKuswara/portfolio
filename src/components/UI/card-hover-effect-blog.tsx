import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../../libs/utils';
import { Link } from 'react-router-dom';
import { Article } from '../../@types/article';

export const HoverEffectBlog = ({
  items,
  className,
}: {
  items: Article[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const limitdesc = (desc: string) => {
    return desc.length > 50 ? desc.slice(0, 50) + '...' : desc;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
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
          to={`/blogs/detail/${item.slug}`}
          key={item.slug}
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
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
            <Card>
              <div>
                <figure className="overflow-hidden bg-neutral-100 dark:bg-slate-900 aspect-video flex items-center justify-center">
                  <img
                    src={`${item.thumbnail}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="p-4">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        title={tag.name}
                        className="text-[10px] bg-secondary/10 dark:bg-secondary/20 text-secondary border border-secondary/20 px-2 py-0.5 rounded-full max-w-[100px] truncate"
                      >
                        {tag.name}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="text-[10px] bg-neutral-100 dark:bg-slate-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-slate-700 px-2 py-0.5 rounded-full font-medium">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>
                    <p
                      className={cn(
                        'mt-2 tracking-wide leading-relaxed text-sm',
                        className
                      )}
                    >
                      {limitdesc(item.meta_desc)}
                    </p>
                  </CardDescription>
                </div>
              </div>
              <div className="p-4 pt-0">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Publish: {formatDate(item.createdAt.toString())}
                </p>
              </div>
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
          <div className="h-full flex flex-col justify-between">{children}</div>
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
      <h4 className={cn(' font-bold tracking-wide mt-2', className)}>
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
