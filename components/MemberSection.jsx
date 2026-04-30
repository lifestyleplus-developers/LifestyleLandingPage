'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function mix(from, to, progress) {
  return from + (to - from) * progress;
}

function easeOutCubic(value) {
  return 1 - (1 - value) ** 3;
}

export default function MemberSection() {
  const sectionRef = useRef(null);
  const shellRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const shell = shellRef.current;
    const card = cardRef.current;
    if (!section || !shell || !card) return;

    let rafId = 0;
    let rotateX = 0;
    let rotateY = 0;
    const canTilt = window.matchMedia('(pointer:fine)').matches;

    const render = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const progress = clamp(-rect.top / scrollable, 0, 1);
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const isCompact = window.matchMedia('(max-width: 760px)').matches;
      const introStart = isCompact ? 0.22 : 0;
      const introSpan = isCompact ? 0.24 : 0.55;
      const exitStart = isCompact ? 0.56 : 0.88;
      const exitSpan = isCompact ? 0.18 : 0.12;
      const intro = clamp((progress - introStart) / introSpan, 0, 1);
      const exit = clamp((progress - exitStart) / exitSpan, 0, 1);
      const introEased = easeOutCubic(intro);
      const exitEased = easeOutCubic(exit);
      const startOffset = isCompact ? viewportHeight * 0.46 : viewportHeight * 0.3;
      const exitOffset = isCompact ? viewportHeight * 0.36 : viewportHeight * 0.11;

      let translateY = startOffset;
      let scale = 0.95;
      let opacity = 0;

      if (progress >= introStart) {
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
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
      rafId = 0;
    };

    const requestRender = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    const onMove = (event) => {
      const rect = card.getBoundingClientRect();
      const px = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const py = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      rotateY = (px - 0.5) * 20;
      rotateX = (0.5 - py) * 18;
      requestRender();
    };

    const reset = () => {
      rotateX = 0;
      rotateY = 0;
      requestRender();
    };

    render();
    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender);
    if (canTilt) {
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', reset);
    }

    return () => {
      window.removeEventListener('scroll', requestRender);
      window.removeEventListener('resize', requestRender);
      if (canTilt) {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', reset);
      }
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section className="member-section reveal" ref={sectionRef}>
      <div className="member-sticky">
        <div className="member-backdrop" aria-hidden="true">
          <h2>Become a member</h2>
        </div>

        <div className="member-stage">
          <article className="member-scroll-card" ref={shellRef}>
            <div className="member-card-shadow" aria-hidden="true" />
            <div className="member-card" ref={cardRef}>
              <div className="member-card-sheen" aria-hidden="true" />
              <Image
                src="/lifestyle Card.png"
                alt="Lifestyle membership card"
                width={760}
                height={480}
                className="member-card-image"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
