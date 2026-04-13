// Motion role: mixed - ui-transition + decorative (refactor next).
import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import carFloat from "/public/assets/floatcar.json" // adjust path if needed
import { motionDistance, motionDurations, motionFramer } from '../lib/motion';

const HeroSection = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={motionFramer.heroReveal}
      sx={{
        height: '100vh',
        backgroundImage: 'url(../public/assets/Cover.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: motionDistance.small }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...motionFramer.heroContent, delay: motionDurations.ui }}
        sx={{
          position: 'relative',
          bottom: 50,
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: 3,
          textAlign: 'center',
          
        }}
      >
        <Typography
          variant="h2"
          sx={{ color: '#fff', fontWeight: 700 }}
          gutterBottom
        >
          Mercedes-AMG GT
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: '#ccc', mb: 3 }}
        >
          Performance. Redefined.
        </Typography>

        
        <Box
        sx={{
          position: 'absolute',
          bottom: -20,
          right: 30,
          width: 200,
          transform: 'scaleX(-1)',
          zIndex: 3,
        }}
      >
        <Lottie animationData={carFloat} loop={false} />
      </Box>

      {/* Typewriter Exhaust Text */}
      <Typography
        variant="body2"
        sx={{
          position: 'absolute',
          bottom: -20,
          right: 230,
          color: '#888888',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          width: '0ch',
          animation: 'typing 3s steps(20) forwards, blink 0.7s step-end infinite',
          zIndex: 3,
        }}
      >
        Scroll up to reveal
      </Typography>

      {/* Typewriter Animations */}
      <style>
        {`
          @keyframes typing {
            from { width: 0 }
            to { width: 20ch }
          }

          @keyframes blink {
            0%, 100% { border-color: transparent }
            50% { border-color: #ccc }
          }
        `}
      </style>

      </Box>
    </Box>
  );
};

export default HeroSection;
