// Motion role: mixed - scroll-cinematic + ui-transition.
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motionDistance, motionDurations, motionEase, motionScroll } from '../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const trims = {
  GT: {
    price: 136000,
    power: '469 HP',
    torque: '516 lb-ft',
    speed: '3.9s (0â€“100 km/h)',
    features: ['AMG RIDE CONTROL', 'Rear-Wheel Drive', 'Active Exhaust'],
  },
  GTS: {
    price: 151600,
    power: '523 HP',
    torque: '516 lb-ft',
    speed: '3.7s (0â€“100 km/h)',
    features: ['Performance Exhaust', 'Larger Brakes', 'Sport+ Drive Mode'],
  },
  GTR: {
    price: 177000,
    power: '577 HP',
    torque: '590 lb-ft',
    speed: '3.5s (0â€“100 km/h)',
    features: ['Carbon Roof', 'Track Package', 'AMG Dynamics Pro'],
  },
};

const formatPrice = (value) => `$${Math.round(value).toLocaleString()}`;

const PricingLayer = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const priceValueRef = useRef(null);
  const currentPriceRef = useRef(trims.GT.price);
  const priceTweenRef = useRef(null);
  const [selectedTrim, setSelectedTrim] = useState('GT');

  const selectedTrimData = trims[selectedTrim];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (priceValueRef.current) {
        priceValueRef.current.textContent = formatPrice(currentPriceRef.current);
      }

      // Run once on first entry: this section should feel like a composed
      // decision zone, not a replaying cinematic set piece.
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: motionDistance.small,
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

    return () => {
      priceTweenRef.current?.kill();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!priceValueRef.current) {
      return undefined;
    }

    const nextPrice = selectedTrimData.price;

    priceTweenRef.current?.kill();

    const counter = { value: currentPriceRef.current };
    priceTweenRef.current = gsap.to(counter, {
      value: nextPrice,
      duration: motionDurations.reveal,
      ease: motionEase.smooth,
      onUpdate: () => {
        if (priceValueRef.current) {
          priceValueRef.current.textContent = formatPrice(counter.value);
        }
      },
      onComplete: () => {
        currentPriceRef.current = nextPrice;
      },
    });

    return () => {
      priceTweenRef.current?.kill();
      priceTweenRef.current = null;
    };
  }, [selectedTrimData.price]);

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: '80vh',
        backgroundColor: '#0a0a0a',
        color: '#fff',
        px: 3,
        py: 10,
        textAlign: 'center',
        overflowX: 'hidden',
        maxWidth: '100vw',
        width: '100%',
      }}
    >
      <Box ref={contentRef}>
        <Typography variant="h4" fontWeight={700} mb={4} color="gold">
          Choose Your AMG GT Trim
        </Typography>

        {/* Micro-interaction only: trim controls stay responsive without becoming animated content. */}
        <ToggleButtonGroup
          value={selectedTrim}
          exclusive
          onChange={(e, value) => value && setSelectedTrim(value)}
          sx={{
            background: '#1a1a1a',
            borderRadius: '8px',
            mb: 6,
          }}
        >
          <ToggleButton value="GT" sx={{ color: '#fff', px: 4 }}>GT</ToggleButton>
          <ToggleButton value="GTS" sx={{ color: '#fff', px: 4 }}>GT S</ToggleButton>
          <ToggleButton value="GTR" sx={{ color: '#fff', px: 4 }}>GT R Pro</ToggleButton>
        </ToggleButtonGroup>

        <Box
          sx={{
            maxWidth: 700,
            mx: 'auto',
            py: 5,
            px: 4,
            borderRadius: 4,
            background: 'linear-gradient(145deg, #1a1a1a, #101010)',
            boxShadow: '0 0 40px rgba(255, 215, 0, 0.15)',
          }}
        >
          <Typography variant="h3" fontWeight={700} mb={2} ref={priceValueRef}>
            {formatPrice(currentPriceRef.current)}
          </Typography>

          <Typography variant="h6" mb={1}>
            {selectedTrimData.power} â€¢ {selectedTrimData.torque}
          </Typography>
          <Typography variant="subtitle1" mb={3}>
            Acceleration: {selectedTrimData.speed}
          </Typography>

          <Box sx={{ mt: 2 }}>
            {selectedTrimData.features.map((feature, idx) => (
              <Typography
                key={idx}
                variant="body1"
                sx={{
                  mb: 1,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px',
                  px: 2,
                  py: 1,
                }}
              >
                âœ… {feature}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PricingLayer;
