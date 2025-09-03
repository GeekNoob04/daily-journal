"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewEntryPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("/api/journal", {
                title,
                content,
                mood,
            });
            if (res.status === 200) {
                router.push("/dashboard");
            } else {
                alert("Failed to create journal entry");
            }
        } catch (e) {
            console.error("Error creating journal:", e);
            alert("Failed to create journal entry");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100">
            <div className="max-w-4xl mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8">
                <div className="mb-6 sm:mb-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium mb-4 sm:mb-6 transition-colors duration-200 group text-sm sm:text-base"
                    >
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
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
                            <span className="text-4xl sm:text-5xl md:text-6xl">
                                📔
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 mb-2 px-2">
                            Create A New Journal Entry
                        </h1>
                        <p className="text-amber-700 text-base sm:text-lg px-4">
                            Capture your thoughts, feelings, and memories
                        </p>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-amber-100 overflow-hidden mx-1 sm:mx-0">
                    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4 sm:space-y-6"
                        >
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-amber-900">
                                    Journal Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="Give your entry a meaningful title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-amber-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 placeholder-amber-600 text-amber-900 transition-all duration-200 text-sm sm:text-base"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-amber-900">
                                    Your Thoughts
                                </label>
                                <textarea
                                    placeholder="Pour your heart out... What's on your mind today?"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full px-3 py-3 sm:px-4 sm:py-4 border border-amber-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 placeholder-amber-600 text-amber-900 transition-all duration-200 resize-none text-sm sm:text-base"
                                    rows={8}
                                    style={{ minHeight: "200px" }}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-amber-900">
                                    Current Mood
                                </label>
                                <select
                                    value={mood}
                                    onChange={(e) => setMood(e.target.value)}
                                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-amber-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 text-amber-900 transition-all duration-200 text-sm sm:text-base"
                                    required
                                >
                                    <option value="">
                                        How are you feeling today?
                                    </option>
                                    <option value="happy">
                                        😊 Happy - Feeling joyful and content
                                    </option>
                                    <option value="sad">
                                        😢 Sad - Going through a tough time
                                    </option>
                                    <option value="neutral">
                                        😐 Neutral - Just an ordinary day
                                    </option>
                                    <option value="excited">
                                        🤩 Excited - Full of energy and
                                        enthusiasm
                                    </option>
                                    <option value="anxious">
                                        😰 Anxious - Feeling worried or stressed
                                    </option>
                                    <option value="calm">
                                        😌 Calm - Peaceful and relaxed
                                    </option>
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 text-sm sm:text-base min-h-[44px] sm:min-h-[auto]"
                                >
                                    {loading ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            <span className="hidden xs:inline">
                                                Creating Entry...
                                            </span>
                                            <span className="xs:hidden">
                                                Creating...
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <svg
                                                className="w-4 h-4 sm:w-5 sm:h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span className="hidden xs:inline">
                                                Create Journal Entry
                                            </span>
                                            <span className="xs:hidden">
                                                Create Entry
                                            </span>
                                        </>
                                    )}
                                </button>

                                <Link
                                    href="/dashboard"
                                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-stone-600 text-white font-medium rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:bg-stone-700 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base min-h-[44px] sm:min-h-[auto]"
                                >
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>

                    <div className="bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
                        <div className="text-center">
                            <p className="text-amber-800 text-xs sm:text-sm italic leading-relaxed">
                                Writing is the painting of the voice. — Voltaire
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
