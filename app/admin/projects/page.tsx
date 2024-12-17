'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import Image from 'next/image'

const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.string().transform(val => 
    val.split(',').map(tech => tech.trim()).filter(tech => tech !== '')
  ).refine(arr => arr.length > 0, { message: "At least one technology is required" }),
  githubLink: z.string().url("Invalid GitHub link").optional(),
  liveLink: z.string().url("Invalid live link").optional(),
  imageFile: z.instanceof(File).optional()
})

type Project = {
  id?: string
  title: string
  description: string
  technologies: string[]
  githubLink?: string
  liveLink?: string
  imageUrl?: string
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    formState: { errors } 
  } = useForm<Project & { imageFile?: File }>({
    resolver: zodResolver(ProjectSchema)
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (!response.ok) throw new Error('Failed to fetch projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      toast.error('Error fetching projects')
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setValue('imageFile', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: Project & { imageFile?: File }) => {
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('technologies', data.technologies.join(','))
      
      if (data.githubLink) formData.append('githubLink', data.githubLink)
      if (data.liveLink) formData.append('liveLink', data.liveLink)
      
      if (data.imageFile) {
        formData.append('imageFile', data.imageFile)
      }

      const endpoint = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects'
      const method = editingProject ? 'PUT' : 'POST'

      const response = await fetch(endpoint, {
        method,
        body: formData
      })

      if (!response.ok) throw new Error('Failed to save project')

      const result = await response.json()
      
      if (editingProject) {
        setProjects(projects.map(p => p.id === result.id ? result : p))
        toast.success('Project updated successfully')
      } else {
        setProjects([...projects, result])
        toast.success('Project added successfully')
      }

      // Reset form
      reset()
      setEditingProject(null)
      setImagePreview(null)
    } catch (error) {
      toast.error('Error saving project')
      console.error(error)
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setValue('title', project.title)
    setValue('description', project.description)
    setValue('technologies', project.technologies.join(', '))
    setValue('githubLink', project.githubLink)
    setValue('liveLink', project.liveLink)
    setImagePreview(project.imageUrl || null)
  }

  const cancelEdit = () => {
    setEditingProject(null)
    reset()
    setImagePreview(null)
  }

  const handleDelete = async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete project')
      
      setProjects(projects.filter(p => p.id !== projectId))
      toast.success('Project deleted successfully')
    } catch (error) {
      toast.error('Error deleting project')
      console.error(error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold mb-6">Projects Management</h1>
      
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-gray-800 p-6 rounded-lg space-y-4"
      >
        <div>
          <label htmlFor="title" className="block mb-2">Title</label>
          <input 
            {...register('title')}
            id="title"
            className="w-full bg-gray-700 text-white p-2 rounded"
            placeholder="Enter project title"
          />
          {errors.title && (
            <p className="text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block mb-2">Description</label>
          <textarea 
            {...register('description')}
            id="description"
            className="w-full bg-gray-700 text-white p-2 rounded"
            placeholder="Enter project description"
            rows={3}
          />
          {errors.description && (
            <p className="text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="technologies" className="block mb-2">Technologies (comma-separated)</label>
          <input 
            {...register('technologies')}
            id="technologies"
            className="w-full bg-gray-700 text-white p-2 rounded"
            placeholder="e.g., React, Node.js, TypeScript"
          />
          {errors.technologies && (
            <p className="text-red-500 mt-1">{errors.technologies.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="githubLink" className="block mb-2">GitHub Link (Optional)</label>
          <input 
            {...register('githubLink')}
            id="githubLink"
            className="w-full bg-gray-700 text-white p-2 rounded"
            placeholder="Enter GitHub repository link"
          />
          {errors.githubLink && (
            <p className="text-red-500 mt-1">{errors.githubLink.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="liveLink" className="block mb-2">Live Link (Optional)</label>
          <input 
            {...register('liveLink')}
            id="liveLink"
            className="w-full bg-gray-700 text-white p-2 rounded"
            placeholder="Enter live project link"
          />
          {errors.liveLink && (
            <p className="text-red-500 mt-1">{errors.liveLink.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="imageFile" className="block mb-2">Project Image (Optional)</label>
          <input 
            type="file"
            id="imageFile"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full bg-gray-700 text-white p-2 rounded"
          />
          {imagePreview && (
            <div className="mt-2">
              <Image 
                src={imagePreview} 
                alt="Project Preview" 
                width={200} 
                height={200} 
                className="rounded object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {editingProject ? 'Update Project' : 'Add Project'}
          </button>
          
          {editingProject && (
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
        <h2 className="text-2xl font-semibold mb-4">Existing Projects</h2>
        {projects.length === 0 ? (
          <p className="text-gray-400">No projects found. Add your first project!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <div 
                key={project.id} 
                className="bg-gray-700 p-4 rounded-lg flex flex-col justify-between"
              >
                {project.imageUrl && (
                  <div className="mb-4">
                    <Image 
                      src={project.imageUrl} 
                      alt={project.title} 
                      width={300} 
                      height={200} 
                      className="rounded object-cover w-full"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-gray-300">Technologies:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.technologies.map(tech => (
                        <span 
                          key={tech} 
                          className="bg-gray-600 text-xs px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {(project.githubLink || project.liveLink) && (
                    <div className="mt-2 flex space-x-2">
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:text-blue-300"
                        >
                          GitHub
                        </a>
                      )}
                      {project.liveLink && (
                        <a 
                          href={project.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-green-400 hover:text-green-300"
                        >
                          Live Site
                        </a>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 mt-4">
                  <button 
                    onClick={() => handleEdit(project)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id!)}
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
