// Motion role: ui-transition.
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../App.css';
import { motionDurations, motionFramer } from '../lib/motion';

const IntroLoader = ({ onIntroComplete }) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);
  const [showLaunch, setShowLaunch] = useState(false);
  const [startCurtain, setStartCurtain] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  // Simulate loading 0% to 100%
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setPercent((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setLoading(false);
              setShowLaunch(true);
            }, 500);
            return 100;
          }
          return prev + 1;
        });
      }, 25);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Play video after curtain animation
  useEffect(() => {
    if (videoVisible && videoRef.current) {
      const playAfterDelay = setTimeout(() => {
        videoRef.current.play().catch((err) => console.error("Play failed", err));
      }, 800);
      return () => clearTimeout(playAfterDelay);
    }
  }, [videoVisible]);

  const handleLaunch = () => {
    setShowLaunch(false);
    setStartCurtain(true);
    setTimeout(() => {
      setVideoVisible(true);
    }, 400); // curtain just starting to open
  };

  const handleVideoEnd = () => {
    onIntroComplete();
    window.scrollTo(0, 0);
  };

  const handleSkip = () => {
    videoRef.current?.pause();
    onIntroComplete();
    window.scrollTo(0, 0);
  };

  return (
    <AnimatePresence>
      {(loading || showLaunch || startCurtain || videoVisible) && (
        <motion.div
          className="intro-container"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Loading Screen */}
          {loading && (
            <div className="loader-container">
              <motion.h1 className="loader-text">
                {percent}%
              </motion.h1>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${percent}%` }} />
              </div>
            </div>
          )}

          {/* Launch Button */}
          {!loading && showLaunch && (
            <motion.button
              className="launch-btn fancy-glow"
              onClick={handleLaunch}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgb(255, 0, 0)" }}
              transition={motionFramer.introButton}
            >
              <span className="btn-text">Launch Experience</span>
            </motion.button>
          )}

          {/* Curtain Animation */}
          {startCurtain && (
            <>
              <motion.div
                className="curtain left"
                initial={{ x: 0 }}
                animate={{ x: '-100%' }}
                transition={{ duration: motionDurations.introCurtain, ease: [0.65, 0, 0.35, 1] }}
              />
              <motion.div
                className="curtain right"
                initial={{ x: 0 }}
                animate={{ x: '100%' }}
                transition={{ duration: motionDurations.introCurtain, ease: [0.65, 0, 0.35, 1] }}
              />
            </>
          )}

          {/* Video */}
          {videoVisible && (
            <div className="video-overlay">
              <video
                ref={videoRef}
                className="intro-video"
                playsInline
                onEnded={handleVideoEnd}
                muted
              >
                <source src="/assets/Intro.mp4" type="video/mp4" />
              </video>
              <button className="skip-btn" onClick={handleSkip}>Skip</button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
