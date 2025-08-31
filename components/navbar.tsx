"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { data: session } = useSession();
    const router = useRouter();
    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push("/");
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
            <div>
                <Link
                    href={session ? "/dashboard" : "/"}
                    className="font-bold text-lg"
                >
                    Daily Journal
                </Link>
            </div>

            <div className="flex items-center gap-4">
                {session ? (
                    <>
                        <Link
                            href="/dashboard"
                            className="text-sm hover:text-gray-300"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/dashboard/new"
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-sm"
                        >
                            New Journal
                        </Link>
                        <span className="text-sm">
                            Hi, {session.user?.name || "User"} 👋
                        </span>
                        <button
                            onClick={handleSignOut}
                            className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-sm"
                        >
                            Logout
                        </button>
                    </>
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
