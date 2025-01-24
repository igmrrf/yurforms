'use client'
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function Features() {
  const features = [
    {
      title: "Smart Form Detection",
      description: "Our AI-powered system automatically identifies form fields across any website, making form filling effortless.",
      icon: "🔍",
      details: [
        "Automatic field recognition",
        "Context-aware field mapping",
        "Support for complex forms",
        "Multi-page form detection"
      ]
    },
    {
      title: "Quick Fill",
      description: "Fill entire forms with a single click using your saved information, saving you time and reducing errors.",
      icon: "⚡",
      details: [
        "One-click form filling",
        "Smart data mapping",
        "Custom field templates",
        "Bulk form filling"
      ]
    },
    {
      title: "Secure Storage",
      description: "Your data is encrypted and stored securely, giving you peace of mind while using our service.",
      icon: "🔒",
      details: [
        "End-to-end encryption",
        "Secure cloud storage",
        "Local data backup",
        "Privacy controls"
      ]
    },
    {
      title: "Cross-Platform",
      description: "Access your form data across all your devices with our seamless cross-platform support.",
      icon: "🌐",
      details: [
        "Browser extension",
        "Mobile support",
        "Cloud sync",
        "Offline access"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors flex flex-col">
      <Nav />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-6">
              Features
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover how YurForms makes form filling faster, easier, and more secure than ever before.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">
                  {feature.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail) => (
                    <li 
                      key={detail}
                      className="flex items-center text-gray-600 dark:text-gray-400"
                    >
                      <span className="mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <a
              href="/auth/signup"
              className="inline-block px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-all"
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