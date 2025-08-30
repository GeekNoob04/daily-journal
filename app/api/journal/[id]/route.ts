import { NEXT_AUTH } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const session = await getServerSession(NEXT_AUTH);
    if (!session?.user?.email) {
        return new Response("Unauthorized", { status: 401 });
    }
    const journal = await prisma.journal.findUnique({
        where: { id },
    });
    if (!journal) {
        return new Response("Journal not found", { status: 404 });
    }
    return NextResponse.json(journal);
}
export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const session = await getServerSession(NEXT_AUTH);
    if (!session?.user?.email) {
        return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const journal = await prisma.journal.findUnique({
        where: { id },
        include: { user: true },
    });

    if (!journal || journal.user.email !== session.user.email) {
        return new Response("Forbidden", { status: 403 });
    }
    const updated = await prisma.journal.update({
        where: { id },
        data: {
            title: body.title,
            content: body.content,
            mood: body.mood,
        },
    });
    return NextResponse.json(updated);
}
export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const session = await getServerSession(NEXT_AUTH);
    if (!session?.user?.email) {
        return new Response("Unauthorized", { status: 401 });
    }
    try {
        await prisma.journal.deleteMany({
            where: {
                id,
                user: {
                    email: session.user.email,
                },
            },
        });
        return NextResponse.json({ success: true });
    } catch (e) {
        console.error("Error deleting journal:", e);
        return NextResponse.json("Failed to delete journal.", { status: 500 });
    }
}
