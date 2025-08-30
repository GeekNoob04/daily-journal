"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteJournal({ journalId }: { journalId: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    async function handleDelete() {
        setLoading(true);
        try {
            await axios.delete(`/api/journal/${journalId}`);
            router.push("/dashboard");
        } catch (error) {
            console.error("Failed to delete journal", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
            >
                {loading ? "Deleting..." : "Delete Journal"}
            </button>
        </div>
    );
}
