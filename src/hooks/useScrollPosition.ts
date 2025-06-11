import { useState, useEffect } from 'react';

export const useScrollPosition = (isMobile: boolean) => {
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll effect - now enabled for all devices
  // Parameter kept for future use - reference it to avoid TypeScript error
  void isMobile;
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY };
};
