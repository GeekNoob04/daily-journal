import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH);
    if (!session?.user?.email) {
        return NextResponse.json(
            {
                error: "Unauthorized",
            },
            { status: 401 }
        );
    }
    const body = await req.json();
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const journal = await prisma.journal.create({
        data: {
            title: body.title,
            content: body.content,
            mood: body.mood,
            userId: user.id,
        },
    });
    return NextResponse.json(journal);
}
