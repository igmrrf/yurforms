"use client";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { createClient } from '@/config/supabase/client'
import { useEffect, useState } from 'react'

export default function HomePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setIsAuthenticated(!!session)
        }
        checkAuth()
    }, [supabase.auth])

    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors flex flex-col">
            <Nav />
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-6">
                        Welcome to YurForms
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Your personal form assistant. Save time and eliminate errors with our smart form filling solution.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            title: "Smart Detection",
                            description: "Automatically detect form fields across any website",
                            icon: "🔍"
                        },
                        {
                            title: "Quick Fill",
                            description: "Fill forms with a single click using your saved information",
                            icon: "⚡"
                        },
                        {
                            title: "Secure Storage",
                            description: "Your data is encrypted and stored securely",
                            icon: "🔒"
                        }
                    ].map((feature) => (
                        <div key={feature.title} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
                            <div className="text-3xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <Link
                        href={isAuthenticated ? "/dashboard" : "/auth/signup"}
                        className="inline-block px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-all duration-200"
                    >
                        {isAuthenticated ? "Go to Dashboard →" : "Get Started →"}
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}