"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const TopLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Always start loading when pathname changes or on initial load
    setIsLoading(true);
    
    // Stop loading after a short delay
    const timer = setTimeout(() => setIsLoading(false), 1500);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ width: 0, opacity: 1 }}
          animate={{ width: "100%", opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "3px",
            background: "linear-gradient(90deg, #00F5A0, #00D9F5)",
            zIndex: 9999,
          }}
        />
      )}
    </AnimatePresence>
  );
};