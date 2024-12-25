'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { CardBody } from '@/components/ui/card-body'
import { HoverEffect } from '@/components/ui/card-hover-effect'

interface ProjectProps {
  title: string
  description: string
  imageUrl: string
  technologies: string[]
  githubLink: string
  liveLink: string
}

export function Project({ title, description, imageUrl, technologies, githubLink, liveLink }: ProjectProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="w-full  mx-auto"
    >
      <HoverEffect items={[{ title, description }]} />
      <BackgroundGradient className="rounded-[22px]  p-4 sm:p-10 bg-black">
        <CardBody className="relative group">
          <div className="relative overflow-hidden rounded-lg">
            <img src={imageUrl} alt={title} className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h3 className="mt-4 text-2xl font-bold text-white">{title}</h3>
          <p className="mt-2 text-sm text-gray-300">{description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs font-semibold text-white bg-purple-600 rounded-full">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex justify-between mt-6 space-x-4">
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative inline-flex overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 group"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4b6cb7_0%,#182848_50%,#4b6cb7_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-300 hover:bg-slate-800 hover:text-cyan-300 group-hover:bg-opacity-0">
                GitHub
              </span>
            </a>
            <a 
              href={liveLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative inline-flex overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 group"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4b6cb7_0%,#182848_50%,#4b6cb7_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-300 hover:bg-slate-800 hover:text-cyan-300 group-hover:bg-opacity-0">
                Live Demo
              </span>
            </a>
          </div>
        </CardBody>
      </BackgroundGradient>
    </motion.div>
  )
}
