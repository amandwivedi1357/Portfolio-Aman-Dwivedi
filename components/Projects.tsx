'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Project } from './Project'

export function Projects() {
  const [projects, setProjects] = useState<{
    title: string
    description: string
    imageUrl?: string
    technologies: string[]
    githubLink?: string
    liveLink?: string
  }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        interface ProjectData {
          title: string
          description: string
          imageUrl?: string
          technologies: string[]
          githubLink?: string
          liveLink?: string
        }

        const fetchedProjects: ProjectData[] = data.map((project: any) => ({
          title: project.title,
          description: project.description,
          imageUrl: project.imageUrl || '/default-project-image.png',
          technologies: project.technologies,
          githubLink: project.githubLink || '#',
          liveLink: project.liveLink || '#'
        }))

        setProjects(fetchedProjects)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="py-20 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-4xl font-bold text-center mb-16 text-purple-400">My Projects</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Project 
              key={index}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl || ''}
              technologies={project.technologies}
              githubLink={project.githubLink || ''}
              liveLink={project.liveLink || ''}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
