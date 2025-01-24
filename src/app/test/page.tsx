'use client'
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function Test() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors flex flex-col">
      <Nav />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white">Test YurForms</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Fill out this sample form to see how YurForms auto-fill works
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border bg-white dark:bg-black 
                    border-gray-200 dark:border-gray-800 text-black dark:text-white 
                    focus:border-black dark:focus:border-white focus:ring-2 
                    focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border bg-white dark:bg-black 
                    border-gray-200 dark:border-gray-800 text-black dark:text-white 
                    focus:border-black dark:focus:border-white focus:ring-2 
                    focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border bg-white dark:bg-black 
                  border-gray-200 dark:border-gray-800 text-black dark:text-white 
                  focus:border-black dark:focus:border-white focus:ring-2 
                  focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border bg-white dark:bg-black 
                  border-gray-200 dark:border-gray-800 text-black dark:text-white 
                  focus:border-black dark:focus:border-white focus:ring-2 
                  focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border bg-white dark:bg-black 
                  border-gray-200 dark:border-gray-800 text-black dark:text-white 
                  focus:border-black dark:focus:border-white focus:ring-2 
                  focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border bg-white dark:bg-black 
                    border-gray-200 dark:border-gray-800 text-black dark:text-white 
                    focus:border-black dark:focus:border-white focus:ring-2 
                    focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border bg-white dark:bg-black 
                    border-gray-200 dark:border-gray-800 text-black dark:text-white 
                    focus:border-black dark:focus:border-white focus:ring-2 
                    focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border bg-white dark:bg-black 
                    border-gray-200 dark:border-gray-800 text-black dark:text-white 
                    focus:border-black dark:focus:border-white focus:ring-2 
                    focus:ring-black dark:focus:ring-white focus:ring-opacity-20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black 
                  font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-all"
                >
                  Submit Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}