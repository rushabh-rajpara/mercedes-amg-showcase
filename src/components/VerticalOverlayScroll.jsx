// Motion role: scroll-cinematic.
import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './HeroSection';
import ExteriorLayer from './ExteriorLayer';
import { motionDistance, motionEase, motionScroll } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const VerticalOverlayScroll = () => {
  const containerRef = useRef(null);
  const exteriorRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const exteriorShell = exteriorRef.current?.querySelector('.exterior-image-shell');
      const exteriorImage = exteriorRef.current?.querySelector('.exterior-image');
      const shadowScrim = exteriorRef.current?.querySelector('.exterior-shadow-scrim');
      const primaryOverlay = exteriorRef.current?.querySelector('.exterior-overlay-primary');
      const vignetteOverlay = exteriorRef.current?.querySelector('.exterior-overlay-vignette');
      const exteriorCopy = exteriorRef.current?.querySelector('.exterior-copy');

      gsap.set(exteriorRef.current, { yPercent: 100 });
      gsap.set(exteriorShell, { scale: 1, transformOrigin: 'center center' });
      gsap.set(exteriorImage, {
        scale: 1,
        filter: 'brightness(0.38) contrast(0.76) saturate(0.84)',
      });
      gsap.set(shadowScrim, { opacity: 1 });
      gsap.set(primaryOverlay, { opacity: 1 });
      gsap.set(vignetteOverlay, { opacity: 1 });
      gsap.set(exteriorCopy, { autoAlpha: 0, y: motionDistance.small });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=320%',
          scrub: motionScroll.scrub,
          pin: true,
          anticipatePin: motionScroll.anticipatePin,
        },
      });

      timeline
        .to(exteriorRef.current, {
          yPercent: 0,
          ease: motionEase.heavyOut,
          duration: 0.9,
        })
        .to(
          exteriorShell,
          {
            scale: 1.05,
            ease: motionEase.linear,
            duration: 1.9,
          },
          0.95
        )
        .to(
          exteriorImage,
          {
            filter: 'brightness(1) contrast(1.08) saturate(0.98)',
            ease: motionEase.linear,
            duration: 1.9,
          },
          0.95
        )
        .to(
          shadowScrim,
          {
            opacity: 0.16,
            ease: motionEase.linear,
            duration: 1.9,
          },
          0.95
        )
        .to(
          primaryOverlay,
          {
            opacity: 0.34,
            ease: motionEase.linear,
            duration: 1.9,
          },
          0.95
        )
        .to(
          vignetteOverlay,
          {
            opacity: 0.72,
            ease: motionEase.linear,
            duration: 1.9,
          },
          0.95
        )
        .to(
          exteriorCopy,
          {
            autoAlpha: 1,
            y: 0,
            ease: motionEase.standard,
            duration: 0.65,
          },
          2.45
        );
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
