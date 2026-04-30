'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const PROJECTS = [
  {
    tag: 'MARKETPLACE',
    title: 'Rent-O-Infra',
    description:
      'Discover the infrastructure you need, access it on demand, and use it exactly when it matters.',
    image: '/mac rento.png',
    imageAlt: 'Rent-O-Infra shown on a laptop screen',
    frameClass: 'project-scroll-frame-laptop',
  },
  {
    tag: 'AI Tool',
    title: 'Zamzam Cake Studio',
    description:
      'Describe your cake, see it come to life with AI, and order it exactly the way you imagined.',
    image: '/zamzam iphone.png',
    imageAlt: 'Zamzam Cake Studio shown on a phone screen',
    frameClass: 'project-scroll-frame-phone',
  },
  {
    tag: 'MVP',
    title: 'Virtual Try On',
    description:
      'See outfits on yourself instantly, experiment freely, and choose what works with confidence.',
    image: '/vton macos.png',
    imageAlt: 'Virtual Try On shown on a laptop screen',
    frameClass: 'project-scroll-frame-laptop',
  },
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

export default function ProjectScroller() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const progress = clamp(-rect.top / scrollable, 0, 1);
      const segmentSize = 1 / PROJECTS.length;
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const isCompact = window.matchMedia('(max-width: 760px)').matches;
      const startOffset = isCompact ? viewportHeight * 0.22 : viewportHeight * 0.34;
      const exitOffset = isCompact ? viewportHeight * 0.08 : viewportHeight * 0.12;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const stepStart = index * segmentSize;
        const stepEnd = stepStart + segmentSize;
        const local = clamp((progress - stepStart) / segmentSize, 0, 1);
        const intro = clamp(local / 0.55, 0, 1);
        const exit = clamp((local - 0.88) / 0.12, 0, 1);
        const introEased = easeOutCubic(intro);
        const exitEased = easeOutCubic(exit);

        let translateY = startOffset;
        let scale = 0.95;
        let opacity = 0;

        if (progress >= stepStart && progress <= stepEnd) {
          translateY = mix(startOffset, 0, introEased);
          scale = mix(0.95, 1, introEased);
          opacity = 1;
        }

        if (exit > 0 && progress <= stepEnd) {
          translateY = mix(0, -exitOffset, exitEased);
          scale = mix(1, 0.99, exitEased);
          opacity = 1;
        }

        if (progress > stepEnd) {
          translateY = -startOffset;
          scale = 1;
          opacity = 0;
        }

        card.style.transform = `translate3d(-50%, ${translateY}px, 0) scale(${scale})`;
        card.style.opacity = String(opacity);
        card.style.zIndex = String(index + 2);
      });

      rafId = 0;
    };

    const requestUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section id="projects" className="project-scroll-section" ref={sectionRef}>
      <div className="project-scroll-sticky">
        <div className="project-scroll-backdrop" aria-hidden="true">
          <h2>We&apos;ve built things that started just like your idea</h2>
        </div>

        <div className="project-scroll-stage">
          {PROJECTS.map((project, index) => (
            <article
              key={project.title}
              className="project-scroll-card"
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
            >
              <div className={`project-scroll-frame ${project.frameClass}`}>
                <div className="project-scroll-media-inner">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 960px) 92vw, 78vw"
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                  />
                </div>
              </div>

              <div className="project-scroll-copy-box">
                <p className="project-scroll-tag">{project.tag}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
