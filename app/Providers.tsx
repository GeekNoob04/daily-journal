"use client";

import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideNavbar = pathname === "/auth/signin";
    return (
        <SessionProvider>
            {!hideNavbar && <Navbar />}
            {children}
        </SessionProvider>
    );
}
