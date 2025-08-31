import JournalCard from "@/components/JournalCard";
import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        redirect("/api/auth/signin");
    }
    const journals = await prisma.journal.findMany({
        where: {
            user: {
                email: session.user.email,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Your Journals</h1>
                <Link
                    href="/dashboard/new"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Create New Journal
                </Link>
            </div>

            {journals.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">
                        No journals yet. Create your first one!
                    </p>
                    <Link
                        href="/dashboard/new"
                        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Create Your First Journal
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {journals.map((journal) => (
                        <JournalCard key={journal.id} journal={journal} />
                    ))}
                </div>
            )}
        </div>
    );
}
