import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();
const handler = NextAuth({
    adapter: PrismaAdapter(prisma), // for db storage
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                username: {
                    label: "username",
                    type: "text",
                    placeholder: "email",
                },
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                console.log(credentials);
                return {
                    id: "user 1",
                    name: "Harshit Budhraja",
                    email: "harshitbudhraja0@gmail.com",
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
    ],
});
export { handler as GET, handler as POST };
