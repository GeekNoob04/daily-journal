"use client";

import { signIn, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Check if user is already logged in
        const checkSession = async () => {
            const session = await getSession();
            if (session) {
                router.push("/dashboard");
            }
        };
        checkSession();
    }, [router]);

    const handleCredentialsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                username: email,
                password,
                name: isSignUp ? name : undefined,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid credentials. Please try again.");
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOAuthSignIn = async (provider: string) => {
        setLoading(true);
        try {
            await signIn(provider, { callbackUrl: "/dashboard" });
        } catch (err) {
            setError("Failed to sign in with " + provider);
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-100 flex flex-col lg:flex-row overflow-hidden">
            {/* Left Side - Features & Branding */}
            <div className="hidden md:flex lg:w-1/2 bg-gradient-to-br from-amber-50 to-orange-50 items-center justify-center p-4 md:p-6 lg:p-12">
                <div className="max-w-lg w-full">
                    {/* Hero Section */}
                    <div className="mb-6 lg:mb-10">
                        <div className="text-5xl md:text-6xl lg:text-7xl mb-4 lg:mb-8 animate-pulse text-center md:text-left">
                            📔
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 mb-3 lg:mb-6 leading-tight text-center md:text-left">
                            Memento
                        </h2>
                        <p className="text-base lg:text-lg text-amber-800 leading-relaxed mb-4 lg:mb-6 text-center md:text-left">
                            Transform your thoughts into lasting memories. Track
                            your moods, reflect on your experiences, and
                            discover patterns in your personal journey.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 lg:space-y-4">
                        <div className="flex items-center space-x-3 lg:space-x-4 bg-white/70 backdrop-blur-sm p-3 lg:p-4 rounded-xl border border-amber-100 hover:bg-white/90 transition-all duration-300 hover:shadow-md">
                            <div className="bg-gradient-to-br from-purple-300 to-red-300 p-2 lg:p-3 rounded-full shadow-sm flex-shrink-0">
                                <span className="text-xl lg:text-2xl">✨</span>
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-semibold text-amber-900 mb-1 text-sm lg:text-base">
                                    Mindful Reflection
                                </h3>
                                <p className="text-amber-700 text-xs lg:text-sm">
                                    Create a sacred space for your thoughts and
                                    emotions
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 lg:space-x-4 bg-white/70 backdrop-blur-sm p-3 lg:p-4 rounded-xl border border-amber-100 hover:bg-white/90 transition-all duration-300 hover:shadow-md">
                            <div className="bg-gradient-to-br from-blue-200 to-indigo-200 p-2 lg:p-3 rounded-full shadow-sm flex-shrink-0">
                                <span className="text-xl lg:text-2xl">📊</span>
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-semibold text-amber-900 mb-1 text-sm lg:text-base">
                                    Mood Patterns
                                </h3>
                                <p className="text-amber-700 text-xs lg:text-sm">
                                    Understand your emotional journey through
                                    time
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 lg:space-x-4 bg-white/70 backdrop-blur-sm p-3 lg:p-4 rounded-xl border border-amber-100 hover:bg-white/90 transition-all duration-300 hover:shadow-md">
                            <div className="bg-gradient-to-br from-green-200 to-emerald-200 p-2 lg:p-3 rounded-full shadow-sm flex-shrink-0">
                                <span className="text-xl lg:text-2xl">🛡️</span>
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-semibold text-amber-900 mb-1 text-sm lg:text-base">
                                    Private & Secure
                                </h3>
                                <p className="text-amber-700 text-xs lg:text-sm">
                                    Your personal thoughts remain completely
                                    private
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonial */}
                    <div className="mt-6 lg:mt-8 p-4 lg:p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200 shadow-lg">
                        <p className="text-amber-800 italic text-center mb-2 text-xs lg:text-sm">
                            Writing is the medicine I need to heal myself and be
                            the healthiest version of me.
                        </p>
                        <p className="text-amber-600 text-xs text-center font-medium">
                            — Breanna Wilson
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 bg-stone-50 overflow-y-auto min-h-screen lg:min-h-0">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="text-center mb-6 md:hidden">
                        <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-2">
                            📔 Memento
                        </h1>
                    </div>

                    {/* Tablet Logo (visible on md screens when left side is hidden) */}
                    <div className="text-center mb-6 hidden md:block lg:hidden">
                        <h1 className="text-4xl font-bold text-amber-900 mb-2">
                            📔 Memento
                        </h1>
                        <p className="text-amber-700 text-sm">
                            Transform your thoughts into lasting memories
                        </p>
                    </div>

                    {/* Auth Form */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-stone-200">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-3">
                                {isSignUp ? "Join Us Today" : "Welcome Back"}
                            </h2>
                            <p className="text-sm sm:text-base text-stone-600">
                                {isSignUp
                                    ? "Begin your journaling journey"
                                    : "Continue your reflection practice"}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {/* OAuth Buttons */}
                        <div className="space-y-3 mb-6">
                            <button
                                onClick={() => handleOAuthSignIn("google")}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 px-4 sm:px-6 py-3 border border-stone-200 rounded-xl hover:bg-stone-50 transition-all duration-200 disabled:opacity-50 text-stone-700 font-medium shadow-sm text-sm sm:text-base"
                            >
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                <span className="truncate">
                                    Continue with Google
                                </span>
                            </button>

                            <button
                                onClick={() => handleOAuthSignIn("github")}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 px-4 sm:px-6 py-3 border border-stone-200 rounded-xl hover:bg-stone-50 transition-all duration-200 disabled:opacity-50 text-stone-700 font-medium shadow-sm text-sm sm:text-base"
                            >
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                </svg>
                                <span className="truncate">
                                    Continue with GitHub
                                </span>
                            </button>
                        </div>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-stone-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-stone-500 font-medium">
                                    Or with email
                                </span>
                            </div>
                        </div>

                        {/* Email/Password Form */}
                        <form
                            onSubmit={handleCredentialsSubmit}
                            className="space-y-4"
                        >
                            {isSignUp && (
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50 placeholder-stone-500 text-stone-800 text-sm sm:text-base"
                                    required
                                />
                            )}
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50 placeholder-stone-500 text-stone-800 text-sm sm:text-base"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50 placeholder-stone-500 text-stone-800 text-sm sm:text-base"
                                required
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-stone-700 to-stone-800 text-white py-3 rounded-xl hover:from-stone-800 hover:to-stone-900 transition-all duration-200 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.01] text-sm sm:text-base"
                            >
                                {loading
                                    ? "Please wait..."
                                    : isSignUp
                                    ? "Create Your Account"
                                    : "Sign In to Continue"}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-amber-600 hover:text-amber-700 font-medium transition-colors text-sm sm:text-base"
                            >
                                {isSignUp
                                    ? "Already have an account? Sign in"
                                    : "New here? Create an account"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
