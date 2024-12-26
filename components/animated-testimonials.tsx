"use client";

import { useState, useEffect, useMemo } from "react";
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        
        setTestimonials(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Memoize the transformation to improve performance
  const transformedTestimonials = useMemo(() => 
    testimonials.map(testimonial => ({
      quote: testimonial.quote,
      name: testimonial.name,
      designation: `${testimonial.role}${testimonial.company ? ` at ${testimonial.company}` : ''}`,
      src: testimonial.imageUrl || 'https://via.placeholder.com/150', // Default placeholder
    })), 
    [testimonials]
  );

  if (loading) {
    return (
      <div 
        className="flex justify-center items-center h-64" 
        role="status" 
        aria-label="Loading testimonials"
      >
        <div 
          className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"
          aria-hidden="true"
        ></div>
        <span className="sr-only">Loading testimonials</span>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="flex justify-center items-center h-64 bg-red-50 text-red-600 p-4 rounded-lg"
        role="alert"
      >
        <p>Unable to load testimonials: {error}</p>
      </div>
    );
  }

  return testimonials.length > 0 ? (
    <AnimatedTestimonials 
      testimonials={transformedTestimonials} 
      autoplay={true} 
    />
  ) : (
    <div className="text-center text-gray-500 p-4">
      No testimonials available
    </div>
  );
}