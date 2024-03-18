"use client";
import { motion } from 'framer-motion';



export function DotBackground() {
  
  const dotMotionVariants = {
    animate: {
      x: ["-10%", "10%", "-10%"], 
      y: ["-10%", "10%", "-10%"], 
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 60,
          ease: "linear",
        },
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 90,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="fixed inset-0 z-[-1] bg-custom-cream dark:bg-dot-black/[1]">
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"
        variants={dotMotionVariants}
        animate="animate"
      >
        <div className="absolute min-w-full min-h-full bg-dot-dots bg-size[500%]">
          
        </div>
      </motion.div>
    </div>
  );
}