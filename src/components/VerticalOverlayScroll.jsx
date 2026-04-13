// Motion role: scroll-cinematic.
import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './HeroSection';
import ExteriorLayer from './ExteriorLayer';
import { motionEase, motionScroll } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const VerticalOverlayScroll = () => {
  const containerRef = useRef(null);
  const exteriorRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.set(exteriorRef.current, { yPercent: 100 });

      gsap.to(exteriorRef.current, {
        yPercent: 0,
        ease: motionEase.heavyOut,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: motionScroll.scrub,
          pin: true,
          anticipatePin: motionScroll.anticipatePin,
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <Box>
      {/* Scroll-driven container */}
      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Hero is pinned in background */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            zIndex: 1,
          }}
        >
          <HeroSection />
        </Box>

        {/* Exterior scrolls over Hero */}
        <Box
          ref={exteriorRef}
          sx={{
            position: 'absolute',
            top: 0,
            height: '100vh',
            width: '100%',
            zIndex: 2,
          }}
        >
          <ExteriorLayer />
        </Box>
      </Box>
    </Box>
  );
};

export default VerticalOverlayScroll;
