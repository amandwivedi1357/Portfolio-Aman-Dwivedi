'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TextGenerateEffect } from './ui/text-generate-effect'

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<{
    id: string
    name: string
    role: string
    quote: string
    company?: string
    imageUrl?: string
  }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials')
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials')
        }
        const data = await response.json()
        setTestimonials(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return (
    <div className="py-20 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <TextGenerateEffect 
          words="Testimonials" 
          className="text-4xl font-bold text-center mb-16 text-purple-400" 
        />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-600 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {testimonial.imageUrl && (
                    <img 
                      src={testimonial.imageUrl} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    {testimonial.company && (
                      <p className="text-xs text-gray-500">{testimonial.company}</p>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
