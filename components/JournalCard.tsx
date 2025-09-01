"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Journal {
    id: string;
    title: string;
    content: string;
    mood: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

interface JournalCardProps {
    journal: Journal;
}

export default function JournalCard({ journal }: JournalCardProps) {
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await axios.delete(`/api/journal/${journal.id}`);
            router.refresh();
        } catch (e) {
            console.error("Failed to delete journal:", e);
            alert("Failed to delete journal. Please try again.");
        } finally {
            setDeleting(false);
        }
    };

    const getMoodInfo = (mood: string) => {
        switch (mood) {
            case "happy":
                return { emoji: "😊", color: "text-yellow-600 bg-yellow-50" };
            case "sad":
                return { emoji: "😢", color: "text-blue-600 bg-blue-50" };
            case "neutral":
                return { emoji: "😐", color: "text-gray-600 bg-gray-50" };
            case "excited":
                return { emoji: "🤩", color: "text-pink-600 bg-pink-50" };
            case "anxious":
                return { emoji: "😰", color: "text-orange-600 bg-orange-50" };
            case "calm":
                return { emoji: "😌", color: "text-green-600 bg-green-50" };
            default:
                return { emoji: "😐", color: "text-gray-600 bg-gray-50" };
        }
    };

    const moodInfo = getMoodInfo(journal.mood);

    return (
        <div className="bg-gradient-to-br from-white to-orange-100/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border-2 border-white/60 overflow-hidden transition-all duration-300 transform hover:scale-[1.02] ring-1 ring-orange-200/40">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-orange-200/60 to-rose-200/50 px-6 py-4 border-b border-orange-300/40">
                <Link
                    href={`/journal/${journal.id}`}
                    className="block hover:text-amber-800 transition-colors duration-200"
                >
                    <h2 className="text-xl font-bold text-amber-900 mb-2 line-clamp-2">
                        {journal.title}
                    </h2>
                    <p className="text-amber-700 mb-3 line-clamp-3 leading-relaxed">
                        {journal.content}
                    </p>
                </Link>

                {/* Mood and Date Info */}
                <div className="flex items-center justify-between text-sm">
                    <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-medium ${moodInfo.color}`}
                    >
                        <span className="text-base">{moodInfo.emoji}</span>
                        {journal.mood}
                    </span>
                    <span className="text-amber-600 font-medium">
                        {new Date(journal.createdAt).toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            }
                        )}
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gradient-to-r from-stone-200/50 to-orange-200/50 px-6 py-4">
                <div className="flex items-center gap-3">
                    <Link
                        href={`/dashboard/${journal.id}/edit`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 text-sm"
                    >
                        <svg
                            className="w-4 h-4"
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
                        Edit
                    </Link>

                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-red-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-md text-sm"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                        {deleting ? "Deleting..." : "Delete"}
                    </button>

                    <Link
                        href={`/journal/${journal.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-amber-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 text-sm ml-auto"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}
