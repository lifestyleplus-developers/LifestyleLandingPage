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

function easeInCubic(value) {
  return value ** 3;
}

export default function MemberSection() {
  const sectionRef = useRef(null);
  const shellRef = useRef(null);
  const cardRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const shell = shellRef.current;
    const card = cardRef.current;
    if (!section || !shell || !card) return;

    let rafId = 0;
    let rotateX = 0;
    let rotateY = 0;
    const canTilt = window.matchMedia('(pointer:fine)').matches;

    const getTargetProgress = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      return clamp(-rect.top / scrollable, 0, 1);
    };

    let targetProgress = getTargetProgress();
    let currentProgress = targetProgress;

    const render = () => {
      targetProgress = getTargetProgress();
      
      // Smooth interpolation (lerp)
      const ease = 0.055;
      currentProgress += (targetProgress - currentProgress) * ease;

      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      }

      // Animate backdrop text ("Become a member")
      if (backdropRef.current) {
        let backdropOpacity = 0;
        let backdropScale = 0.96;

        if (currentProgress <= 0.3) {
          const ratio = clamp(currentProgress / 0.3, 0, 1);
          const eased = easeOutCubic(ratio);
          backdropOpacity = eased;
          backdropScale = mix(0.96, 1, eased);
        } else {
          backdropOpacity = 1;
          backdropScale = 1;
        }

        backdropRef.current.style.opacity = String(backdropOpacity);
        backdropRef.current.style.transform = `scale(${backdropScale})`;
      }

      // Animate card container
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const isCompact = window.matchMedia('(max-width: 760px)').matches;
      const startOffset = isCompact ? viewportHeight * 0.32 : viewportHeight * 0.58;

      let translateY = startOffset;
      let scale = 0.95;
      let opacity = 0;

      // Active segment for card is progress [0.3, 1.0]
      if (currentProgress >= 0.3) {
        const ratio = clamp((currentProgress - 0.3) / 0.7, 0, 1);
        const eased = easeOutCubic(ratio);
        translateY = mix(startOffset, 0, eased);
        scale = mix(0.95, 1, eased);
        opacity = eased;
      } else {
        translateY = startOffset;
        scale = 0.95;
        opacity = 0;
      }

      shell.style.transform = `translate3d(-50%, ${translateY}px, 0) scale(${scale})`;
      shell.style.opacity = String(opacity);
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;

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
          <h2 ref={backdropRef}>Become a member</h2>
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
