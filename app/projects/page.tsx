import { Project } from "@/components/Project"
import { SparklesCore } from "@/components/ui/sparkle"

const projects = [
  {
    title: "AI-Translator-Chat-App",
    description: "This is a AI-based chat app which will let you chat with people in different language and it will translate for the end user according to his/her preference.",
    image: "/skills/chat-app.png",
    techStack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Stripe"],
    githubUrl: "https://github.com/yourusername/ai-translator-chat-app",
    liveUrl: "https://ai-tranlation-app.vercel.app/"
  },
  {
    title: "4WheelTravels - Car Rental Application",
    description: "Developed 4WheelTravels.com, a car rental website with a scalable backend capable of processing 200+ bookings daily.",
    image: "/skills/4Wheels.png",
    techStack: ["Chakra UI", "React", "JavaScript", "Node.js", "Express"],
    githubUrl: "https://github.com/yourusername/4wheel-travels",
    liveUrl: "https://4wheeltravels.com/"
  },
  {
    title: "EruditeXl",
    description: "Built a website for EruditeXL which offers different types of camps for student",
    image: "/skills/erudite.png",
    techStack: ["React", "Chakra UI", "Tailwind CSS", "GSAP", "C"],
    githubUrl: "https://github.com/yourusername/erudite-xl",
    liveUrl: "https://eruditexl.com/"
  },
  {
    title: "Starlife Nutrition and Wellness",
    description: "Developed a Website which has all the information regarding nutrients and wellness for the starlite firm.",
    image: "/skills/starlife.png",
    techStack: ["React", "Tailwind CSS", "GSAP"],
    githubUrl: "https://github.com/yourusername/starlife-nutrition",
    liveUrl: "https://starlitelife.vercel.app/"
  }
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">My Projects</h1>
        <div className="w-full flex justify-center relative h-20">
          <div className="w-1/2 relative">
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

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
          {projects.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  )
}
