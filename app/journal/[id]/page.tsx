import DeleteJournal from "@/components/DeleteJournal";
import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface JournalPageProps {
    params: Promise<{ id: string }>;
}
export default async function JournalPage({ params }: JournalPageProps) {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        redirect("/auth/signin");
    }
    const { id: journalId } = await params;
    const journal = await prisma.journal.findUnique({
        where: { id: journalId },
    });
    if (!journal || journal.userId !== session.user.id) {
        notFound();
    }
    return (
        <div>
            <h1 className="p-6">{journal.title}</h1>
            <p className="mt-2">{journal.content}</p>
            <p className="text-gray-500 mt-2">
                Created on: {new Date(journal.createdAt).toLocaleDateString()}
            </p>
            <div className="flex gap-2 mt-4">
                <Link
                    href={`/dashboard/${journal.id}/edit`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Edit Journal
                </Link>
                <DeleteJournal journalId={journalId} />
            </div>
        </div>
    );
}
