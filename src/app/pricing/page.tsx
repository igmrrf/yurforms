'use client'
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors flex flex-col">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
            Our Pricing Plans
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your form-filling needs
          </p>
        </div>

        <div className="max-w-lg mx-auto bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl">
          <div className="text-center mb-6">
            <span className="text-5xl mb-4">🎉</span>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
              Plot Twist!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Why did the form go to therapy?<br />
              Because it had too many fields to fill! 
            </p>
            <div className="text-4xl font-bold text-black dark:text-white mb-2">
              It's Free!
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              No hidden fees, no premium tiers.<br />
              Just a simple tool to make your life easier.
            </p>
          </div>

          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="mr-2">✨</span>
              Unlimited form fills
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="mr-2">✨</span>
              Smart field detection
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="mr-2">✨</span>
              Secure data storage
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="mr-2">✨</span>
              Cross-platform support
            </li>
          </ul>

          <div className="text-center">
            <a
              href="/auth/signup"
              className="inline-block w-full px-8 py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-all"
            >
              Get Started For Free →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}