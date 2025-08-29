import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import prisma from "./prisma";
export const NEXT_AUTH = {
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
};
