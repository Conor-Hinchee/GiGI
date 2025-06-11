import { useState, useEffect } from 'react';

export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // DISABLED FOR PROD - always return false for mobile
    setIsMobile(false);
    
    // const checkMobile = () => {
    //   setIsMobile(window.innerWidth <= 768);
    // };
    // checkMobile();
    // window.addEventListener("resize", checkMobile);
    // return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return { isMobile };
};
