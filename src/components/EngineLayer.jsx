// Motion role: mixed - scroll-cinematic + micro-interaction.
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { FaCircle } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import badge from '/public/assets/AFFALTERBACH-BADGE.webp';
import engine1 from '/public/assets/Engine_p1.png';
import engine2 from '/public/assets/Engine_p2.png';
import engine3 from '/public/assets/Engine_p3.png';
import engineVideo from '/public/assets/Engine_vid.mp4';
import {
  motionDistance,
  motionDurations,
  motionEase,
  motionMicro,
  motionScroll,
} from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const engineViews = [
  {
    title: 'Top View',
    image: engine1,
    desc: 'AMG handcrafted top layout with prominent turbo layout.',
  },
  {
    title: 'Front Angle',
    image: engine2,
    desc: 'View highlighting the cooling and airflow structures.',
  },
  {
    title: 'Rear Turbo Side',
    image: engine3,
    desc: 'Rear-side showcasing twin-scroll turbo and routing.',
  },
];

const EngineLayer = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const initialSwapRef = useRef(true);
  const isTransitioningRef = useRef(false);
  const pendingIndexRef = useRef(null);

  const [selected, setSelected] = useState(0);
  const selectedView = engineViews[selected];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Run once on entry: this section should arrive with controlled mechanical weight,
      // not replay like a feature demo while users scrub the page.
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
        detailsRef.current,
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
  }, [selected]);

  const handleSelect = (index) => {
    if (index === selected || isTransitioningRef.current) {
      return;
    }

    pendingIndexRef.current = index;
    isTransitioningRef.current = true;

    const timeline = gsap.timeline({
      defaults: {
        duration: motionDurations.ui,
        ease: motionEase.standard,
      },
      onComplete: () => {
        setSelected(pendingIndexRef.current);
      },
    });

    timeline
      .to(imageRef.current, {
        opacity: 0,
        y: -motionDistance.xSmall,
        scale: 0.985,
      })
      .to(
        detailsRef.current,
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
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        pt: 6,
        pb: 4,
        position: 'relative',
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
          gap: 4,
        }}
      >
        <Box
          component="img"
          src={badge}
          alt="AMG Badge"
          sx={{
            position: 'absolute',
            top: 30,
            left: 30,
            width: 100,
            opacity: 0.6,
          }}
        />

        <Box
          sx={{
            width: '95%',
            maxWidth: '1100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            flexWrap: 'wrap',
          }}
        >
          <Box
            component="video"
            src={engineVideo}
            autoPlay
            muted
            loop
            playsInline
            sx={{
              width: { xs: '100%', md: '45%' },
              borderRadius: 4,
              filter: 'brightness(0.85)',
            }}
          />

          <Box
            component="img"
            ref={imageRef}
            src={selectedView.image}
            alt={selectedView.title}
            sx={{
              width: { xs: '100%', md: '45%' },
              maxHeight: '50vh',
              objectFit: 'contain',
              filter: 'brightness(1)',
            }}
          />
        </Box>

        <Box
          ref={detailsRef}
          sx={{
            maxWidth: 700,
            color: '#ccc',
            mt: 4,
          }}
        >
          <Typography variant="h5" sx={{ color: '#f0c000', fontWeight: 600, mb: 1 }}>
            {selectedView.title}
          </Typography>
          <Typography variant="body1">{selectedView.desc}</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          {engineViews.map((view, index) => (
            <Tooltip title={view.title} key={view.title} arrow>
              <IconButton
                onClick={() => handleSelect(index)}
                sx={{
                  transform: selected === index ? 'scale(1.15)' : 'scale(1)',
                  transition: `transform ${motionMicro.hoverDuration} ${motionMicro.hoverEase}`,
                }}
              >
                <FaCircle color={selected === index ? '#f0c000' : '#444'} size={12} />
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default EngineLayer;
