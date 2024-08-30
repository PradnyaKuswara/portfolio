import React from 'react';
import Head from 'next/head';

type MetadataProps = {
    title: string;
    description?: string;
    keywords?: string[];
    icon?: string;
    appleIcon?: string;
    twitter?: {
        card: string;
        site: string;
        creator: string;
    };
    openGraph?: {
        type: string;
        locale: string;
        url: string;
        title: string;
        description: string;
        images: { url: string; width: number; height: number; alt: string }[];
    };
};

const ClientMetadata: React.FC<MetadataProps> = ({
    title,
    description,
    keywords = [],
    icon,
    appleIcon,
    twitter,
    openGraph,
}) => {
    return (
        <Head>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
            {keywords.length > 0 && (
                <meta name="keywords" content={keywords.join(', ')} />
            )}
            {icon && <link rel="icon" href={icon} />}
            {appleIcon && <link rel="apple-touch-icon" href={appleIcon} />}
            {twitter && (
                <>
                    <meta name="twitter:card" content={twitter.card} />
                    <meta name="twitter:site" content={twitter.site} />
                    <meta name="twitter:creator" content={twitter.creator} />
                </>
            )}
            {openGraph && (
                <>
                    <meta property="og:type" content={openGraph.type} />
                    <meta property="og:locale" content={openGraph.locale} />
                    <meta property="og:url" content={openGraph.url} />
                    <meta property="og:title" content={openGraph.title} />
                    <meta
                        property="og:description"
                        content={openGraph.description}
                    />
                    {openGraph.images.map((image, index) => (
                        <meta
                            key={index}
                            property="og:image"
                            content={image.url}
                        />
                    ))}
                </>
            )}
        </Head>
    );
};

export default ClientMetadata;
