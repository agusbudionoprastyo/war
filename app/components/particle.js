import { useEffect } from 'react';

const Particle = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      window.particlesJS.load('particles-js', '/particles.json', (error) => {
        if (error) {
          console.error('Error loading particles:', error);
        } else {
          console.log('Particles loaded successfully');
        }
      });
    };
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="particles-js" className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default Particle;

