import DeleteJournal from "@/components/DeleteJournal";
import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface JournalPageProps {
    params: Promise<{ id: string }>;
}

export default async function JournalPage({ params }: JournalPageProps) {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        redirect("/auth/signin");
    }
    const { id: journalId } = await params;
    const journal = await prisma.journal.findUnique({
        where: { id: journalId },
    });
    if (!journal || journal.userId !== session.user.id) {
        notFound();
    }

    const getMoodInfo = (mood: string) => {
        switch (mood) {
            case "happy":
                return {
                    emoji: "😊",
                    label: "Happy",
                    color: "text-yellow-600 bg-yellow-50",
                };
            case "sad":
                return {
                    emoji: "😢",
                    label: "Sad",
                    color: "text-blue-600 bg-blue-50",
                };
            case "neutral":
                return {
                    emoji: "😐",
                    label: "Neutral",
                    color: "text-gray-600 bg-gray-50",
                };
            case "excited":
                return {
                    emoji: "🤩",
                    label: "Excited",
                    color: "text-pink-600 bg-pink-50",
                };
            case "anxious":
                return {
                    emoji: "😰",
                    label: "Anxious",
                    color: "text-orange-600 bg-orange-50",
                };
            case "calm":
                return {
                    emoji: "😌",
                    label: "Calm",
                    color: "text-green-600 bg-green-50",
                };
            default:
                return {
                    emoji: "😐",
                    label: "Unknown",
                    color: "text-gray-600 bg-gray-50",
                };
        }
    };

    const moodInfo = getMoodInfo(journal.mood);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100">
            <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
                <div className="mb-6 sm:mb-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium mb-4 sm:mb-6 transition-colors duration-200 group text-sm sm:text-base"
                    >
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform duration-200 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Back to Dashboard
                    </Link>

                    <div className="text-center">
                        <div className="mb-3 sm:mb-4">
                            <span className="text-4xl sm:text-5xl lg:text-6xl">
                                📖
                            </span>
                        </div>
                        <div className="mb-2">
                            <span
                                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${moodInfo.color}`}
                            >
                                <span className="text-base sm:text-lg">
                                    {moodInfo.emoji}
                                </span>
                                {moodInfo.label}
                            </span>
                        </div>
                        <p className="text-amber-600 text-xs sm:text-sm px-2">
                            Created on{" "}
                            {new Date(journal.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )}
                        </p>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-amber-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-100 to-orange-100 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-amber-200">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-900 text-center leading-relaxed break-words">
                            {journal.title}
                        </h1>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8 xl:p-10">
                        <div className="prose prose-amber max-w-none">
                            <div className="text-amber-900 leading-relaxed text-sm sm:text-base lg:text-lg whitespace-pre-wrap break-words">
                                {journal.content}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-stone-50 to-amber-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-t border-amber-100">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch">
                            <Link
                                href={`/dashboard/${journal.id}/edit`}
                                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
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
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                Edit Journal
                            </Link>
                            <DeleteJournal journalId={journalId} />
                        </div>
                    </div>
                </div>

                <div className="mt-6 sm:mt-8 text-center px-4">
                    <p className="text-amber-700 text-xs sm:text-sm italic">
                        Every story matters. Every moment captured is a
                        treasure. ✨
                    </p>
                </div>
            </div>
        </div>
    );
}
