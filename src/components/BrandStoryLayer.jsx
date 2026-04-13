// Motion role: scroll-cinematic section reveal.
import React, { useRef, useLayoutEffect } from 'react';
import { Box, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motionDistance, motionDurations, motionEase, motionScroll } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const BrandStoryLayer = () => {
  const containerRef = useRef(null);
  const quoteRef = useRef(null);
  const paragraphRef = useRef(null);
  const sloganRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Run once on first entry: this section is a late-scene narrative beat,
      // so replaying it on reverse scroll would feel overly theatrical.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: motionScroll.viewportMid,
          once: true,
        },
      });

      timeline
        .fromTo(
          quoteRef.current,
          { opacity: 0, y: motionDistance.medium },
          {
            opacity: 1,
            y: 0,
            duration: motionDurations.section,
            ease: motionEase.heavyOut,
          }
        )
        .fromTo(
          paragraphRef.current,
          { opacity: 0, y: motionDistance.small },
          {
            opacity: 1,
            y: 0,
            duration: motionDurations.hero,
            ease: motionEase.heavyOut,
          },
          '-=0.45'
        )
        .fromTo(
          sloganRef.current,
          { opacity: 0, y: motionDistance.xSmall },
          {
            opacity: 1,
            y: 0,
            duration: motionDurations.reveal,
            ease: motionEase.standard,
          },
          '-=0.55'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        px: { xs: 3, md: 12 },
        py: { xs: 10, md: 16 },
        backgroundColor: '#111',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      <Typography
        ref={quoteRef}
        variant="h3"
        fontWeight={700}
        textAlign="center"
        sx={{ color: '#f0c000', letterSpacing: 1 }}
      >
        "Driving Performance"
      </Typography>

      <Typography
        ref={paragraphRef}
        variant="h6"
        fontWeight={400}
        textAlign="center"
        sx={{ maxWidth: 900, mx: 'auto', lineHeight: 1.8 }}
      >
        Every Mercedes-AMG is more than a car — it's a statement of engineering mastery,
        precision performance, and uncompromising design. From our racing heritage to our
        handcrafted engines, we push boundaries to bring thrill and luxury together.
      </Typography>

      <Typography
        ref={sloganRef}
        variant="h5"
        textAlign="center"
        fontStyle="italic"
        sx={{ color: 'gray.300', mt: 8 }}
      >
        “One Man, One Engine” — the AMG Promise
      </Typography>
    </Box>
  );
};

export default BrandStoryLayer;
