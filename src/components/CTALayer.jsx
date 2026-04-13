// Motion role: mixed - scroll-cinematic + micro-interaction.
import React, { useRef, useLayoutEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motionDistance, motionDurations, motionEase, motionMicro, motionScroll } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const CTALayer = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Run once on first entry: the CTA should land as a composed final invitation,
      // not repeatedly replay as users scrub near the page end.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: motionScroll.viewportEnter,
          once: true,
        },
      });

      timeline
        .fromTo(
          textRef.current,
          { opacity: 0, y: motionDistance.medium },
          {
            opacity: 1,
            y: 0,
            duration: motionDurations.section,
            ease: motionEase.heavyOut,
          }
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: motionDistance.small },
          {
            opacity: 1,
            y: 0,
            duration: motionDurations.reveal,
            ease: motionEase.standard,
          },
          '-=0.4'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: '60vh',
        px: 4,
        py: 10,
        background: 'linear-gradient(135deg, #0c0c0c, #1a1a1a)',
        color: '#fff',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        ref={textRef}
        variant="h4"
        fontWeight={700}
        sx={{ mb: 3, color: '#f0c000' }}
      >
        Ready to Feel the Drive?
      </Typography>

      <Button
        ref={buttonRef}
        variant="outlined"
        sx={{
          px: 6,
          py: 1.5,
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#fff',
          borderColor: '#f0c000',
          '&:hover': {
            backgroundColor: '#f0c000',
            color: '#000',
          },
          transition: `background-color ${motionMicro.hoverDuration} ${motionMicro.hoverEase}, color ${motionMicro.hoverDuration} ${motionMicro.hoverEase}, border-color ${motionMicro.hoverDuration} ${motionMicro.hoverEase}`,
        }}
      >
        Pre-Order Your AMG Now
      </Button>
    </Box>
  );
};

export default CTALayer;
