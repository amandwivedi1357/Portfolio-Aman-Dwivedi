"use client";

import { motion } from "framer-motion";
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconPhone, IconDownload } from "@tabler/icons-react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Link from "next/link";
import { SparklesCore } from "@/components/ui/sparkle";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { MovingBorderButton } from "@/components/ui/moving-border-button";
import { useRouter } from "next/navigation";



const Tooltip = ({ 
  children, 
  content 
}: { 
  children: React.ReactNode, 
  content: string 
}) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="
        absolute 
        z-10 
        bottom-full 
        left-1/2 
        transform 
        -translate-x-1/2 
        mb-2 
        bg-gray-800 
        text-white 
        text-xs 
        rounded 
        py-1 
        px-2 
        opacity-0 
        group-hover:opacity-100 
        transition-opacity 
        duration-300
      ">
        {content}
      </div>
    </div>
  );
};

const ContactInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.5 }}
      className="py-8 text-gray-300"
    >
      <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 shadow-lg">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-6">Contact Information</h3>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex items-center space-x-3 group">
            <IconPhone className="w-8 h-8 text-white group-hover:text-blue-400 transition-colors" />
            <span className="text-lg font-medium group-hover:text-blue-300 transition-colors">
              +91 7440501499
            </span>
          </div>
          <div className="flex items-center space-x-3 group">
            <IconMail className="w-8 h-8 text-white group-hover:text-green-400 transition-colors" />
            <span className="text-lg font-medium group-hover:text-green-300 transition-colors">
              amandwivedi1357@gmail.com
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function About() {
  const router = useRouter()
  const socialLinks = [
    {
      title: "GitHub",
      description: "Check out my code repositories and contributions",
      icon: <IconBrandGithub className="h-6 w-6" />,
      href: "https://github.com/amandwivedi1357",
    },
    {
      title: "LinkedIn",
      description: "Connect with me professionally",
      icon: <IconBrandLinkedin className="h-6 w-6" />,
      href: "https://www.linkedin.com/in/aman-dwivedi-1357ad",
    },
    {
      title: "Email",
      description: "Get in touch via email",
      icon: <IconMail className="h-6 w-6" />,
      href: "mailto:amandwivedi1357@gmail.com?subject=Hello%20Aman%20-%20Portfolio%20Inquiry&body=Hi%20Aman,%0A%0AI%20was%20browsing%20your%20portfolio%20and%20would%20like%20to%20connect.%0A%0ABest%20regards,%0A[Your%20Name]",
    },
  ];

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-black z-0 pointer-events-none">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

      <TracingBeam className="px-6">
        <div className="max-w-7xl mx-auto relative z-20">
          {/* Hero Section */}
          <div className="h-full pt-24 pb-12 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-8"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-full max-w-4xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-3xl" />
                </div>
                <TextGenerateEffect 
                  words="Aman Dwivedi" 
                  className="text-4xl md:text-7xl font-bold text-white relative"
                />
              </div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
              >
                Full Stack Web Developer | React & Next.js Enthusiast
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex justify-center items-center space-x-4"
              >
                <MovingBorderButton
                  borderRadius="1.75rem"
                  className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
                  onClick={() => router.push('/projects')}
                >
                  View My Work
                </MovingBorderButton>
                
                <MovingBorderButton
                  borderRadius="1.75rem"
                  className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
                  onClick={() => {
                    // Assuming the resume is in the public folder
                    const link = document.createElement('a');
                    link.href = '/Aman_Dwivedi_fw20_0455.pdf';
                    link.download = 'Aman_Dwivedi_fw20_0455.pdf';
                    link.click();
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <IconDownload className="w-5 h-5" />
                    <span> Resume</span>
                  </div>
                </MovingBorderButton>
              </motion.div>
            </motion.div>
          </div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="py-12 md:py-24 text-gray-300 space-y-12"
          >
            <div className="max-w-3xl mx-auto space-y-6 text-center">
              <p className="text-lg md:text-xl leading-relaxed">
                I'm a passionate Full Stack Web Developer with expertise in React, Next.js, and modern web technologies. 
                I love creating intuitive, performant, and visually appealing web applications.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                My goal is to leverage cutting-edge technologies to solve real-world problems and deliver exceptional user experiences.
              </p>
            </div>

            {/* Skills Section */}
            <div className="py-12">
              <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">Core Technologies</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL"].map((skill) => (
                  <div
                    key={skill}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Connect Section */}
            <div className="py-16 ">
              <div className="container mx-auto px-4">
                <div 
                  id="lets-connect"  
                  className="text-center space-y-4"
                >
                  <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-16 tracking-tight">
                    Let's <span className="text-purple-400">Connect</span>
                  </h3>
                  <div className="flex justify-center space-x-8 md:space-x-12">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.title}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { 
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 300,
                            damping: 10 
                          }
                        }}
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-75 transition-opacity duration-300 blur-sm"></div>
                        <div className="relative bg-black/80 p-4 rounded-xl border border-white/10 flex items-center justify-center">
                          {link.title === 'GitHub' && <IconBrandGithub className="w-10 h-10 text-white group-hover:text-purple-300 transition-colors" />}
                          {link.title === 'LinkedIn' && <IconBrandLinkedin className="w-10 h-10 text-white group-hover:text-blue-400 transition-colors" />}
                          {link.title === 'Email' && (
                            <Tooltip content="amandwivedi1357@gmail.com">
                              <IconMail className="w-10 h-10 text-white group-hover:text-green-400 transition-colors cursor-pointer" />
                            </Tooltip>
                          )}
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <ContactInfo />
        </div>
      </TracingBeam>
    </div>
  );
}
