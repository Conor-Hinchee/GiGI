import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrollHijackState {
  isScrollHijacked: boolean;
  accumulatedScroll: number;
  scrollResistance: number;
  shouldSnap: boolean;
}

const SCROLL_RESISTANCE_THRESHOLD = 300; // Pixels of accumulated scroll before snap
const SCROLL_RESISTANCE_FACTOR = 0.3; // How much scroll gets through (lower = more resistance)

export const useScrollHijack = (isDanceModeActive: boolean) => {
  const [scrollState, setScrollState] = useState<ScrollHijackState>({
    isScrollHijacked: false,
    accumulatedScroll: 0,
    scrollResistance: 0,
    shouldSnap: false,
  });

  const lastScrollY = useRef(0);
  const preventingScroll = useRef(false);
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const enableScrollHijack = useCallback(() => {
    setScrollState(prev => ({
      ...prev,
      isScrollHijacked: true,
      accumulatedScroll: 0,
      scrollResistance: 0,
      shouldSnap: false,
    }));
    lastScrollY.current = window.scrollY;
  }, []);

  const disableScrollHijack = useCallback(() => {
    setScrollState(prev => ({
      ...prev,
      isScrollHijacked: false,
      accumulatedScroll: 0,
      scrollResistance: 0,
      shouldSnap: false,
    }));
    preventingScroll.current = false;
  }, []);

  const handleSnapToContent = useCallback(() => {
    // Smooth scroll to past the dance area
    window.scrollTo({
      top: window.innerHeight, // Scroll past the dance area
      behavior: 'smooth'
    });
    
    // Reset scroll hijack state
    setScrollState(prev => ({
      ...prev,
      isScrollHijacked: false,
      accumulatedScroll: 0,
      scrollResistance: 0,
      shouldSnap: false,
    }));
  }, []);

  useEffect(() => {
    if (!isDanceModeActive) {
      disableScrollHijack();
      return;
    }

    enableScrollHijack();
  }, [isDanceModeActive, enableScrollHijack, disableScrollHijack]);

  useEffect(() => {
    if (!scrollState.isScrollHijacked) return;

    const handleScroll = (e: Event) => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      // If user is trying to scroll down from the dance area
      if (scrollDelta > 0 && currentScrollY < window.innerHeight) {
        e.preventDefault();
        e.stopPropagation();
        preventingScroll.current = true;

        // Accumulate the scroll resistance
        setScrollState(prev => {
          const newAccumulated = prev.accumulatedScroll + Math.abs(scrollDelta);
          const newResistance = Math.min(newAccumulated / SCROLL_RESISTANCE_THRESHOLD, 1);

          // Check if we should snap
          if (newAccumulated >= SCROLL_RESISTANCE_THRESHOLD && !prev.shouldSnap) {
            // Clear any existing timeout
            if (snapTimeoutRef.current) {
              clearTimeout(snapTimeoutRef.current);
            }
            
            // Snap after a brief delay
            snapTimeoutRef.current = setTimeout(() => {
              handleSnapToContent();
            }, 100);

            return {
              ...prev,
              accumulatedScroll: newAccumulated,
              scrollResistance: newResistance,
              shouldSnap: true,
            };
          }

          return {
            ...prev,
            accumulatedScroll: newAccumulated,
            scrollResistance: newResistance,
          };
        });

        // Allow a small amount of scroll to give feedback
        const allowedScroll = scrollDelta * SCROLL_RESISTANCE_FACTOR;
        window.scrollTo(0, Math.max(0, lastScrollY.current + allowedScroll));
        lastScrollY.current = window.scrollY;
      } else {
        // Normal scroll behavior for upward scroll or beyond dance area
        lastScrollY.current = currentScrollY;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (scrollState.isScrollHijacked && e.deltaY > 0 && window.scrollY < window.innerHeight) {
        e.preventDefault();
        e.stopPropagation();
        
        // Accumulate wheel delta for resistance
        setScrollState(prev => {
          const newAccumulated = prev.accumulatedScroll + Math.abs(e.deltaY * 2); // Multiply for faster accumulation on wheel
          const newResistance = Math.min(newAccumulated / SCROLL_RESISTANCE_THRESHOLD, 1);

          if (newAccumulated >= SCROLL_RESISTANCE_THRESHOLD && !prev.shouldSnap) {
            if (snapTimeoutRef.current) {
              clearTimeout(snapTimeoutRef.current);
            }
            
            snapTimeoutRef.current = setTimeout(() => {
              handleSnapToContent();
            }, 100);

            return {
              ...prev,
              accumulatedScroll: newAccumulated,
              scrollResistance: newResistance,
              shouldSnap: true,
            };
          }

          return {
            ...prev,
            accumulatedScroll: newAccumulated,
            scrollResistance: newResistance,
          };
        });
      }
    };

    const handleTouchStart = () => {
      if (scrollState.isScrollHijacked) {
        lastScrollY.current = window.scrollY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (scrollState.isScrollHijacked && window.scrollY < window.innerHeight) {
        const touch = e.touches[0];
        if (touch) {
          // Touch scrolling resistance
          setScrollState(prev => {
            const newAccumulated = prev.accumulatedScroll + 10; // Fixed increment for touch
            const newResistance = Math.min(newAccumulated / SCROLL_RESISTANCE_THRESHOLD, 1);

            if (newAccumulated >= SCROLL_RESISTANCE_THRESHOLD && !prev.shouldSnap) {
              if (snapTimeoutRef.current) {
                clearTimeout(snapTimeoutRef.current);
              }
              
              snapTimeoutRef.current = setTimeout(() => {
                handleSnapToContent();
              }, 100);

              return {
                ...prev,
                accumulatedScroll: newAccumulated,
                scrollResistance: newResistance,
                shouldSnap: true,
              };
            }

            return {
              ...prev,
              accumulatedScroll: newAccumulated,
              scrollResistance: newResistance,
            };
          });
        }
      }
    };

    // Add event listeners with capture to intercept early
    window.addEventListener('scroll', handleScroll, { capture: true, passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
    };
  }, [scrollState.isScrollHijacked, handleSnapToContent]);

  return {
    scrollState,
    enableScrollHijack,
    disableScrollHijack,
    handleSnapToContent,
  };
};
