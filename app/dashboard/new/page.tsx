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
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium mb-6 transition-colors duration-200 group"
                    >
                        <svg
                            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
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
                        <div className="mb-4">
                            <span className="text-6xl">📔</span>
                        </div>
                        <h1 className="text-4xl font-bold text-amber-900 mb-2">
                            Create A New Journal Entry
                        </h1>
                        <p className="text-amber-700 text-lg">
                            Capture your thoughts, feelings, and memories
                        </p>
                    </div>
                </div>

                {/* Main Form */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-100 overflow-hidden">
                    <div className="p-8 sm:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title Input */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-amber-900">
                                    Journal Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="Give your entry a meaningful title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 placeholder-amber-600 text-amber-900 transition-all duration-200"
                                    required
                                />
                            </div>

                            {/* Content Textarea */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-amber-900">
                                    Your Thoughts
                                </label>
                                <textarea
                                    placeholder="Pour your heart out... What's on your mind today?"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full px-4 py-4 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 placeholder-amber-600 text-amber-900 transition-all duration-200 resize-none"
                                    rows={10}
                                    required
                                />
                            </div>

                            {/* Mood Selector */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-amber-900">
                                    Current Mood
                                </label>
                                <select
                                    value={mood}
                                    onChange={(e) => setMood(e.target.value)}
                                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-amber-50/50 text-amber-900 transition-all duration-200"
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
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
                                >
                                    {loading ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                                            Creating Entry...
                                        </>
                                    ) : (
                                        <>
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
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            Create Journal Entry
                                        </>
                                    )}
                                </button>

                                <Link
                                    href="/dashboard"
                                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-4 bg-stone-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:bg-stone-700 transform hover:scale-105 transition-all duration-200"
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
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Decorative bottom section */}
                    <div className="bg-gradient-to-r from-amber-100 to-orange-100 px-8 py-6">
                        <div className="text-center">
                            <p className="text-amber-800 text-sm italic">
                                Writing is the painting of the voice. — Voltaire
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
