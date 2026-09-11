import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const navItems = [
  { label: 'WORK', href: '#work' },
  { label: 'SERVICES', href: '#skills' },
  { label: 'ABOUT', href: '#about' },
];

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [entered, setEntered] = useState(false);
  const [finished, setFinished] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 22 });
  const sy = useSpring(my, { stiffness: 70, damping: 22 });
  const textX = useTransform(sx, [-1, 1], [-8, 8]);
  const visualX = useTransform(sx, [-1, 1], [10, -10]);
  const visualY = useTransform(sy, [-1, 1], [8, -8]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mx.set((event.clientX / window.innerWidth - 0.5) * 2);
      my.set((event.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="ajay-hero" aria-label="Ajay — Shopify developer">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />

      <header className="hero-nav">
        <a className="brand" href="#top" aria-label="Ajay home">
          AJAY<span>DEV</span>
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <a className="hire-link" href="#contact">
          HIRE ME <span>↗</span>
        </a>
      </header>

      <div className="hero-meta hero-meta-left">01 — INDEPENDENT DEVELOPER</div>
      <div className="hero-meta hero-meta-right">SHOPIFY / E-COMMERCE / UI-UX</div>

      <motion.div className="hero-copy" style={{ x: textX }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 18 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          DIGITAL COMMERCE, ART-DIRECTED.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 35, filter: 'blur(12px)' }}
          animate={entered ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 35, filter: 'blur(12px)' }}
          transition={{ duration: 1.15, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>AJAY</span>
          <em>BUILDS</em>
          <span>STORES.</span>
        </motion.h1>

        <motion.div
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>Premium Shopify stores and digital experiences for brands that want to look unmistakably different — designed with taste, built with precision.</p>
          <div className="hero-actions">
            <a className="primary-action" href="#work">VIEW MY WORK <span>↓</span></a>
            <a className="secondary-action" href="#contact">START A PROJECT <span>↗</span></a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        style={{ x: visualX, y: visualY }}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={entered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
        transition={{ duration: 1.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="visual-frame" />
        <div className="visual-vignette" />
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() => setFinished(true)}
          className={finished ? 'is-finished' : ''}
        >
          <source src="/videos/ajay-walk.mp4" type="video/mp4" />
        </video>
        <div className="visual-label">AJAY / 01</div>
        <div className="visual-line" />
      </motion.div>

      <div className="hero-bottom">
        <div className="stat"><strong>01+</strong><span>YEAR BUILDING</span></div>
        <div className="stat"><strong>05</strong><span>CLIENTS</span></div>
        <div className="stat"><strong>120+</strong><span>COUNTRIES REACHED</span></div>
        <div className="scroll-note"><span className="scroll-dot" /> SCROLL TO EXPLORE</div>
      </div>

      <div className="hero-pulse" aria-hidden="true">
        <span>{finished ? 'CRAFT / DETAIL / IMPACT' : 'ENTERING THE WORK'}</span>
      </div>
    </section>
  );
};
