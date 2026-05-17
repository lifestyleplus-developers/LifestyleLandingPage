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

function easeInCubic(value) {
  return value ** 3;
}

export default function CapabilityScroller() {
  const sectionRef = useRef(null);
  const shellRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const shell = shellRef.current;
    if (!section || !shell) return;

    const getTargetProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      return clamp(-rect.top / scrollable, 0, 1);
    };

    let targetProgress = getTargetProgress();
    let currentProgress = targetProgress;
    let rafId = 0;

    const render = () => {
      targetProgress = getTargetProgress();
      
      // Smooth interpolation (lerp)
      const ease = 0.055;
      currentProgress += (targetProgress - currentProgress) * ease;

      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      }

      // Animate the backdrop text ("What we build" and description)
      if (backdropRef.current) {
        let backdropOpacity = 0;
        let backdropScale = 0.96;

        if (currentProgress <= 0.3) {
          const ratio = clamp(currentProgress / 0.3, 0, 1);
          const eased = easeOutCubic(ratio);
          backdropOpacity = eased;
          backdropScale = mix(0.96, 1, eased);
        } else if (currentProgress <= 0.7) {
          backdropOpacity = 1;
          backdropScale = 1;
        } else {
          // Fade out as the carousel goes over it and exits
          const ratio = clamp((currentProgress - 0.7) / 0.3, 0, 1);
          const eased = easeOutCubic(ratio);
          backdropOpacity = 1 - eased;
          backdropScale = mix(1, 0.98, eased);
        }

        backdropRef.current.style.opacity = String(backdropOpacity);
        backdropRef.current.style.transform = `scale(${backdropScale})`;
      }

      // Animate the carousel shell
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const isCompact = window.matchMedia('(max-width: 760px)').matches;
      const startOffset = isCompact ? viewportHeight * 0.28 : viewportHeight * 0.42;

      let translateY = startOffset;
      let scale = 0.95;
      let opacity = 0;

      // Active segment for carousel is progress [0.3, 1.0]
      if (currentProgress >= 0.3) {
        const local = clamp((currentProgress - 0.3) / 0.7, 0, 1);

        if (local <= 0.5) {
          const ratio = local / 0.5;
          const eased = easeOutCubic(ratio);
          translateY = mix(startOffset, 0, eased);
          scale = mix(0.95, 1, eased);
          opacity = eased;
        } else if (local <= 0.7) {
          translateY = 0;
          scale = 1;
          opacity = 1;
        } else {
          // Slide further UP over the text content offscreen
          const ratio = (local - 0.7) / 0.3;
          const eased = easeInCubic(ratio);
          translateY = mix(0, -startOffset * 1.4, eased);
          scale = mix(1, 0.95, eased);
          opacity = 1 - eased;
        }
      } else {
        translateY = startOffset;
        scale = 0.95;
        opacity = 0;
      }

      shell.style.transform = `translate3d(-50%, ${translateY}px, 0) scale(${scale})`;
      shell.style.opacity = String(opacity);

      if (currentProgress !== targetProgress) {
        rafId = window.requestAnimationFrame(render);
      } else {
        rafId = 0;
      }
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
          <div className="section-intro" ref={backdropRef}>
            <h2>What we build</h2>
            <p>Whatever your idea needs, we design it, build it, and bring it to life.</p>
          </div>
        </div>

        <div className="capability-scroll-stage">
          <article className="capability-scroll-shell" ref={shellRef}>
            <div className="carousel-track">
              <div className="carousel-row">
                {[...CAPABILITIES, ...CAPABILITIES, ...CAPABILITIES, ...CAPABILITIES].map((capability, idx) => (
                  <span key={`${capability}-${idx}`} className="carousel-pill">
                    {capability}
                  </span>
                ))}
              </div>
              <div className="carousel-row" aria-hidden="true">
                {[...CAPABILITIES, ...CAPABILITIES, ...CAPABILITIES, ...CAPABILITIES].map((capability, idx) => (
                  <span key={`${capability}-duplicate-${idx}`} className="carousel-pill">
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
