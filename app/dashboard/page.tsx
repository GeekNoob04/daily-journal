import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        redirect("/api/auth/signin");
    }
    const journal = await prisma.journal.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return (
        <div>
            <h1>Your Journals</h1>
            <ul>
                {journal.map((journal) => (
                    <li key={journal.id}>
                        <h2>{journal.title}</h2>
                        <p>{journal.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
