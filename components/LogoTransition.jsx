'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function LogoTransition() {
  const sectionRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const logo = logoRef.current;
    if (!section || !logo) return;

    let rafId = 0;
    let pointerX = 0;
    let pointerY = 0;
    let scrollProgress = 0;

    const render = () => {
      const rotateY = pointerX * 10;
      const rotateX = pointerY * -10;
      const translateY = -68 * scrollProgress;
      const scale = 1 - 0.06 * scrollProgress;

      logo.style.transform = `
        translate3d(0, ${translateY}px, 0)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;

      rafId = 0;
    };

    const requestRender = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    const onMove = (event) => {
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      pointerX = clamp((event.clientX - centerX) / rect.width, -1, 1);
      pointerY = clamp((event.clientY - centerY) / rect.height, -1, 1);
      requestRender();
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const total = Math.max(rect.height - window.innerHeight, 1);
      scrollProgress = clamp(-rect.top / total, 0, 1);
      requestRender();
    };

    const onLeave = () => {
      pointerX = 0;
      pointerY = 0;
      requestRender();
    };

    onScroll();
    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section className="logo-transition-section" ref={sectionRef}>
      <div className="logo-transition-sticky">
        <div className="logo-transition-stage">
          <div className="logo-transition-glow" aria-hidden="true" />
          <div className="logo-transition-card" ref={logoRef}>
            <div className="logo-transition-sheen" aria-hidden="true" />
            <Image
              src="/Lifestyle logo light version (Email Header).png"
              alt="Lifestyle + AI"
              width={760}
              height={220}
              className="logo-transition-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
