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
            <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-amber-900 tracking-tight mb-2">
                            Your Journals
                        </h1>
                        <p className="text-amber-800">
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

                {/* Content Section */}
                {journals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 max-w-md text-center border border-amber-100">
                            <div className="mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-4xl">📔</span>
                                </div>
                                <h3 className="text-2xl font-semibold text-amber-900 mb-2">
                                    Welcome to Your Journal
                                </h3>
                                <p className="text-amber-700 leading-relaxed">
                                    Start documenting your thoughts,
                                    experiences, and memories. Your first
                                    journal entry is just a click away!
                                </p>
                            </div>

                            <Link
                                href="/dashboard/new"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-stone-700 to-stone-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-stone-800 hover:to-stone-900 transform hover:scale-105 transition-all duration-200"
                            >
                                <svg
                                    className="w-5 h-5"
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
                                Create Your First Journal
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="space-y-6">
                            {journals.map((journal) => (
                                <div
                                    key={journal.id}
                                    className="transform transition-all duration-300 hover:scale-[1.02] animate-fade-in-up"
                                >
                                    <JournalCard journal={journal} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Fixed Floating Create Button - Center Bottom */}
            {journals.length > 0 && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
                    <Link
                        href="/dashboard/new"
                        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-stone-700 to-stone-800 text-white rounded-full shadow-xl hover:from-stone-800 hover:to-stone-900 hover:shadow-2xl transform hover:scale-110 transition-all duration-200 border-2 border-white"
                    >
                        <svg
                            className="w-6 h-6"
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
