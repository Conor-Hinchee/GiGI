import { useState, useEffect, useRef } from 'react';

interface ScrollDanceState {
  isScrollDancing: boolean;
  scrollVelocity: number;
  scrollIntensity: number; // 0-1 based on scroll speed
  timeSinceLastScroll: number;
}

export const useScrollDance = () => {
  const [scrollDanceState, setScrollDanceState] = useState<ScrollDanceState>({
    isScrollDancing: false,
    scrollVelocity: 0,
    scrollIntensity: 0,
    timeSinceLastScroll: 0,
  });

  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const deltaY = Math.abs(currentScrollY - lastScrollY.current);
      const deltaTime = currentTime - lastScrollTime.current;
      
      // Calculate scroll velocity (pixels per ms)
      const velocity = deltaTime > 0 ? deltaY / deltaTime : 0;
      
      // Calculate intensity (0-1) based on velocity, capped for performance
      const maxVelocity = 2; // Adjust based on testing
      const intensity = Math.min(velocity / maxVelocity, 1);
      
      // Update state immediately for responsiveness
      setScrollDanceState(prev => ({
        ...prev,
        isScrollDancing: true,
        scrollVelocity: velocity,
        scrollIntensity: intensity,
        timeSinceLastScroll: 0,
      }));

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout for dance mode tapering
      scrollTimeoutRef.current = setTimeout(() => {
        startTaperingAnimation();
      }, 150); // Start tapering 150ms after scroll stops

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentTime;
    };

    const startTaperingAnimation = () => {
      let startTime = Date.now();
      const taperDuration = 1500; // 1.5 seconds to fully taper off

      const animateTaper = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / taperDuration, 1);
        
        // Exponential decay for smooth taper
        const remainingIntensity = Math.max(0, 1 - (progress * progress));
        
        setScrollDanceState(prev => ({
          ...prev,
          isScrollDancing: remainingIntensity > 0.05,
          scrollIntensity: prev.scrollIntensity * remainingIntensity,
          timeSinceLastScroll: elapsed,
        }));

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animateTaper);
        } else {
          // Fully stopped
          setScrollDanceState(prev => ({
            ...prev,
            isScrollDancing: false,
            scrollVelocity: 0,
            scrollIntensity: 0,
          }));
        }
      };

      animateTaper();
    };

    // Throttled scroll listener for performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return scrollDanceState;
};
