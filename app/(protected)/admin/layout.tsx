'use client';

import React from 'react';
import useAuthMiddleware from '../middleware/useAuthMiddleware';

interface User {
    uuid: string;
    email: string;
    name: string;
}

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = useAuthMiddleware() as User | null;

    return <>{children}</>;
}
