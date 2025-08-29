"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewEntryPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [mood, setMood] = useState("");
    const router = useRouter();
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
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
            console.log(e);
        }
    }
    return (
        <div>
            <h1>Create A New Journal Entry</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    rows={6}
                    required
                />
                <select
                    value={mood}
                    onChange={(e) => {
                        setMood(e.target.value);
                    }}
                >
                    <option value="">Select mood</option>
                    <option value="happy">😊 Happy</option>
                    <option value="sad">😢 Sad</option>
                    <option value="neutral">😐 Neutral</option>
                </select>
                <button>Create</button>
            </form>
        </div>
    );
}
