"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
            <div>
                <Link href="/" className="font-bold text-lg">
                    Daily Journal
                </Link>
            </div>

            <div>
                {session ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm">
                            Hi, {session.user?.name || "User"} 👋
                        </span>
                        <button
                            onClick={() => signOut()}
                            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-sm"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-sm"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}
