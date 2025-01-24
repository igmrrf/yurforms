'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div 
        className="fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out
        sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:w-full"
      >
        <div className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[90vh] overflow-auto">
          {title && (
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-black dark:text-white">{title}</h3>
            </div>
          )}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="fixed inset-0 z-40 cursor-default focus:outline-none"
        aria-label="Close modal"
      />
    </div>,
    document.body
  )
}