'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaProjectDiagram, 
  FaCode, 
  FaCommentDots, 
  FaCog 
} from 'react-icons/fa'

const MENU_ITEMS = [
  { 
    href: '/admin', 
    label: 'Dashboard', 
    icon: <FaHome className="w-5 h-5" /> 
  },
  { 
    href: '/admin/projects', 
    label: 'Projects', 
    icon: <FaProjectDiagram className="w-5 h-5" /> 
  },
  { 
    href: '/admin/skills', 
    label: 'Skills', 
    icon: <FaCode className="w-5 h-5" /> 
  },
  { 
    href: '/admin/testimonials', 
    label: 'Testimonials', 
    icon: <FaCommentDots className="w-5 h-5" /> 
  },
  { 
    href: '/admin/settings', 
    label: 'Settings', 
    icon: <FaCog className="w-5 h-5" /> 
  }
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="flex h-screen">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={toggleSidebar} 
        className="fixed top-4 left-4 z-50 md:hidden text-white bg-gray-800 p-2 rounded"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <nav className="space-y-2">
            {MENU_ITEMS.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={`
                  flex items-center space-x-3 p-3 rounded transition-colors duration-200
                  ${pathname === item.href 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700 text-gray-300'}
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={closeSidebar} 
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
        />
      )}

      {/* Main Content */}
      <main 
        className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-800 p-6 md:p-10"
        onClick={isSidebarOpen ? closeSidebar : undefined}
      >
        {children}
      </main>
    </div>
  )
}
