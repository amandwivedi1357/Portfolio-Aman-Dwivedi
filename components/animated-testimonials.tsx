"use client";

import { useState, useEffect } from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const [testimonials, setTestimonials] = useState<{
    quote: string;
    name: string;
    role: string;
    company?: string;
    imageUrl?: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        
        // Transform data to match AnimatedTestimonials component
        const transformedTestimonials = data.map(testimonial => ({
          quote: testimonial.quote,
          name: testimonial.name,
          designation: `${testimonial.role}${testimonial.company ? ` at ${testimonial.company}` : ''}`,
          src: testimonial.imageUrl || 'https://via.placeholder.com/150', // Default placeholder
        }));

        setTestimonials(transformedTestimonials);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
}
