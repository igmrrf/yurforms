'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/config/supabase/client'
import { useRouter } from 'next/navigation'
import { Nav } from "@/components/nav"
import { useSavedForms } from '@/hooks/use-saved-forms'
import { User } from '@supabase/supabase-js'

export default function Dashboard() {
  const { forms, loading: formsLoading, deleteForm } = useSavedForms()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState({
    totalForms: 0,
    formsFilled: 0,
    timeSaved: 0
  })
  const router = useRouter()
  const supabase = createClient()

  // Auth check and get user data
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth/signin')
        return
      }
      setUser(session.user)
      setIsLoading(false)
    }
    
    checkAuth()
  }, [router, supabase.auth])

  // Stats calculation - Add null check for forms
  // Stats calculation
    useEffect(() => {
      if (!formsLoading && Array.isArray(forms)) {
        setStats({
          totalForms: forms.length,
          formsFilled: forms.reduce((acc, form) => acc + (form.fill_count || 0), 0),
          // Assuming each form fill saves 2 minutes on average if time_saved is not available
          timeSaved: forms.reduce((acc, form) => acc + (form.time_saved || form.fill_count * 2 || 0), 0)
        })
      }
    }, [forms, formsLoading])

  if (isLoading || formsLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black transition-colors flex flex-col">
        <Nav />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin text-2xl">⏳</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors flex flex-col">
      <Nav />
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Dashboard
            </h1>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Saved Forms</h3>
              <p className="text-2xl font-bold text-black dark:text-white">
                {formsLoading || !Array.isArray(forms) ? "..." : stats.totalForms}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Forms Filled</h3>
              <p className="text-2xl font-bold text-black dark:text-white">
                {formsLoading ? "..." : stats.formsFilled}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Time Saved</h3>
              <p className="text-2xl font-bold text-black dark:text-white">
                {formsLoading ? "..." : `${(stats.timeSaved / 60).toFixed(1)} hrs`}
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Saved Forms */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-black dark:text-white">Saved Forms</h2>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formsLoading || !Array.isArray(forms) ? "..." : `${forms.length} total`}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {formsLoading ? (
                      <div className="text-center py-4">
                        <div className="animate-spin text-2xl">⏳</div>
                      </div>
                    ) : !Array.isArray(forms) ? (
                      <p className="text-center text-gray-600 dark:text-gray-400 py-4">
                        Error loading forms
                      </p>
                    ) : forms.length === 0 ? (
                      <p className="text-center text-gray-600 dark:text-gray-400 py-4">
                        No saved forms yet
                      </p>
                    ) : (
                      forms.slice(0, 3).map((form) => (
                        <div 
                          key={form.id}
                          onClick={() => router.push(`/forms/${form.id}`)}
                          className="p-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 
                          hover:border-black dark:hover:border-white transition-all cursor-pointer"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-black dark:text-white text-sm">{form.name}</h3>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Last used {new Date(form.updated_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {form.fill_count || 0} fills
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteForm(form.id)
                                }}
                                className="text-red-600 hover:text-red-700 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                  <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {formsLoading ? (
                      <div className="text-center py-4">
                        <div className="animate-spin text-2xl">⏳</div>
                      </div>
                    ) : forms.length === 0 ? (
                      <p className="text-center text-gray-600 dark:text-gray-400 py-4">
                        No recent activity
                      </p>
                    ) : (
                      forms.slice(0, 3).map((form) => (
                        <div 
                          key={form.id}
                          className="flex items-center space-x-3 p-3 rounded-xl bg-white dark:bg-black 
                          border border-gray-200 dark:border-gray-800"
                        >
                          <div className="w-6 h-6 rounded-full bg-black dark:bg-white flex items-center justify-center">
                            <span className="text-white dark:text-black text-xs">✓</span>
                          </div>
                          <div>
                            <p className="font-medium text-black dark:text-white text-sm">
                              {form.name} updated
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {new Date(form.updated_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Rest of the components remain unchanged */}
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Profile Summary */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                // Update the profile section
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-black dark:bg-white"></div>
                  <div>
                    <h3 className="font-semibold text-black dark:text-white">
                      {user?.email?.split('@')[0] || 'User'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Free Plan</p>
                  </div>
                </div>
                <button 
                  onClick={() => router.push('/settings')}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 
                  text-black dark:text-white hover:border-black dark:hover:border-white transition-all"
                >
                  View Profile
                </button>
              </div>

              {/* Rest of the right column remains unchanged */}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}