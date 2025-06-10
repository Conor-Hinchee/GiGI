import { useState, useEffect } from 'react';

export const useScrollPosition = (isMobile: boolean) => {
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll effect - disabled on mobile
  useEffect(() => {
    if (isMobile) return; // Exit early on mobile

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return { scrollY };
};
