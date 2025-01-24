'use client'
import { Nav } from "@/components/nav"
import Link from 'next/link'
import { createClient } from '@/config/supabase/client'
import { useState, useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'

export default function VerifyEmail() {
  const [isResending, setIsResending] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const supabase = createClient()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const storedEmail = localStorage.getItem('verificationEmail')
    
    if (!storedEmail) {
      router.push('/auth/signup')
      return
    }
    setEmail(storedEmail)
  }, [router])

  useEffect(() => {
    return () => {
      if (window.location.pathname !== '/auth/verify') {
        localStorage.removeItem('verificationEmail')
      }
    }
  }, [])

  const handleResend = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email address is missing"
      })
      return
    }

    setIsResending(true)
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email
    })
    
    toast({
      variant: error ? "destructive" : "default",
      title: error ? "Error" : "Success",
      description: error ? error.message : "Verification email has been resent"
    })
    
    setIsResending(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4 sm:px-6">
          <div className="rounded-2xl p-6 sm:p-8 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">✉️</span>
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Check your email</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We've sent you a verification link to your email address. Please click the link to verify your account.
            </p>
            <Link
              href="/"
              className="inline-block w-full h-12 rounded-xl bg-black dark:bg-white text-white dark:text-black font-medium 
              hover:bg-gray-900 dark:hover:bg-gray-100 transition-all text-center leading-[48px]"
            >
              Return to Home
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Didn't receive the email?{" "}
              <button 
                onClick={handleResend}
                disabled={isResending}
                className="text-black dark:text-white hover:underline disabled:opacity-50 disabled:hover:no-underline"
              >
                {isResending ? "Sending..." : "Resend verification email"}
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}