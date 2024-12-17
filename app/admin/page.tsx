'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  IconDeviceDesktopAnalytics, 
  IconMessageCircle, 
  IconBrandStackshare 
} from '@tabler/icons-react'

const adminSections = [
  {
    title: 'Skills Management',
    description: 'Add, edit, and manage your professional skills',
    href: '/admin/skills',
    icon: IconBrandStackshare
  },
  {
    title: 'Projects Management',
    description: 'Showcase and update your portfolio projects',
    href: '/admin/projects',
    icon: IconDeviceDesktopAnalytics
  },
  {
    title: 'Testimonials Management',
    description: 'Manage client testimonials and recommendations',
    href: '/admin/testimonials',
    icon: IconMessageCircle
  }
]

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-purple-400"
        >
          Portfolio Admin Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {adminSections.map((section, index) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 
                }}
              >
                <Link href={section.href}>
                  <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-600 transition-all duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="bg-purple-600/20 p-3 rounded-full mr-4">
                        <Icon 
                          className="text-purple-400 w-8 h-8 group-hover:scale-110 transition-transform" 
                        />
                      </div>
                      <h2 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {section.title}
                      </h2>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {section.description}
                    </p>
                    <div className="mt-4 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Manage →
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
