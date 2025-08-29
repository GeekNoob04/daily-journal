import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

interface JournalPageProps {
    params: { id: string };
}
export default async function JournalPage({ params }: JournalPageProps) {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        redirect("/auth/signin");
    }
    const journalId = params.id;
    const journal = await prisma.journal.findUnique({
        where: { id: journalId },
    });
    if (!journal || journal.userId !== session.user.id) {
        notFound();
    }
    return (
        <div>
            <div>
                <h1>{journal.title}</h1>
                <p>{journal.content}</p>
                <p>
                    Created on:{" "}
                    {new Date(journal.createdAt).toLocaleDateString()}
                </p>
            </div>
            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    );
}
