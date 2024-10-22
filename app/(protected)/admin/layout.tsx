"use client";

import React from "react";
import { useAuth } from "../../providers/auth-provider";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   const { user } = useAuth();
  //   const router = useRouter();

  //   React.useEffect(() => {
  //     if (!user) {
  //       router.push("/login");
  //     }
  //   });

  return children;
}
