'use client'
import { useState } from 'react'
import { createClient } from '@/config/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Nav } from "@/components/nav"
import { useToast } from "@/hooks/use-toast"

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClient()
  const { toast } = useToast()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      if (error) throw error
      
      if (data?.user?.identities?.length === 0) {
        toast({
          variant: "destructive",
          title: "Account exists",
          description: "This email is already registered. Please sign in instead."
        })
        return
      }

      localStorage.setItem('verificationEmail', email)
      router.push('/auth/verify')
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4 sm:px-6">
          <div className="rounded-2xl p-6 sm:p-8 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Create your account</h2>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border bg-white dark:bg-black border-gray-200 dark:border-gray-800 
                  text-black dark:text-white focus:border-black dark:focus:border-white focus:ring-2 
                  focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border bg-white dark:bg-black border-gray-200 dark:border-gray-800 
                  text-black dark:text-white focus:border-black dark:focus:border-white focus:ring-2 
                  focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-black dark:bg-white text-white dark:text-black font-medium 
                hover:bg-gray-900 dark:hover:bg-gray-100 transition-all"
              >
                Sign Up
              </button>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-black dark:text-white hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}