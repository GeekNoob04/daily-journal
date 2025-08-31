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
    const getMoodEmoji = (mood: string) => {
        const moodMap: Record<string, string> = {
            happy: "😊",
            sad: "😢",
            neutral: "😐",
            excited: "🤩",
            anxious: "😰",
            calm: "😌",
        };
        return moodMap[mood] || "😐";
    };
    return (
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
            <div className="mb-4">
                <Link
                    href={`/journal/${journal.id}`}
                    className="block hover:text-blue-600"
                >
                    <h2 className="text-xl font-semibold mb-2">
                        {journal.title}
                    </h2>
                    <p className="text-gray-600 mb-2 line-clamp-3">
                        {journal.content}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>
                            Mood: {getMoodEmoji(journal.mood)} {journal.mood}
                        </span>
                        <span>•</span>
                        <span>{journal.createdAt.toLocaleDateString()}</span>
                    </div>
                </Link>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t">
                <Link
                    href={`/dashboard/${journal.id}/edit`}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                >
                    Edit
                </Link>
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                    {deleting ? "Deleting..." : "Delete"}
                </button>
                <Link
                    href={`/journal/${journal.id}`}
                    className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors ml-auto"
                >
                    View
                </Link>
            </div>
        </div>
    );
}
