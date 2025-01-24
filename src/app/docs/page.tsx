'use client'
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('getting-started')

  const sections = {
    'getting-started': {
      title: 'Getting Started',
      content: (
        <div className="space-y-4">
          <p>YurForms helps you save and autofill form data across any website. Here's how to get started:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Create your free account</li>
            <li>Install the browser extension</li>
            <li>Start filling forms and save your data</li>
          </ol>
        </div>
      )
    },
    'features': {
      title: 'Features',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Smart Detection</h3>
          <p>Our AI automatically detects form fields and categorizes them correctly.</p>
          
          <h3 className="text-xl font-semibold">Quick Fill</h3>
          <p>Fill entire forms with a single click using your saved information.</p>
          
          <h3 className="text-xl font-semibold">Data Management</h3>
          <p>Easily manage, update, and organize your saved form data.</p>
        </div>
      )
    },
    'security': {
      title: 'Security',
      content: (
        <div className="space-y-4">
          <p>Your data security is our top priority. We implement:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>End-to-end encryption for all stored data</li>
            <li>Secure authentication via Supabase</li>
            <li>Regular security audits</li>
            <li>No third-party data sharing</li>
          </ul>
        </div>
      )
    },
    'faq': {
      title: 'FAQ',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Is my data secure?</h3>
            <p>Yes, we use industry-standard encryption to protect your information.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">How do I update my saved data?</h3>
            <p>Access your dashboard and click on the edit button next to any saved form field.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Can I export my data?</h3>
            <p>Yes, you can export all your saved data from the dashboard settings.</p>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors flex flex-col">
      <Nav />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <nav className="sticky top-8 space-y-2">
              {Object.entries(sections).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === key
                      ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile section selector */}
          <div className="mb-8 lg:hidden">
            <div className="relative">
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value)}
                className="w-full h-12 px-4 appearance-none rounded-xl border bg-white dark:bg-black 
                border-gray-200 dark:border-gray-800 text-black dark:text-white 
                focus:border-black dark:focus:border-white focus:ring-2 
                focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none transition-all"
              >
                {Object.entries(sections).map(([key, section]) => (
                  <option 
                    key={key} 
                    value={key} 
                    className="py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    {section.title}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg 
                  className="w-4 h-4 text-gray-600 dark:text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="w-full max-w-3xl">
              <h1 className="text-3xl font-bold text-black dark:text-white mb-6 transition-all duration-300 ease-in-out w-full">
                {sections[activeSection as keyof typeof sections].title}
              </h1>
              <div className="prose dark:prose-invert w-full transition-opacity duration-300 ease-in-out">
                <div className="w-full">
                  {sections[activeSection as keyof typeof sections].content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}