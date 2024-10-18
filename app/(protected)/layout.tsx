import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/app/(protected)/css/style.css";
import React from "react";
import ThemeProvider from "../(protected)/theme-provider";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

export const metadata = (): Metadata => {
  return {
    title: {
      default: "Dashboard",
      template: "%s | Dashboard",
    },
    icons: {
      icon: [
        {
          url: "/assets/images/favicon.ico",
          href: "/assets/images/favicon.ico",
        },
      ],
      apple: [
        {
          url: "/assets/images/apple-icon-180x180.png",
          href: "/assets/images/apple-icon-180x180.png",
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
      <body suppressHydrationWarning={true}>
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
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
