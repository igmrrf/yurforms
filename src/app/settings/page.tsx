'use client'
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from '@/config/supabase/client'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export default function Settings() {
  const [activeSection, setActiveSection] = useState('Profile')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    autoFill: true,
    notifications: true,
    darkMode: false
  })
  
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth/signin')
        return
      }
      
      // Get user preferences from database
      const { data: preferences } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', session.user.id)
        .single()

      setUser(session.user)
      setFormData(prev => ({
        ...prev,
        email: session.user.email || '',
        fullName: session.user.user_metadata?.full_name || '',
        username: session.user.user_metadata?.username || '',
        autoFill: preferences?.auto_fill ?? true,
        notifications: preferences?.notifications ?? true,
        darkMode: preferences?.dark_mode ?? false
      }))
    }
    
    checkAuth()
  }, [router, supabase])

  const handleSave = async () => {
    setLoading(true)
    try {
      // Update user metadata
      const { error: userError } = await supabase.auth.updateUser({
        data: { 
          full_name: formData.fullName,
          username: formData.username
        }
      })

      if (userError) throw userError

      // Update user preferences
      const { error: prefError } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user?.id,
          auto_fill: formData.autoFill,
          notifications: formData.notifications,
          dark_mode: formData.darkMode,
          updated_at: new Date().toISOString()
        })

      if (prefError) throw prefError

      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully."
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.")
    if (!confirmed) return

    try {
      setLoading(true)
      
      // Delete user preferences first
      const { error: prefError } = await supabase
        .from('user_preferences')
        .delete()
        .eq('user_id', user?.id)

      if (prefError) throw prefError

      // Delete user forms and related data
      const { error: formsError } = await supabase
        .from('forms')
        .delete()
        .eq('user_id', user?.id)

      if (formsError) throw formsError

      // Finally delete the user account
      const { error: userError } = await supabase.auth.admin.deleteUser(user?.id || '')
      if (userError) throw userError

      // Sign out the user
      await supabase.auth.signOut()

      toast({
        title: "Account deleted",
        description: "Your account and all associated data have been permanently deleted."
      })
      
      router.push('/auth/signin')
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const sections = [
    { id: 'Profile', label: 'Profile' },
    { id: 'Account', label: 'Account' }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors flex flex-col">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">Settings</h1>
          <button
            className="px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-medium 
            hover:bg-gray-900 dark:hover:bg-gray-100 transition-all disabled:opacity-50"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-3">
            <nav className="space-y-1 sticky top-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-9 space-y-8">
            {activeSection === 'Profile' && (
              <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold text-black dark:text-white mb-6">Profile</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                    <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 
                      text-black dark:text-white hover:border-black dark:hover:border-white transition-all">
                      Change Photo
                    </button>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border bg-white dark:bg-black 
                        border-gray-200 dark:border-gray-800 text-black dark:text-white 
                        focus:border-black dark:focus:border-white focus:ring-2 
                        focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border bg-white dark:bg-black 
                        border-gray-200 dark:border-gray-800 text-black dark:text-white 
                        focus:border-black dark:focus:border-white focus:ring-2 
                        focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full h-12 px-4 rounded-xl border bg-gray-50 dark:bg-gray-900 
                        border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === 'Account' && (
              <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-semibold text-black dark:text-white mb-6">Account Preferences</h2>
                <div className="space-y-4">
                  {/* Auto-Fill Setting */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-black 
                    border border-gray-200 dark:border-gray-800">
                    <div>
                      <h3 className="font-medium text-black dark:text-white">Auto-Fill Forms</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Automatically fill forms when detected
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.autoFill}
                        onChange={(e) => setFormData({ ...formData, autoFill: e.target.checked })}
                        className="sr-only peer" 
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer 
                        dark:bg-gray-700 peer-checked:bg-black dark:peer-checked:bg-white
                        transition-all duration-300 ease-in-out">
                        <span className="absolute inset-y-0 left-0 w-5 h-5 m-0.5
                          bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out
                          peer-checked:translate-x-5 dark:border-gray-600" />
                      </div>
                    </label>
                  </div>

                  {/* Notifications Setting */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-black 
                    border border-gray-200 dark:border-gray-800">
                    <div>
                      <h3 className="font-medium text-black dark:text-white">Notifications</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive notifications about form updates
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.notifications}
                        onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
                        dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                        after:transition-all dark:border-gray-600 peer-checked:bg-black dark:peer-checked:bg-white">
                      </div>
                    </label>
                  </div>

                  {/* Dark Mode Setting */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-black 
                    border border-gray-200 dark:border-gray-800">
                    <div>
                      <h3 className="font-medium text-black dark:text-white">Dark Mode</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Toggle dark mode appearance
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.darkMode}
                        onChange={(e) => setFormData({ ...formData, darkMode: e.target.checked })}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
                        dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                        after:transition-all dark:border-gray-600 peer-checked:bg-black dark:peer-checked:bg-white">
                      </div>
                    </label>
                  </div>
                </div>
              </section>
            )}

            {/* Danger Zone - Always visible */}
            <section className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-6">Danger Zone</h2>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}