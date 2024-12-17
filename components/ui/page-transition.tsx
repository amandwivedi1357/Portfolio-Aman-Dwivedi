"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const pageVariants = {
  initial: { 
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    opacity: 0,
  },
  in: { 
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  },
  out: { 
    clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

const curtainVariants = {
  initial: { 
    scaleY: 1,
  },
  animate: { 
    scaleY: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1]
    }
  },
  exit: { 
    scaleY: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="page-wrapper"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={curtainVariants}
        className="fixed top-0 left-0 right-0 bottom-0 z-[100] bg-black origin-top"
      />
    </>
  );
}
