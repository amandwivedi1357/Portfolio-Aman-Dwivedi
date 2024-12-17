'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

const skillCategories = ['Frontend', 'Backend', 'Database', 'ORMs']

const SkillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.enum(skillCategories as [string, ...string[]], {
    errorMap: () => ({ message: "Invalid category" })
  })
})

type Skill = {
  id?: string
  name: string
  category: string
}

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    formState: { errors } 
  } = useForm<Skill>({
    resolver: zodResolver(SkillSchema)
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills')
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || 'Failed to fetch skills')
      }
      
      const data = await response.json()
      setSkills(data)
    } catch (error) {
      console.error('Failed to fetch skills:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to fetch skills')
    }
  }

  const onSubmit = async (data: Skill) => {
    try {
      let response: Response;
      const toastId = toast.loading(editingSkill ? 'Updating skill...' : 'Adding skill...')

      try {
        const requestBody = editingSkill 
          ? { ...data, id: editingSkill.id } 
          : data

        response = await fetch('/api/skills', {
          method: editingSkill ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        })
        
        // Parse the response
        const responseData = await response.json()
        
        // Check if the response was not ok
        if (!response.ok) {
          // Throw an error with details from the server
          throw new Error(responseData.details || 'Failed to submit skill')
        }

        // Success toast
        toast.success(editingSkill ? 'Skill updated successfully!' : 'Skill added successfully!', { id: toastId })

        // Refresh skills list
        fetchSkills()
        
        // Reset form
        reset()
        setEditingSkill(null)
      } catch (error) {
        // Error toast
        toast.error(error instanceof Error ? error.message : 'An unexpected error occurred', { id: toastId })
      }
    } catch (error) {
      console.error('Skill Submission Error:', error)
      toast.error('An unexpected error occurred')
    }
  }

  const handleDelete = async (id: string) => {
    const toastId = toast.loading('Deleting skill...')
    try {
      const response = await fetch(`/api/skills?id=${id}`, {
        method: 'DELETE'
      })
      
      const responseData = await response.json()
      
      if (!response.ok) {
        throw new Error(responseData.details || 'Failed to delete skill')
      }
      
      toast.success('Skill deleted successfully!', { id: toastId })
      fetchSkills()
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to delete skill', { id: toastId })
    }
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setValue('name', skill.name)
    setValue('category', skill.category)
  }

  const cancelEdit = () => {
    setEditingSkill(null)
    reset()
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold mb-6">Skills Management</h1>
      
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-gray-800 p-6 rounded-lg space-y-4"
      >
        <div>
          <label htmlFor="name" className="block mb-2">Skill Name</label>
          <input 
            {...register('name')}
            id="name"
            className="w-full bg-gray-700 text-white p-2 rounded"
            placeholder="Enter skill name"
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block mb-2">Category</label>
          <select 
            {...register('category')}
            id="category"
            className="w-full bg-gray-700 text-white p-2 rounded"
          >
            <option value="">Select Category</option>
            {skillCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 mt-1">{errors.category.message}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {editingSkill ? 'Update Skill' : 'Add Skill'}
          </button>
          
          {editingSkill && (
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
        <h2 className="text-2xl font-semibold mb-4">Existing Skills</h2>
        {skills.length === 0 ? (
          <p className="text-gray-400">No skills found. Add your first skill!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map(skill => (
              <div 
                key={skill.id} 
                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{skill.name}</h3>
                  <p className="text-sm text-gray-400">{skill.category}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(skill)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(skill.id!)}
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
