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
            <figure>
              <img
                src={`${import.meta.env.Vite_PUBLIC_API_URL}/${item.thumbnail}`}
                alt=""
                width={500}
                height={500}
                className=""
              />
            </figure>
            <div className="p-4">
              <div className="flex justify-end items-center">
                <div className="flex gap-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-primary text-primary-content  px-2 py-1 rounded-lg"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
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
                {/* published  */}
                <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
                  Publish: {formatDate(item.createdAt.toString())}
                </p>
              </CardDescription>
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
      <div className="relative z-50">
        <div className="">{children}</div>
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
