import React from 'react';
import type { Metadata } from 'next';
import { poppins } from '../fonts';

import '../globals.css';
import 'animate.css';

import { AOSInit } from '../lib/aos';
import ThemeProvider from './theme-provider';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

export const metadata = (): Metadata => {
    return {
        title: {
            default: 'Pradnya Kuswara',
            template: '%s | Pradnya Kuswara',
        },
        description:
            'Portfolio website of I Gusti Ngurah A Pradnya Kuswara. A software engineer and web developer',
        icons: {
            icon: [
                {
                    url: '/assets/images/favicon.ico',
                    href: '/assets/images/favicon.ico',
                },
            ],
            apple: [
                {
                    url: '/assets/images/apple-icon-180x180.png',
                    href: '/assets/images/apple-icon-180x180.png',
                },
            ],
        },
        keywords: [
            'Pradnya Kuswara',
            'Pradnya',
            'Kuswara',
            'Gusti Ngurah A Pradnya Kuswara',
            'Gusti Ngurah A Pradnya',
            'Gusti Ngurah A',
            'Gusti Ngurah',
            'Gusti',
            'Ngurah',
            'A Pradnya Kuswara',
            'A Pradnya',
            'A',
            'Pradnya Kuswara',
            'Pradnya',
            'Kuswara',
        ],
        authors: {
            name: 'Pradnya Kuswara',
            url: 'https://pradnyakuswara.vercel.app',
        },
        twitter: {
            card: 'summary',
            site: '@pradnyakuswara',
            creator: '@pradnyakuswara',
        },
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: 'https://pradnyakuswara.vercel.app',
            title: 'Pradnya Kuswara',
            description:
                'Portfolio website of I Gusti Ngurah A Pradnya Kuswara',
            images: [
                {
                    url: 'https://https://pradnyakuswara.vercel.app/assets/images/favicon.ico',
                    width: 1200,
                    height: 630,
                    alt: 'Pradnya Kuswara',
                },
            ],
        },
    };
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <AOSInit></AOSInit>
            <body className={poppins.className}>
                <div className="p-1 bg-gradient-to-r from-primary via-secondary to-accent w-full fixed z-50 top-0"></div>
                <NextTopLoader
                    color="#000"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={true}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                />
                <Toaster position="bottom-center" />
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
