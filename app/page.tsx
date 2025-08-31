import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";

export default async function HomePage() {
    const session = await getServerSession(NEXT_AUTH);

    if (!session) {
        redirect("/api/auth/signin");
    } else {
        redirect("/dashboard");
    }
}
