// Motion role: mixed - scroll-cinematic + micro-interaction.
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import transmission from '/public/assets/TRANSMISSION.webp';
import brakes from '/public/assets/BRAKE.webp';
import suspension from '/public/assets/SUSPENSION.webp';
import dynamics from '/public/assets/DRIVING-DYNAMICS.webp';
import {
  motionDistance,
  motionDurations,
  motionEase,
  motionMicro,
  motionScroll,
} from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'AMG Transmission',
    desc: 'MCT 9-speed gearbox for ultra-fast, smooth shifts and intelligent driving logic.',
    image: transmission,
  },
  {
    title: 'High Performance Brakes',
    desc: 'Carbon ceramic brakes offer fade-free stopping with iconic AMG red calipers.',
    image: brakes,
  },
  {
    title: 'AMG Suspension',
    desc: 'Electronically adaptive Ride Control suspension for precision handling.',
    image: suspension,
  },
  {
    title: 'Driving Dynamics',
    desc: 'Torque vectoring, drift modes, and track-tuned balance for optimal control.',
    image: dynamics,
  },
];

const PerformanceLayer = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const copyRef = useRef(null);
  const initialSwapRef = useRef(true);
  const isTransitioningRef = useRef(false);
  const pendingIndexRef = useRef(null);

  const [index, setIndex] = useState(0);
  const selectedFeature = features[index];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Run once on entry: this scene should land as a confident proof point,
      // not replay like a showroom widget when users scrub the page.
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: motionDistance.medium,
        },
        {
          opacity: 1,
          y: 0,
          duration: motionDurations.section,
          ease: motionEase.heavyOut,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: containerRef.current,
            start: motionScroll.viewportEnter,
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (initialSwapRef.current) {
      initialSwapRef.current = false;
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          y: motionDistance.small,
          scale: 0.985,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: motionDurations.reveal,
          ease: motionEase.standard,
          clearProps: 'transform',
        }
      );

      gsap.fromTo(
        copyRef.current,
        {
          opacity: 0,
          y: motionDistance.xSmall,
        },
        {
          opacity: 1,
          y: 0,
          duration: motionDurations.reveal,
          ease: motionEase.standard,
          clearProps: 'transform',
          onComplete: () => {
            isTransitioningRef.current = false;
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [index]);

  const changeFeature = (direction) => {
    if (isTransitioningRef.current) {
      return;
    }

    isTransitioningRef.current = true;
    pendingIndexRef.current =
      direction === 'next'
        ? (index + 1) % features.length
        : (index - 1 + features.length) % features.length;

    const timeline = gsap.timeline({
      defaults: {
        duration: motionDurations.ui,
        ease: motionEase.standard,
      },
      onComplete: () => {
        setIndex(pendingIndexRef.current);
      },
    });

    timeline
      .to(imageRef.current, {
        opacity: 0,
        y: -motionDistance.xSmall,
        scale: 0.985,
      })
      .to(
        copyRef.current,
        {
          opacity: 0,
          y: -motionDistance.xSmall,
        },
        0
      );
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: 8,
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <Box
        ref={contentRef}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#f0c000',
            fontWeight: 700,
            mb: 6,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          AMG Performance Highlights
        </Typography>

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <IconButton
            onClick={() => changeFeature('prev')}
            sx={{
              border: '2px solid red',
              color: 'red',
              '&:hover': {
                backgroundColor: 'rgba(255,0,0,0.1)',
                transform: 'scale(1.06)',
              },
              transition: `all ${motionMicro.hoverDuration} ${motionMicro.hoverEase}`,
            }}
          >
            <FaChevronLeft size={24} />
          </IconButton>

          <Box
            component="img"
            ref={imageRef}
            src={selectedFeature.image}
            alt={selectedFeature.title}
            sx={{
              height: { xs: '45vh', md: '55vh' },
              objectFit: 'contain',
              mx: 2,
              borderRadius: 2,
              filter: 'brightness(0.95)',
            }}
          />

          <IconButton
            onClick={() => changeFeature('next')}
            sx={{
              border: '2px solid red',
              color: 'red',
              '&:hover': {
                backgroundColor: 'rgba(255,0,0,0.1)',
                transform: 'scale(1.06)',
              },
              transition: `all ${motionMicro.hoverDuration} ${motionMicro.hoverEase}`,
            }}
          >
            <FaChevronRight size={24} />
          </IconButton>
        </Box>

        <Box ref={copyRef} sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ color: '#f0c000', mb: 1, fontWeight: 600 }}>
            {selectedFeature.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 600, color: '#aaa', px: 2 }}
          >
            {selectedFeature.desc}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PerformanceLayer;
