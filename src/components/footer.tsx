'use client'
import Link from 'next/link'
import { Logo } from "@/components/ui/logo"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your personal form assistant
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8 sm:gap-16">
            <div>
              <h3 className="font-semibold text-black dark:text-white mb-3 text-center sm:text-left">Product</h3>
              <ul className="space-y-2 text-center sm:text-left">
                <li>
                  <Link href="/features" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-black dark:text-white mb-3 text-center sm:text-left">Support</h3>
              <ul className="space-y-2 text-center sm:text-left">
                <li>
                  <Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-black dark:text-white mb-3 text-center sm:text-left">Legal</h3>
              <ul className="space-y-2 text-center sm:text-left">
                <li>
                  <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          © {currentYear} YurForms. All rights reserved.
        </div>
      </div>
    </footer>
  )
}