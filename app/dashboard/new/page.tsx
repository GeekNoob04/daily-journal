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
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/dashboard"
                    className="text-blue-500 hover:text-blue-600"
                >
                    ← Back to Dashboard
                </Link>
                <h1 className="text-2xl font-bold">
                    Create A New Journal Entry
                </h1>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter journal title.."
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    placeholder="Write your thoughts here..."
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    className="w-full border p-2 rounded"
                    rows={8}
                    required
                />
                <select
                    value={mood}
                    onChange={(e) => {
                        setMood(e.target.value);
                    }}
                    className="w-full border p-2 rounded"
                >
                    <option value="">Select your mood</option>
                    <option value="happy">😊 Happy</option>
                    <option value="sad">😢 Sad</option>
                    <option value="neutral">😐 Neutral</option>
                    <option value="excited">🤩 Excited</option>
                    <option value="anxious">😰 Anxious</option>
                    <option value="calm">😌 Calm</option>
                </select>
                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Journal"}
                    </button>
                    <Link
                        href="/dashboard"
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
