import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
export const NEXT_AUTH = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                name: {
                    label: "name",
                    type: "text",
                    placeholder: "name",
                },
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
                let user = await prisma.user.findUnique({
                    where: {
                        email: credentials.username,
                    },
                });
                if (user) {
                    if (!user.password) {
                        console.log("User exists but has no password");
                        return null;
                    }
                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (!isValid) {
                        console.log("Invalid password");
                        return null;
                    }
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    };
                } else {
                    try {
                        const hashedPassword = await bcrypt.hash(
                            credentials.password,
                            12
                        );
                        user = await prisma.user.create({
                            data: {
                                email: credentials.username,
                                name: credentials.name || "User",
                                password: hashedPassword,
                            },
                        });
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                        };
                    } catch (e) {
                        console.log("Error creating user:", e);
                        return null;
                    }
                }
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
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name || "User";
            session.user.email = token.email;
            return session;
        },
        async redirect({ url, baseUrl }: any) {
            if (url.startsWith(baseUrl)) return url;
            // always go to dashboard after login
            return `${baseUrl}/dashboard`;
        },
    },
    session: {
        strategy: "jwt" as const,
    },
    pages: {
        signIn: "/auth/signin",
    },
};
