import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const navItems = [
  { name: 'WORK', href: '#work' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SERVICES', href: '#skills' },
  { name: 'CONTACT', href: '#contact' },
];

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 22, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 70, damping: 22, mass: 0.8 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mx.set((event.clientX / window.innerWidth - 0.5) * 18);
      my.set((event.clientY / window.innerHeight - 0.5) * 12);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  const scrollToWork = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="aj-hero" aria-label="Ajay portfolio introduction">
      <div className={`aj-hero__intro ${ready ? 'is-out' : ''}`} aria-hidden="true">
        <div className="aj-hero__intro-mark">AJAY</div>
        <div className="aj-hero__intro-line" />
        <div className="aj-hero__intro-caption">Independent developer · Shopify · Web</div>
      </div>

      <div className="aj-hero__grain" aria-hidden="true" />
      <div className="aj-hero__grid" aria-hidden="true" />
      <div className="aj-hero__orb aj-hero__orb--one" aria-hidden="true" />
      <div className="aj-hero__orb aj-hero__orb--two" aria-hidden="true" />

      <motion.div
        className="aj-hero__scene"
        style={{ x: sx, y: sy }}
        aria-hidden="true"
      >
        <div className="aj-hero__video-wrap">
          <video
            ref={videoRef}
            className="aj-hero__video"
            src="/videos/ajay-walk.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setReady(true)}
            onEnded={() => setVideoEnded(true)}
          />
          <div className="aj-hero__video-vignette" />
          <div className="aj-hero__floor-glow" />
        </div>
      </motion.div>

      <header className="aj-hero__nav">
        <a className="aj-brand" href="#" aria-label="Ajay home">
          <span className="aj-brand__dot" />
          <span>AJAY</span><em>DEV</em>
        </a>

        <nav className="aj-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onMouseEnter={() => setIsPointer(true)}
              onMouseLeave={() => setIsPointer(false)}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <a
          className="aj-hire"
          href="mailto:yourgrowth.edits@gmail.com?subject=Project%20Inquiry%20for%20Ajay"
          onMouseEnter={() => setIsPointer(true)}
          onMouseLeave={() => setIsPointer(false)}
        >
          <span>HIRE ME</span><span className="aj-hire__arrow">↗</span>
        </a>
      </header>

      <div className="aj-hero__content">
        <div className="aj-hero__eyebrow">
          <span>01</span><i /> <span>INDEPENDENT WEB DEVELOPER</span>
        </div>

        <motion.div
          className="aj-hero__copy"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 34 }}
          transition={{ duration: 1.05, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="aj-kicker">SHOPIFY / E-COMMERCE / WEB EXPERIENCES</p>
          <h1>
            <span>AJAY</span>
            <span className="aj-serif">BUILDS</span>
            <span>STORES<span className="aj-period">.</span></span>
          </h1>
          <p className="aj-lede">
            Premium Shopify stores and digital experiences for brands that want to look
            unmistakably different — designed with taste, built with precision.
          </p>

          <div className="aj-actions">
            <a className="aj-button aj-button--solid" href="#work" onClick={scrollToWork}>
              <span>VIEW MY WORK</span><b>↘</b>
            </a>
            <a className="aj-button aj-button--ghost" href="mailto:yourgrowth.edits@gmail.com?subject=Let's%20work%20together">
              <span>START A PROJECT</span><b>↗</b>
            </a>
          </div>
        </motion.div>
      </div>

      <div className="aj-hero__side-note">
        <span>SCROLL TO EXPLORE</span>
        <span className="aj-hero__side-arrow">↓</span>
      </div>

      <div className="aj-hero__bottom">
        <div className="aj-proof">
          <span className="aj-proof__value">01+</span><span>YEAR<br />BUILDING</span>
        </div>
        <div className="aj-proof">
          <span className="aj-proof__value">05</span><span>CLIENTS<br />WORKED WITH</span>
        </div>
        <div className="aj-proof">
          <span className="aj-proof__value">120+</span><span>COUNTRIES<br />REACHED</span>
        </div>
        <div className="aj-availability"><span /> AVAILABLE FOR SELECT PROJECTS</div>
      </div>

      <div className={`aj-hero__model-state ${videoEnded ? 'is-visible' : ''}`} aria-hidden="true">
        <span>AJAY</span><i /><span>THE DEVELOPER</span>
      </div>

      <motion.div
        className={`aj-cursor ${isPointer ? 'is-active' : ''}`}
        style={{ x: mx, y: my }}
        aria-hidden="true"
      />
    </section>
  );
};
