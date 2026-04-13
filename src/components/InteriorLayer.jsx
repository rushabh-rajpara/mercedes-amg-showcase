// Motion role: scroll-cinematic.
import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import driverView from '/public/assets/Driver view.avif';
import frontSeats from '/public/assets/Front seats.avif';
import ledScreen from '/public/assets/LED Screen.webp';
import windowControl from '/public/assets/Window control.jpg';
import { motionEase, motionScroll } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: driverView, label: 'Driver View' },
  { src: frontSeats, label: 'Front Seats' },
  { src: ledScreen, label: 'LED Screen' },
  { src: windowControl, label: 'Window Control' },
];

const InteriorLayer = () => {
  const containerRef = useRef(null);
  const panelRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelRef.current;
      const totalWidth = panels.length * window.innerWidth;

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: motionEase.linear,
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: motionScroll.scrub,
          end: () => `+=${totalWidth}`,
        },
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        height: '100vh',
        width: `${100 * images.length}vw`,
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
      }}
    >
      {images.map((img, index) => (
        <Box
          key={index}
          ref={(el) => (panelRef.current[index] = el)}
          sx={{
            width: '100vw',
            height: '100vh',
            flexShrink: 0,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 4,
            py: 6,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '80%',
              height: '80%',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 0 30px rgba(255,255,255,0.1)',
              background: 'linear-gradient(120deg, #111 0%, #1a1a1a 100%)',
            }}
          >
            <Box
              component="img"
              src={img.src}
              alt={img.label}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.9,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                p: 3,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {img.label}
              </Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default InteriorLayer;
