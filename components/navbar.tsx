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
        <nav className="flex items-center justify-between px-4 py-3 sm:px-6 md:px-8 bg-gray-900 border-b border-gray-700 shadow-lg">
            <div>
                <Link
                    href={session ? "/dashboard" : "/"}
                    className="font-semibold text-lg sm:text-xl text-white hover:text-gray-200 transition-colors duration-200"
                >
                    Memento
                </Link>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                {session ? (
                    <>
                        {/* Desktop greeting */}
                        <span className="hidden sm:block text-gray-300 text-sm font-medium">
                            Good to see you, {session.user?.name || "User"}
                        </span>

                        {/* Mobile greeting - shorter */}
                        <span className="block sm:hidden text-gray-300 text-xs font-medium max-w-[120px] truncate">
                            Hi, {session.user?.name || "User"}
                        </span>

                        <button
                            onClick={handleSignOut}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium transition-all duration-200 hover:shadow-md min-h-[32px] sm:min-h-[auto]"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => signIn()}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium transition-all duration-200 hover:shadow-md min-h-[32px] sm:min-h-[auto]"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </nav>
    );
}
