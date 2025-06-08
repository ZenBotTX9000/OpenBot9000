import { Variants } from 'framer-motion';

export const emergeAnimation: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(8px)',
    scale: 0.95,
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
      staggerChildren: 0.07,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(8px)',
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: 'anticipate',
    },
  },
};

export const tapAnimation = {
  whileTap: {
    scale: 0.97,
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
};

export const hoverAnimation = {
  whileHover: {
    scale: 1.03,
    transition: { type: 'spring', stiffness: 300, damping: 10 },
  }
}