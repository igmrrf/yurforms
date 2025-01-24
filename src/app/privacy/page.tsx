'use client'
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function Privacy() {
  const lastUpdated = "December 15, 2023"

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors flex flex-col">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-black dark:text-white">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-400">Last updated: {lastUpdated}</p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p>
              YurForms ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our form-filling service.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">1. Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address and account credentials</li>
              <li>Name and contact information</li>
              <li>Form data you choose to save</li>
              <li>Payment information (if applicable)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2. Usage Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Form filling patterns</li>
              <li>Service usage statistics</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To improve form detection accuracy</li>
              <li>To personalize your experience</li>
              <li>To communicate with you about service updates</li>
              <li>To prevent fraud and ensure security</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Data Storage and Security</h2>
            <p className="mb-4">We implement robust security measures to protect your data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>End-to-end encryption for all stored form data</li>
              <li>Regular security audits and penetration testing</li>
              <li>Secure data centers with redundant backups</li>
              <li>Access controls and authentication protocols</li>
              <li>Regular security updates and monitoring</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Data Sharing and Third Parties</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers who assist in operating our service</li>
              <li>Law enforcement when required by law</li>
              <li>Third parties with your explicit consent</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request data deletion</li>
              <li>Export your data</li>
              <li>Opt-out of non-essential data collection</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13. We do not knowingly collect information from children under 13 years of age.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mt-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:{" "}
              <a href="mailto:privacy@yurforms.com" className="text-black dark:text-white hover:underline">
                privacy@yurforms.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}