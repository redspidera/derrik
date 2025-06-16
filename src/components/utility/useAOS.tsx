import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const useAOS = () => {
  useEffect(() => {
    // Initialize AOS when the component is mounted
    AOS.init({
      duration: 1000, // Duration of animations
      once: true,     // Animation happens only once
    });
  }, []); // Empty array to ensure it runs once on mount
};

export default useAOS;