"use client";

import { AnimatedTestimonialsDemo } from "@/components/animated-testimonials";

export default function Testimonials() {
    return (
        <div className="min-h-screen bg-black flex flex-col justify-center items-center">
            <h1 className="text-4xl text-white font-bold mb-8">Testimonials</h1>
            <AnimatedTestimonialsDemo/>
        </div>
    );
}