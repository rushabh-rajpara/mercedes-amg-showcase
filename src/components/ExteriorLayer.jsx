// Motion role: static/presentational.
import React from 'react';
import { Box, Typography } from '@mui/material';
import exteriorHero from '/public/assets/Cover.jpg';

const ExteriorLayer = () => {
  return (
    <Box
      id="exterior"
      aria-label="Exterior Showcase Layer"
      sx={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      <Box
        component="img"
        src={exteriorHero}
        alt="Mercedes-AMG GT exterior"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          filter: 'brightness(0.5) saturate(0.9)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 34%, rgba(0,0,0,0.22) 58%, rgba(0,0,0,0.82) 100%)',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.08) 48%, rgba(0,0,0,0.55) 100%)',
          zIndex: 2,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: { xs: 28, md: 42 },
          left: { xs: 24, md: 48 },
          right: { xs: 24, md: 'auto' },
          zIndex: 3,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: 'rgba(255,255,255,0.72)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
          }}
        >
          Exterior Design
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          left: { xs: 24, md: 48 },
          right: { xs: 24, md: 'auto' },
          bottom: { xs: 36, md: 52 },
          zIndex: 3,
          maxWidth: { xs: '100%', md: 520 },
          textAlign: 'left',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: '#fff',
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            mb: 1.5,
          }}
        >
          Sculpted
          <br />
          Presence
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255,255,255,0.74)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
          }}
        >
          Long hood • wide stance • unmistakable AMG silhouette
        </Typography>
      </Box>
    </Box>
  );
};

export default ExteriorLayer;
