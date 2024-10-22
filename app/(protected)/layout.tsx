import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/app/(protected)/css/style.css";
import React from "react";
import ThemeProvider from "../providers/theme-provider";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../providers/auth-provider";
import { SidebarContainer } from "./(components)/Sidebar/SidebarContainer";
import { cn } from "../lib/utils";
import Header from "./(components)/Header";
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
        <AuthProvider>
          <ThemeProvider>
            <div
              className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen"
              )}
            >
              <SidebarContainer></SidebarContainer>

              <div className="flex flex-1 max-w-screen-2xl flex-col overflow-hidden ">
                <div className="mx-4 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                  <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header />
                    <main>
                      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 mt-14">
                        {children}
                      </div>
                    </main>
                  </div>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
