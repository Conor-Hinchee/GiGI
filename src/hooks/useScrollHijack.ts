import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrollHijackState {
  isScrollHijacked: boolean;
  accumulatedScroll: number;
  scrollResistance: number;
  shouldSnap: boolean;
  currentSection: number;
  totalSections: number;
  sectionProgress: number;
  isScrollingUp: boolean;
}

const SCROLL_RESISTANCE_THRESHOLD = 150; // Reduced threshold for quicker snapping
const SCROLL_RESISTANCE_FACTOR = 0.2; // More resistance for dramatic effect

export const useScrollHijack = (isDanceModeActive: boolean, isMobile: boolean = false) => {
  const [scrollState, setScrollState] = useState<ScrollHijackState>({
    isScrollHijacked: false,
    accumulatedScroll: 0,
    scrollResistance: 0,
    shouldSnap: false,
    currentSection: 0,
    totalSections: 1,
    sectionProgress: 0,
    isScrollingUp: false,
  });

  const lastScrollY = useRef(0);
  const preventingScroll = useRef(false);
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSnapping = useRef(false);
  const upwardScrollAccumulator = useRef(0);
  const isProcessingUpwardScroll = useRef(false);

  // Calculate total sections based on document height
  const calculateTotalSections = useCallback(() => {
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    return Math.ceil(documentHeight / window.innerHeight);
  }, []);

  // Get current section based on scroll position
  const getCurrentSection = useCallback((scrollY: number) => {
    return Math.floor(scrollY / window.innerHeight);
  }, []);

  // Get target scroll position for a section
  const getSectionScrollY = useCallback((section: number) => {
    return section * window.innerHeight;
  }, []);

  const enableScrollHijack = useCallback(() => {
    const totalSections = calculateTotalSections();
    const currentSection = getCurrentSection(window.scrollY);
    
    setScrollState(prev => ({
      ...prev,
      isScrollHijacked: true,
      accumulatedScroll: 0,
      scrollResistance: 0,
      shouldSnap: false,
      currentSection,
      totalSections,
      sectionProgress: 0,
    }));
    lastScrollY.current = window.scrollY;
  }, [calculateTotalSections, getCurrentSection]);

  const disableScrollHijack = useCallback(() => {
    setScrollState(prev => ({
      ...prev,
      isScrollHijacked: false,
      accumulatedScroll: 0,
      scrollResistance: 0,
      shouldSnap: false,
      sectionProgress: 0,
      isScrollingUp: false,
    }));
    preventingScroll.current = false;
    isSnapping.current = false;
    upwardScrollAccumulator.current = 0;
    isProcessingUpwardScroll.current = false;
  }, []);

  const handleSnapToSection = useCallback((targetSection: number) => {
    if (isSnapping.current) return;
    
    isSnapping.current = true;
    const targetScrollY = getSectionScrollY(targetSection);
    
    // Smooth scroll to target section
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
    
    // Reset scroll hijack state for the new section
    setTimeout(() => {
      setScrollState(prev => ({
        ...prev,
        currentSection: targetSection,
        accumulatedScroll: 0,
        scrollResistance: 0,
        shouldSnap: false,
        sectionProgress: 0,
      }));
      lastScrollY.current = targetScrollY;
      isSnapping.current = false;
    }, 800); // Wait for smooth scroll to complete
  }, [getSectionScrollY]);

  const updateSectionProgress = useCallback(() => {
    if (!scrollState.isScrollHijacked) return;
    
    const currentScrollY = window.scrollY;
    const currentSection = getCurrentSection(currentScrollY);
    const sectionStartY = getSectionScrollY(currentSection);
    const progressInSection = (currentScrollY - sectionStartY) / window.innerHeight;
    
    setScrollState(prev => ({
      ...prev,
      currentSection,
      sectionProgress: Math.max(0, Math.min(1, progressInSection)),
    }));
  }, [scrollState.isScrollHijacked, getCurrentSection, getSectionScrollY]);

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
      if (isSnapping.current) return;
      
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      const currentSection = getCurrentSection(currentScrollY);
      
      // Mobile-specific scroll handling
      if (isMobile && currentSection === 0) {
        // Apply resistance immediately when scrolling down from the top in dance mode
        if (scrollDelta > 0) {
          // Apply resistance throughout the entire dance area (0 to 100vh)
          e.preventDefault();
          e.stopPropagation();
          preventingScroll.current = true;

          setScrollState(prev => {
            const newAccumulated = prev.accumulatedScroll + Math.abs(scrollDelta);
            const newResistance = Math.min(newAccumulated / SCROLL_RESISTANCE_THRESHOLD, 1);
            const newSectionProgress = Math.min(1, newResistance);

            // Snap to next section when resistance threshold is met AND we're near the bottom
            if (newAccumulated >= SCROLL_RESISTANCE_THRESHOLD && !prev.shouldSnap && currentScrollY >= window.innerHeight - 150) {
              if (snapTimeoutRef.current) {
                clearTimeout(snapTimeoutRef.current);
              }
              
              snapTimeoutRef.current = setTimeout(() => {
                handleSnapToSection(1);
              }, 100);

              return {
                ...prev,
                accumulatedScroll: newAccumulated,
                scrollResistance: newResistance,
                sectionProgress: newSectionProgress,
                shouldSnap: true,
              };
            }

            return {
              ...prev,
              accumulatedScroll: newAccumulated,
              scrollResistance: newResistance,
              sectionProgress: newSectionProgress,
            };
          });

          // Allow a small amount of scroll for visual feedback throughout the dance area
          const allowedScroll = scrollDelta * SCROLL_RESISTANCE_FACTOR;
          const newScrollY = Math.min(window.innerHeight - 1, lastScrollY.current + allowedScroll);
          window.scrollTo(0, newScrollY);
          lastScrollY.current = newScrollY;
          return;
        }
        
        // Handle upward scrolling - no resistance, allow smooth scrolling
        if (scrollDelta < 0) {
          // Always allow smooth upward scrolling
          lastScrollY.current = currentScrollY;
          return;
        }
        
        // Normal scroll behavior within dance area (not scrolling)
        lastScrollY.current = currentScrollY;
        return;
      }

      // Desktop scroll handling (existing logic)
      // Handle upward scrolling - prevent all movement until snap
      if (scrollDelta < 0) {
        // On mobile, only hijack upward scrolling if we're in section 1 trying to go back to section 0
        const shouldHijackUpwardScroll = isMobile ? currentSection === 1 : currentSection > 0;
        
        if (shouldHijackUpwardScroll) {
          e.preventDefault();
          e.stopPropagation();
          
          // Set scrolling up state to disable visuals
          setScrollState(prev => ({ ...prev, isScrollingUp: true }));
          
          if (!isProcessingUpwardScroll.current) {
            upwardScrollAccumulator.current += Math.abs(scrollDelta);
            
            // Reduced threshold for easier upward snapping
            const UPWARD_SNAP_THRESHOLD = 150;
            if (upwardScrollAccumulator.current >= UPWARD_SNAP_THRESHOLD) {
              isProcessingUpwardScroll.current = true;
              
              // Snap to previous section immediately
              const previousSection = currentSection - 1;
              if (snapTimeoutRef.current) {
                clearTimeout(snapTimeoutRef.current);
              }
              
              snapTimeoutRef.current = setTimeout(() => {
                handleSnapToSection(previousSection);
                upwardScrollAccumulator.current = 0;
                isProcessingUpwardScroll.current = false;
                // Reset scrolling up state after snap
                setScrollState(prev => ({ ...prev, isScrollingUp: false }));
              }, 100);
              
              return;
            }
          }
          
          // Keep the page locked at current position
          window.scrollTo(0, lastScrollY.current);
          
          // Reset scrolling up state after a delay if no snap occurred
          setTimeout(() => {
            setScrollState(prev => ({ ...prev, isScrollingUp: false }));
          }, 200);
          
          return;
        }
      }

      // Check if we're at the edge of a section and trying to scroll down
      const nextSectionStartY = getSectionScrollY(currentSection + 1);
      const distanceToNextSection = nextSectionStartY - currentScrollY;

      // On mobile, only hijack scrolling for the first section (dance area)
      const shouldHijackThisSection = isMobile ? currentSection === 0 : true;

      if (scrollDelta > 0 && distanceToNextSection <= window.innerHeight && shouldHijackThisSection) {
        e.preventDefault();
        e.stopPropagation();
        preventingScroll.current = true;

        // Accumulate the scroll resistance
        setScrollState(prev => {
          const newAccumulated = prev.accumulatedScroll + Math.abs(scrollDelta);
          const newResistance = Math.min(newAccumulated / SCROLL_RESISTANCE_THRESHOLD, 1);
          const newSectionProgress = Math.min(1, newResistance);

          // Check if we should snap to next section
          if (newAccumulated >= SCROLL_RESISTANCE_THRESHOLD && !prev.shouldSnap) {
            // Clear any existing timeout
            if (snapTimeoutRef.current) {
              clearTimeout(snapTimeoutRef.current);
            }
            
            // Snap to next section after a brief delay
            snapTimeoutRef.current = setTimeout(() => {
              const nextSection = Math.min(currentSection + 1, prev.totalSections - 1);
              handleSnapToSection(nextSection);
            }, 100);

            return {
              ...prev,
              accumulatedScroll: newAccumulated,
              scrollResistance: newResistance,
              sectionProgress: newSectionProgress,
              shouldSnap: true,
              isScrollingUp: false,
            };
          }

          return {
            ...prev,
            accumulatedScroll: newAccumulated,
            scrollResistance: newResistance,
            sectionProgress: newSectionProgress,
            isScrollingUp: false,
          };
        });

        // Allow a small amount of scroll for visual feedback
        const allowedScroll = scrollDelta * SCROLL_RESISTANCE_FACTOR;
        const newScrollY = Math.min(nextSectionStartY - 1, lastScrollY.current + allowedScroll);
        window.scrollTo(0, newScrollY);
        lastScrollY.current = newScrollY;
      } else {
        // Normal scroll behavior within the section
        lastScrollY.current = currentScrollY;
        updateSectionProgress();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isSnapping.current) return;
      
      const currentScrollY = window.scrollY;
      const currentSection = getCurrentSection(currentScrollY);
      
      // Mobile-specific wheel handling for dance area
      if (isMobile && currentSection === 0) {
        // Handle downward wheel scrolling - resist immediately from the top
        if (e.deltaY > 0) {
          // Apply resistance throughout the entire dance area
          e.preventDefault();
          e.stopPropagation();
          
          setScrollState(prev => {
            const newAccumulated = prev.accumulatedScroll + Math.abs(e.deltaY * 1.5);
            const newResistance = Math.min(newAccumulated / SCROLL_RESISTANCE_THRESHOLD, 1);
            const newSectionProgress = Math.min(1, newResistance);

            // Snap to next section when resistance threshold is met AND we're near the bottom
            if (newAccumulated >= SCROLL_RESISTANCE_THRESHOLD && !prev.shouldSnap && currentScrollY >= window.innerHeight - 150) {
              if (snapTimeoutRef.current) {
                clearTimeout(snapTimeoutRef.current);
              }
              
              snapTimeoutRef.current = setTimeout(() => {
                handleSnapToSection(1);
              }, 100);

              return {
                ...prev,
                accumulatedScroll: newAccumulated,
                scrollResistance: newResistance,
                sectionProgress: newSectionProgress,
                shouldSnap: true,
              };
            }

            return {
              ...prev,
              accumulatedScroll: newAccumulated,
              scrollResistance: newResistance,
              sectionProgress: newSectionProgress,
            };
          });
          return;
        }
        
        // Handle upward wheel scrolling - no resistance, smooth scrolling
        if (e.deltaY < 0) {
          // Always allow smooth upward scrolling
          return;
        }
        
        return;
      }
      
      // Desktop wheel handling (existing logic)
      // Handle upward wheel scrolling - prevent all movement until snap
      // On mobile, only hijack upward scrolling if we're in section 1 trying to go back to section 0
      const shouldHijackUpwardWheel = isMobile ? currentSection === 1 : currentSection > 0;
      if (scrollState.isScrollHijacked && e.deltaY < 0 && shouldHijackUpwardWheel) {
        e.preventDefault();
        e.stopPropagation();
        
        // Set scrolling up state to disable visuals
        setScrollState(prev => ({ ...prev, isScrollingUp: true }));
        
        if (!isProcessingUpwardScroll.current) {
          upwardScrollAccumulator.current += Math.abs(e.deltaY);
          
          const UPWARD_WHEEL_THRESHOLD = 250;
          if (upwardScrollAccumulator.current >= UPWARD_WHEEL_THRESHOLD) {
            isProcessingUpwardScroll.current = true;
            
            if (snapTimeoutRef.current) {
              clearTimeout(snapTimeoutRef.current);
            }
            
            snapTimeoutRef.current = setTimeout(() => {
              const previousSection = currentSection - 1;
              handleSnapToSection(previousSection);
              upwardScrollAccumulator.current = 0;
              isProcessingUpwardScroll.current = false;
              setScrollState(prev => ({ ...prev, isScrollingUp: false }));
            }, 100);
          }
        }
        return;
      }
      
      const nextSectionStartY = getSectionScrollY(currentSection + 1);
      const distanceToNextSection = nextSectionStartY - currentScrollY;

      // On mobile, only hijack scrolling for the first section (dance area)
      const shouldHijackThisSection = isMobile ? currentSection === 0 : true;

      if (scrollState.isScrollHijacked && e.deltaY > 0 && distanceToNextSection <= window.innerHeight && shouldHijackThisSection) {
        e.preventDefault();
        e.stopPropagation();
        
        // Accumulate wheel delta for resistance
        setScrollState(prev => {
          const newAccumulated = prev.accumulatedScroll + Math.abs(e.deltaY * 1.5);
          const newResistance = Math.min(newAccumulated / SCROLL_RESISTANCE_THRESHOLD, 1);
          const newSectionProgress = Math.min(1, newResistance);

          if (newAccumulated >= SCROLL_RESISTANCE_THRESHOLD && !prev.shouldSnap) {
            if (snapTimeoutRef.current) {
              clearTimeout(snapTimeoutRef.current);
            }
            
            snapTimeoutRef.current = setTimeout(() => {
              const nextSection = Math.min(currentSection + 1, prev.totalSections - 1);
              handleSnapToSection(nextSection);
            }, 100);

            return {
              ...prev,
              accumulatedScroll: newAccumulated,
              scrollResistance: newResistance,
              sectionProgress: newSectionProgress,
              shouldSnap: true,
            };
          }

          return {
            ...prev,
            accumulatedScroll: newAccumulated,
            scrollResistance: newResistance,
            sectionProgress: newSectionProgress,
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
      if (isSnapping.current) return;
      
      const currentScrollY = window.scrollY;
      const currentSection = getCurrentSection(currentScrollY);
      
      // Mobile-specific touch handling for dance area
      if (isMobile && currentSection === 0) {
        // Apply resistance throughout the entire dance area
        const touch = e.touches[0];
        if (touch) {
          setScrollState(prev => {
            const newAccumulated = prev.accumulatedScroll + 8; // Fixed increment for touch
            const newResistance = Math.min(newAccumulated / SCROLL_RESISTANCE_THRESHOLD, 1);
            const newSectionProgress = Math.min(1, newResistance);

            // Snap to next section when resistance threshold is met AND we're near the bottom
            if (newAccumulated >= SCROLL_RESISTANCE_THRESHOLD && !prev.shouldSnap && currentScrollY >= window.innerHeight - 150) {
              if (snapTimeoutRef.current) {
                clearTimeout(snapTimeoutRef.current);
              }
              
              snapTimeoutRef.current = setTimeout(() => {
                handleSnapToSection(1);
              }, 100);

              return {
                ...prev,
                accumulatedScroll: newAccumulated,
                scrollResistance: newResistance,
                sectionProgress: newSectionProgress,
                shouldSnap: true,
              };
            }

            return {
              ...prev,
              accumulatedScroll: newAccumulated,
              scrollResistance: newResistance,
              sectionProgress: newSectionProgress,
            };
          });
        }
        
        return;
      }

      // Desktop touch handling (existing logic)
      const nextSectionStartY = getSectionScrollY(currentSection + 1);
      const distanceToNextSection = nextSectionStartY - currentScrollY;

      // On mobile, only hijack scrolling for the first section (dance area)
      const shouldHijackThisSection = isMobile ? currentSection === 0 : true;

      if (scrollState.isScrollHijacked && distanceToNextSection <= window.innerHeight && shouldHijackThisSection) {
        const touch = e.touches[0];
        if (touch) {
          // Touch scrolling resistance
          setScrollState(prev => {
            const newAccumulated = prev.accumulatedScroll + 8; // Fixed increment for touch
            const newResistance = Math.min(newAccumulated / SCROLL_RESISTANCE_THRESHOLD, 1);
            const newSectionProgress = Math.min(1, newResistance);

            if (newAccumulated >= SCROLL_RESISTANCE_THRESHOLD && !prev.shouldSnap) {
              if (snapTimeoutRef.current) {
                clearTimeout(snapTimeoutRef.current);
              }
              
              snapTimeoutRef.current = setTimeout(() => {
                const nextSection = Math.min(currentSection + 1, prev.totalSections - 1);
                handleSnapToSection(nextSection);
              }, 100);

              return {
                ...prev,
                accumulatedScroll: newAccumulated,
                scrollResistance: newResistance,
                sectionProgress: newSectionProgress,
                shouldSnap: true,
              };
            }

            return {
              ...prev,
              accumulatedScroll: newAccumulated,
              scrollResistance: newResistance,
              sectionProgress: newSectionProgress,
            };
          });
        }
      }
    };

    // Update total sections on window resize
    const handleResize = () => {
      const totalSections = calculateTotalSections();
      setScrollState(prev => ({
        ...prev,
        totalSections,
      }));
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { capture: true, passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
    };
  }, [scrollState.isScrollHijacked, handleSnapToSection, updateSectionProgress, getCurrentSection, getSectionScrollY, calculateTotalSections, isMobile]);

  return {
    scrollState,
    enableScrollHijack,
    disableScrollHijack,
    handleSnapToSection,
  };
};
