"use client"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Project } from "@/components/Project";
import { SparklesCore } from "@/components/ui/sparkle";

type ProjectType = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  imageUrl: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      toast.error('Error fetching projects');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">My Projects</h1>
        <div className="w-full flex justify-center relative h-20">
          <div className="w-1/2 relative">
            {/* Sparkles and Decorations */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={60}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-12">
          {projects.map((project) => (
            <Project 
              key={project.id} 
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              technologies={project.technologies}
              githubLink={project.githubLink}
              liveLink={project.liveLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
}