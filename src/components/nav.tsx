'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Logo } from "@/components/ui/logo"
import { useTheme } from "next-themes"
import { createClient } from '@/config/supabase/client'
import { useRouter } from 'next/navigation'

export function Nav() {
  const { theme, setTheme } = useTheme()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    }
    
    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="hidden sm:block text-2xl font-bold text-black dark:text-white">
                YurForms
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsMenuOpen(!isMenuOpen)
                  }}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center 
                  hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-sm">👤</span>
                </button>

                {isMenuOpen && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-black rounded-xl border 
                    border-gray-200 dark:border-gray-800 shadow-lg z-50"
                  >
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-black 
                      dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-black 
                      dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <hr className="my-2 border-gray-200 dark:border-gray-800" />
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-400 
                      hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                Sign In
              </Link>
            )}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-900"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}