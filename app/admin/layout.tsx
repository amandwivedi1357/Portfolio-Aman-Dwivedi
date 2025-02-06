'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ToastProvider } from '@/components/ToastProvider'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'

const adminNavItems = [
  { href: '/admin/skills', label: 'Skills' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/testimonials', label: 'Testimonials' },
]

export default function AdminLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const pathname = usePathname()

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <div className="min-h-screen bg-black text-white flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900 p-6 border-r border-gray-800">
            <h2 className="text-2xl font-bold mb-10 text-purple-400">Admin Panel</h2>
            <nav className="space-y-4">
              {adminNavItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`block py-2 px-4 rounded-lg transition-all duration-300 ${
                    pathname === item.href 
                      ? 'bg-purple-600 text-white' 
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-10 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 rounded-xl p-8 min-h-full"
            >
              {children}
              <ToastProvider />
            </motion.div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  )
}
