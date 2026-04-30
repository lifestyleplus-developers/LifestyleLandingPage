'use client';

import { useEffect, useRef } from 'react';

const CAPABILITIES = [
  'AI Products',
  'Backend Systems',
  'Frontend',
  'Mobile Apps',
  'Landing Pages',
  'MVP Launches',
  'Automation',
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function mix(from, to, progress) {
  return from + (to - from) * progress;
}

function easeOutCubic(value) {
  return 1 - (1 - value) ** 3;
}

export default function CapabilityScroller() {
  const sectionRef = useRef(null);
  const shellRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const shell = shellRef.current;
    if (!section || !shell) return;

    let rafId = 0;

    const render = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const progress = clamp(-rect.top / scrollable, 0, 1);
      const intro = clamp(progress / 0.55, 0, 1);
      const exit = clamp((progress - 0.88) / 0.12, 0, 1);
      const introEased = easeOutCubic(intro);
      const exitEased = easeOutCubic(exit);
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const isCompact = window.matchMedia('(max-width: 760px)').matches;
      const startOffset = isCompact ? viewportHeight * 0.18 : viewportHeight * 0.28;
      const exitOffset = isCompact ? viewportHeight * 0.06 : viewportHeight * 0.1;

      let translateY = startOffset;
      let scale = 0.95;
      let opacity = 0;

      if (progress <= 1) {
        translateY = mix(startOffset, 0, introEased);
        scale = mix(0.95, 1, introEased);
        opacity = 1;
      }

      if (exit > 0) {
        translateY = mix(0, -exitOffset, exitEased);
        scale = mix(1, 0.99, exitEased);
        opacity = 1;
      }

      shell.style.transform = `translate3d(-50%, ${translateY}px, 0) scale(${scale})`;
      shell.style.opacity = String(opacity);
      rafId = 0;
    };

    const requestRender = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    render();
    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender);

    return () => {
      window.removeEventListener('scroll', requestRender);
      window.removeEventListener('resize', requestRender);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section className="capability-scroll-section reveal" aria-label="Capabilities" ref={sectionRef}>
      <div className="capability-scroll-sticky">
        <div className="capability-scroll-backdrop">
          <span className="footer-line" aria-hidden="true"></span>
          <div className="section-intro">
            <h2>What we build</h2>
            <p>Whatever your idea needs, we design it, build it, and bring it to life.</p>
          </div>
        </div>

        <div className="capability-scroll-stage">
          <article className="capability-scroll-shell" ref={shellRef}>
            <div className="carousel-track">
              <div className="carousel-row">
                {CAPABILITIES.map((capability) => (
                  <span key={capability} className="carousel-pill">
                    {capability}
                  </span>
                ))}
              </div>
              <div className="carousel-row" aria-hidden="true">
                {CAPABILITIES.map((capability) => (
                  <span key={`${capability}-duplicate`} className="carousel-pill">
                    {capability}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
