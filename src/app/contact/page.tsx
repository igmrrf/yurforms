'use client'
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    })
    
    setName('')
    setEmail('')
    setMessage('')
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors flex flex-col">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
              Contact Us
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Have questions about YurForms? We're here to help. Send us a message and we'll respond as soon as possible.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-2">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  support@yurforms.com
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-black dark:text-white mb-2">Office Hours</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Monday - Friday<br />
                  9:00 AM - 5:00 PM EST
                </p>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 px-4 rounded-xl border bg-white dark:bg-black border-gray-200 dark:border-gray-800 
                  text-black dark:text-white focus:border-black dark:focus:border-white focus:ring-2 
                  focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none transition-all"
                  required
                />
              </div>
              
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
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-black border-gray-200 dark:border-gray-800 
                  text-black dark:text-white focus:border-black dark:focus:border-white focus:ring-2 
                  focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none transition-all"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-black dark:bg-white text-white dark:text-black font-medium 
                hover:bg-gray-900 dark:hover:bg-gray-100 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}