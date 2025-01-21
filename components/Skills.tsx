'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TextGenerateEffect } from './ui/text-generate-effect'
import { MovingBorderButton } from './ui/moving-border-button'
import { InfiniteMovingCards } from './ui/infinite-moving-cards'
import SparkleProp from './SparkleProp'
import { SparklesCore } from './ui/sparkle'

const tools = [
  { name: 'VS Code', icon: '/skills/vscode.jpg' },
  { name: 'Cursor', icon: '/skills/cursor.png' },
  { name: 'Postman', icon: '/skills/postman.png' },
  { name: 'MongoDB Compass', icon: '/skills/mongo.png' },
  { name: 'Figma', icon: '/skills/figma.png' },
  { name: 'Docker', icon: '/skills/dock.svg' },
  { name: 'Redux Developer Tools', icon: '/skills/redux.png' },
]

const categories = ['All', 'Frontend', 'Backend', 'Database', 'ORMs']

export function Skills() {
  const [skills, setSkills] = useState<{ name: string; category: string }[]>([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills')
        if (!response.ok) {
          throw new Error('Failed to fetch skills')
        }
        const data = await response.json()
        setSkills(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching skills:', error)
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const filteredSkills = skills.filter(
    (skill) => filter === 'All' || skill.category === filter
  )

  return (
    <div className="py-20 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">Skills</h1>
      <div className="w-full flex justify-center relative h-1 md:h-20">
        <div className="w-full max-w-[20rem] md:max-w-[40rem] h-2 md:h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-32 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-32 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(175px_100px_at_top,transparent_20%,white)] md:[mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
        
        {/* Horizontal Tabs for Large Screens */}
        <div className="md:flex  justify-center space-x-4 mb-10 hidden ">
          <AnimatePresence>
            {categories.map((category) => (
              <motion.div
                key={category}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: filter === category ? 1.05 : 1,
                  transition: { duration: 0.3 }
                }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <MovingBorderButton
                  key={category}
                  borderClassName={`
                    ${filter === category 
                      ? 'bg-[radial-gradient(purple_40%,transparent_60%)]' 
                      : 'bg-transparent'}
                  `}
                  containerClassName="group"
                  onClick={() => setFilter(category)}
                  className={`
                    ${filter === category 
                      ? 'bg-purple-600' 
                      : 'bg-gray-800'}
                    bg-black
                    group-hover:bg-purple-900/20 
                    text-white 
                    border-purple-500/20 
                    transition-colors 
                    duration-300
                    ${filter === category ? 'scale-105' : 'scale-100'}
                  `}
                >
                  {category}
                </MovingBorderButton>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Select Dropdown for Small Screens */}
        <div className="md:hidden z-50 flex justify-center my-20">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="
              w-full 
              max-w-xs 
              bg-gray-800 
              text-white 
              py-2 
              px-3 
              rounded-lg 
              border 
              border-purple-500/20 
              focus:outline-none 
              focus:ring-2 
              focus:ring-purple-600
            "
          >
            {categories.map((category) => (
              <option 
                key={category} 
                value={category}
                className="bg-black text-white"
              >
                {category}
              </option>
            ))}
          </select>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-center"
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-75 group-hover:opacity-100 transition duration-300 blur-sm group-hover:blur-none"></div>
                  <div className="relative bg-black rounded-xl p-6 ring-1 ring-gray-900/5 dark:ring-white/10 h-full min-w-[250px] flex flex-col justify-between">
                    <div>
                      <div className="text-2xl font-bold mb-2 text-white">{skill.name}</div>
                      <div className="text-sm text-gray-400">{skill.category}</div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-tl-full opacity-20 transform rotate-45"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-20">
          <TextGenerateEffect words="Tools I Use" className="text-4xl font-bold text-center mb-10" />
          <InfiniteMovingCards
            items={tools}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </div>
  )
}