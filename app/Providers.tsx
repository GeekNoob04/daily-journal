"use client";

import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Navbar />
            {children}
        </SessionProvider>
    );
}
