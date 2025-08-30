"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPage() {
    const { id } = useParams();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("");

    useEffect(() => {
        async function fetchJournal() {
            try {
                const res = await axios.get(`/api/journal/${id}`);
                setTitle(res.data.title);
                setContent(res.data.content);
                setMood(res.data.mood);
            } catch (e) {
                console.error("Error fetching journal:", e);
            }
        }
        if (id) fetchJournal();
    }, [id]);
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await axios.put(`/api/journal/${id}`, {
                title,
                content,
                mood,
            });
            router.push(`/journal/${id}`);
        } catch (e) {
            console.error("Error updating journal:", e);
            alert("Failed to update journal.");
        }
    }
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Journal</h1>
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
                </select>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">
                    Update Journal
                </button>
            </form>
        </div>
    );
}
