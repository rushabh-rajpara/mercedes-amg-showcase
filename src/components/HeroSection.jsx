// Motion role: ui-transition.
import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import heroImage from '/public/assets/Cover1.png';
import { motionDistance, motionDurations, motionFramer } from '../lib/motion';

const heroFontStack =
  '"Aptos Display", "Aptos", "Segoe UI Variable Display", "Helvetica Neue", "Arial Nova", sans-serif';

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      <Box
        component={motion.img}
        src={heroImage}
        alt="Mercedes-AMG GT hero"
        initial={{ opacity: 0.94, scale: 1.045 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...motionFramer.heroReveal, duration: motionDurations.hero * 1.5 }}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: { xs: '64% center', md: 'center center' },
          willChange: 'transform',
        }}
      />

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: motionDurations.hero }}
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.34) 30%, rgba(0,0,0,0.10) 54%, rgba(0,0,0,0.86) 100%)',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 42%, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.12) 42%, rgba(0,0,0,0.58) 100%)',
          zIndex: 2,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.16) 36%, rgba(0,0,0,0.18) 64%, rgba(0,0,0,0.68) 100%)',
          zIndex: 3,
        }}
      />

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: motionDistance.small }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...motionFramer.heroContent, delay: motionDurations.ui * 1.15, duration: motionDurations.hero }}
        sx={{
          position: 'relative',
          zIndex: 4,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'flex-start', md: 'flex-start' },
          alignItems: { xs: 'flex-start', md: 'flex-start' },
          textAlign: 'left',
          px: { xs: 3, md: 6 },
          pt: { xs: '18vh', md: '15vh' },
          fontFamily: heroFontStack,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: 'rgba(233,233,233,0.52)',
            fontWeight: 450,
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            fontSize: {
              xs: '0.56rem',
              md: '0.64rem',
            },
            mb: { xs: 1.75, md: 2.25 },
            pl: '0.12em',
            fontFamily: heroFontStack,
          }}
        >
          AMG Performance
        </Typography>

        <Typography
          variant="h1"
          component="h1"
          sx={{
            color: 'rgba(240,240,240,0.94)',
            fontWeight: 620,
            letterSpacing: '-0.018em',
            lineHeight: 0.9,
            fontSize: {
              xs: 'clamp(1.9rem, 7vw, 2.65rem)',
              md: 'clamp(3rem, 4.2vw, 4rem)',
            },
            maxWidth: { xs: '7.5ch', md: 'none' },
            textWrap: 'balance',
            fontFamily: heroFontStack,
            textRendering: 'geometricPrecision',
          }}
        >
          <Box component="span" sx={{ display: { xs: 'block', md: 'inline' }, whiteSpace: 'nowrap' }}>
            Mercedes-AMG
          </Box>{' '}
          <Box component="span" sx={{ display: { xs: 'block', md: 'inline' }, whiteSpace: 'nowrap' }}>
            GT
          </Box>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: { xs: 3.25, md: 3.75 },
            color: 'rgba(219,219,219,0.62)',
            fontWeight: 380,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontSize: {
              xs: '0.66rem',
              md: '0.78rem',
            },
            pl: '0.18em',
            lineHeight: 1.45,
            fontFamily: heroFontStack,
          }}
        >
          Engineered for Dominance.
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;
