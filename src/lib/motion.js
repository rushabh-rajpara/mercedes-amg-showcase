// Motion system foundation for premium AMG pacing.
// Roles: GSAP section choreography, Framer intro/UI, CSS micro-interactions.

export const motionRoles = {
  scrollCinematic: 'scroll-cinematic',
  uiTransition: 'ui-transition',
  microInteraction: 'micro-interaction',
  static: 'static/presentational',
};

export const motionDurations = {
  instant: 0,
  micro: 0.2,
  ui: 0.45,
  reveal: 0.8,
  section: 1.1,
  hero: 1.4,
  introCurtain: 1.8,
};

export const motionEase = {
  standard: 'power2.out',
  heavyOut: 'power3.out',
  smooth: 'power1.out',
  linear: 'none',
};

export const motionDistance = {
  xSmall: 16,
  small: 24,
  medium: 40,
  large: 72,
  section: 120,
};

export const motionOpacity = {
  hidden: 0,
  soft: 0.6,
  visible: 1,
};

export const motionScroll = {
  viewportEnter: 'top 80%',
  viewportMid: 'top 70%',
  scrub: 1,
  anticipatePin: 1,
};

export const motionMicro = {
  hoverDuration: '0.2s',
  hoverEase: 'ease',
};

export const motionFramer = {
  introButton: {
    duration: motionDurations.ui,
    ease: [0.22, 1, 0.36, 1],
  },
  heroReveal: {
    duration: motionDurations.hero,
    ease: [0.22, 1, 0.36, 1],
  },
  heroContent: {
    duration: motionDurations.reveal,
    ease: [0.22, 1, 0.36, 1],
  },
};
