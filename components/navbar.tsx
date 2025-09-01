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
        <nav className="flex items-center justify-between px-8 py-3 bg-gray-900 border-b border-gray-700 shadow-lg">
            <div>
                <Link
                    href={session ? "/dashboard" : "/"}
                    className="font-semibold text-xl text-white hover:text-gray-200 transition-colors duration-200"
                >
                    Memento
                </Link>
            </div>

            <div className="flex items-center gap-6">
                {session ? (
                    <>
                        <span className="text-gray-300 text-sm font-medium">
                            Good to see you, {session.user?.name || "User"}
                        </span>
                        <button
                            onClick={handleSignOut}
                            className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all duration-200 hover:shadow-md"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all duration-200 hover:shadow-md"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </nav>
    );
}
