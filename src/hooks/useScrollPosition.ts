import { useState, useEffect, useRef } from 'react';

export const useScrollPosition = (isMobile: boolean) => {
  const [scrollY, setScrollY] = useState(0);
  const [idleOffset, setIdleOffset] = useState(0);
  const lastScrollTime = useRef(Date.now());
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Parallax scroll effect - now enabled for all devices
  // Parameter kept for future use - reference it to avoid TypeScript error
  void isMobile;
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      lastScrollTime.current = Date.now();
    };

    // Idle animation loop for falling effect when not scrolling
    const animate = () => {
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;
      
      // Apply falling effect if user hasn't scrolled for 500ms
      if (timeSinceLastScroll > 500) {
        // Create continuous falling motion with subtle variations
        const time = now * 0.001; // Convert to seconds
        const fallSpeed = 15; // Pixels per second falling speed
        const sineVariation = Math.sin(time * 0.3) * 3; // Gentle side-to-side drift
        const timeElapsed = (timeSinceLastScroll - 500) * 0.001; // Time since falling started
        
        // Calculate falling offset with slight variations
        const fallingOffset = (timeElapsed * fallSpeed) + sineVariation;
        setIdleOffset(fallingOffset);
      } else {
        setIdleOffset(0);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll);
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return { scrollY: scrollY + idleOffset };
};
