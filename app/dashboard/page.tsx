import JournalCard from "@/components/JournalCard";
import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        redirect("/api/auth/signin");
    }
    const journals = await prisma.journal.findMany({
        where: {
            user: {
                email: session.user.email,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-orange-100">
            <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-6 sm:mb-8">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-900 tracking-tight mb-2">
                            Your Journals
                        </h1>
                        <p className="text-sm sm:text-base text-amber-800">
                            {journals.length === 0
                                ? "Start your journaling journey today"
                                : `${journals.length} ${
                                      journals.length === 1
                                          ? "entry"
                                          : "entries"
                                  } and counting`}
                        </p>
                    </div>
                </div>

                {journals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center border border-amber-100">
                            <div className="mb-6">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl sm:text-4xl">
                                        📔
                                    </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-semibold text-amber-900 mb-2">
                                    Welcome to Your Journal
                                </h3>
                                <p className="text-sm sm:text-base text-amber-700 leading-relaxed px-2">
                                    Start documenting your thoughts,
                                    experiences, and memories. Your first
                                    journal entry is just a click away!
                                </p>
                            </div>

                            <Link
                                href="/dashboard/new"
                                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-stone-700 to-stone-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-stone-800 hover:to-stone-900 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                            >
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                                <span className="whitespace-nowrap">
                                    Create Your First Journal
                                </span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 sm:space-y-8 pb-20 sm:pb-24">
                        <div className="space-y-4 sm:space-y-6">
                            {journals.map((journal) => (
                                <div
                                    key={journal.id}
                                    className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in-up"
                                >
                                    <JournalCard journal={journal} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {journals.length > 0 && (
                <div className="fixed bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-50">
                    <Link
                        href="/dashboard/new"
                        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-stone-700 to-stone-800 text-white rounded-full shadow-xl hover:from-stone-800 hover:to-stone-900 hover:shadow-2xl transform hover:scale-110 transition-all duration-200 border-2 border-white"
                        aria-label="Create new journal entry"
                    >
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </Link>
                </div>
            )}
        </div>
    );
}
