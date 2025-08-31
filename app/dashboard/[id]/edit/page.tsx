"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EditPage() {
    const { id } = useParams();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchJournal() {
            try {
                const res = await axios.get(`/api/journal/${id}`);
                setTitle(res.data.title);
                setContent(res.data.content);
                setMood(res.data.mood);
            } catch (e) {
                console.error("Error fetching journal:", e);
                router.push("/dashboard");
            }
        }
        if (id) fetchJournal();
    }, [id, router]);
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`/api/journal/${id}`, {
                title,
                content,
                mood,
            });
            router.push("/dashboard");
        } catch (e) {
            console.error("Error updating journal:", e);
            alert("Failed to update journal.");
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
                <h1 className="text-2xl font-bold">Edit Journal</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    className="w-full border p-2 rounded"
                    rows={6}
                    required
                />
                <select
                    value={mood}
                    onChange={(e) => {
                        setMood(e.target.value);
                    }}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">Select mood</option>
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
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Journal"}
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
