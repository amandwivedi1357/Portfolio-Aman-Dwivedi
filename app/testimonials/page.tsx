"use client";

import { AnimatedTestimonialsDemo } from "@/components/animated-testimonials";

export default function Testimonials() {
    return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center">
             <h1 className="text-2xl text-white md:text-4xl font-bold text-center my-4">Testimonials</h1>
      <div className="w-full flex justify-center relative h-16 md:h-20">
        <div className="w-full max-w-[20rem] md:max-w-[40rem] h-32 md:h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-32 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-32 md:inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(175px_100px_at_top,transparent_20%,white)] md:[mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
            <AnimatedTestimonialsDemo/>
        </div>
    );
}