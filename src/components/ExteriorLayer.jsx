// Motion role: static/presentational.
import React from 'react';
import { Box, Typography } from '@mui/material';
import exteriorHero from '/public/assets/Exterior.png';

const ExteriorLayer = () => {
  return (
    <Box
      id="exterior"
      aria-label="Exterior Reveal Layer"
      sx={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      <Box
        className="exterior-image-shell"
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}
      >
      <Box
        component="img"
        className="exterior-image"
        src={exteriorHero}
        alt="White Mercedes-AMG GT front view in a tunnel"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          transformOrigin: 'center center',
          filter: 'brightness(0.38) contrast(0.76) saturate(0.84)',
        }}
      />
      </Box>

      <Box
        className="exterior-shadow-scrim"
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.42)',
          zIndex: 1,
        }}
      />

      <Box
        className="exterior-overlay-primary"
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.46) 34%, rgba(0,0,0,0.18) 58%, rgba(0,0,0,0.92) 100%)',
          zIndex: 2,
          opacity: 1,
        }}
      />

      <Box
        className="exterior-overlay-vignette"
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at center, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.16) 44%, rgba(0,0,0,0.64) 100%)',
          zIndex: 3,
          opacity: 1,
        }}
      />

      <Box
        className="exterior-copy"
        sx={{
          position: 'absolute',
          left: { xs: 24, md: 52 },
          bottom: { xs: 42, md: 56 },
          zIndex: 4,
          maxWidth: { xs: '78%', md: 340 },
          opacity: 0,
          textAlign: 'left',
          transform: 'translateY(24px)',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(240,240,240,0.76)',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontSize: { xs: '0.78rem', md: '0.88rem' },
          }}
        >
          Precision in Every Line.
        </Typography>
      </Box>
    </Box>
  );
};

export default ExteriorLayer;
