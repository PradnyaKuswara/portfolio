import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../libs/utils';

type Certificate = {
    id: bigint;
    uuid: string;
    name: string;
    organization: string;
    month_obtained: string;
    year_obtained: string;
    month_expired: string;
    year_expired: string;
    url: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
};

export const HoverEffectSertificate = ({
    items,
    className,
}: {
    items: Certificate[];
    className?: string;
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const limitdesc = (desc: string) => {
        return desc.length > 50 ? desc.slice(0, 50) + '...' : desc;
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
                    to={item?.url}
                    key={item?.name}
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
                        <div className="flex justify-end gap-2">
                            <div className="badge badge-primary p-2 text-xs badge-outline">
                                {item.organization}
                            </div>
                        </div>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>
                            {limitdesc(item.description)}
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
            <h4 className={cn(' font-bold tracking-wide mt-2', className)}>
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
    return (
        <>
            <div>
                <p
                    className={cn(
                        'mt-2 tracking-wide leading-relaxed text-sm',
                        className
                    )}
                >
                    {children}
                </p>
            </div>
        </>
    );
};
