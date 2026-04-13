import 'slick-carousel/slick/slick.css';
// Motion role: ui-transition orchestrator.
import React, { useState } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import InteriorLayer from './components/InteriorLayer';
import EngineLayer from './components/EngineLayer';
import PricingLayer from './components/PricingLayer';
import { Box } from '@mui/material';
import BrandStoryLayer from './components/BrandStoryLayer';
import CTALayer from './components/CTALayer';
import IntroLoader from './components/IntroLoader';
import VerticalOverlayScroll from './components/VerticalOverlayScroll';
import PerformanceLayer from './components/PerfomanceLayer';

function App() {
  const [introDone, setIntroDone] = useState(false);
  return (
    <>
          {!introDone && <IntroLoader onIntroComplete={() => setIntroDone(true)} />}

          {introDone && (
      <Box sx={{ overflowX: 'hidden', maxWidth: '100vw' }}>
  <VerticalOverlayScroll />
  <InteriorLayer />
  <EngineLayer />
  <PerformanceLayer />
  <PricingLayer />
  <BrandStoryLayer />
  <CTALayer />
</Box>

)}


    </>
  );
}

export default App;
