'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

const TestimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  quote: z.string().min(1, "Quote is required"),
  company: z.string().optional(),
  imageUrl: z.string().optional()
})

type Testimonial = {
  id?: string
  name: string
  role: string
  quote: string
  company?: string
  imageUrl?: string
}

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)

  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    formState: { errors } 
  } = useForm<Testimonial>({
    resolver: zodResolver(TestimonialSchema)
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || 'Failed to fetch testimonials')
      }
      
      const data = await response.json()
      setTestimonials(data)
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to fetch testimonials')
    }
  }

  const onSubmit = async (data: Testimonial) => {
    try {
      let response: Response;
      const toastId = toast.loading(editingTestimonial ? 'Updating testimonial...' : 'Adding testimonial...')

      try {
        const requestBody = editingTestimonial 
          ? { ...data, id: editingTestimonial.id } 
          : data

        response = await fetch('/api/testimonials', {
          method: editingTestimonial ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        })
        
        // Parse the response
        const responseData = await response.json()
        
        // Check if the response was not ok
        if (!response.ok) {
          // Throw an error with details from the server
          throw new Error(responseData.details || 'Failed to submit testimonial')
        }

        // Success toast
        toast.success(editingTestimonial ? 'Testimonial updated successfully!' : 'Testimonial added successfully!', { id: toastId })

        // Refresh testimonials list
        fetchTestimonials()
        
        // Reset form
        reset()
        setEditingTestimonial(null)
      } catch (error) {
        // Error toast
        toast.error(error instanceof Error ? error.message : 'An unexpected error occurred', { id: toastId })
      }
    } catch (error) {
      console.error('Testimonial Submission Error:', error)
      toast.error('An unexpected error occurred')
    }
  }

  const handleDelete = async (id: string) => {
    const toastId = toast.loading('Deleting testimonial...')
    try {
      const response = await fetch(`/api/testimonials?id=${id}`, {
        method: 'DELETE'
      })
      
      const responseData = await response.json()
      
      if (!response.ok) {
        throw new Error(responseData.details || 'Failed to delete testimonial')
      }
      
      toast.success('Testimonial deleted successfully!', { id: toastId })
      fetchTestimonials()
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to delete testimonial', { id: toastId })
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setValue('name', testimonial.name)
    setValue('role', testimonial.role)
    setValue('quote', testimonial.quote)
    setValue('company', testimonial.company || '')
    setValue('imageUrl', testimonial.imageUrl || '')
  }

  const cancelEdit = () => {
    setEditingTestimonial(null)
    reset()
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold mb-6">Testimonials Management</h1>
      
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-gray-800 p-6 rounded-lg space-y-4"
      >
        <div>
          <label htmlFor="name" className="block mb-2">Name</label>
          <input 
            {...register('name')}
            id="name"
            className="w-full bg-gray-700 text-white p-2 rounded"
            placeholder="Enter name"
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="role" className="block mb-2">Role</label>
          <input 
            {...register('role')}
            id="role"
            className="w-full bg-gray-700 text-white p-2 rounded"
            placeholder="Enter role"
          />
          {errors.role && (
            <p className="text-red-500 mt-1">{errors.role.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="quote" className="block mb-2">Quote</label>
          <textarea 
            {...register('quote')}
            id="quote"
            className="w-full bg-gray-700 text-white p-2 rounded"
            placeholder="Enter testimonial quote"
            rows={3}
          />
          {errors.quote && (
            <p className="text-red-500 mt-1">{errors.quote.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block mb-2">Company (Optional)</label>
          <input 
            {...register('company')}
            id="company"
            className="w-full bg-gray-700 text-white p-2 rounded"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block mb-2">Image URL (Optional)</label>
          <input 
            {...register('imageUrl')}
            id="imageUrl"
            className="w-full bg-gray-700 text-white p-2 rounded"
            placeholder="Enter image URL"
          />
        </div>

        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
          </button>
          
          {editingTestimonial && (
            <button 
              type="button" 
              onClick={cancelEdit}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Existing Testimonials</h2>
        {testimonials.length === 0 ? (
          <p className="text-gray-400">No testimonials found. Add your first testimonial!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map(testimonial => (
              <div 
                key={testimonial.id} 
                className="bg-gray-700 p-4 rounded-lg flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                  <p className="italic mt-2 text-sm">{testimonial.quote}</p>
                  {testimonial.company && (
                    <p className="text-xs text-gray-500 mt-1">
                      {testimonial.company}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2 mt-4">
                  <button 
                    onClick={() => handleEdit(testimonial)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(testimonial.id!)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
