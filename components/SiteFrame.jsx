'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SiteFrame({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 520);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-loading', loading);
  }, [loading]);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer:fine)').matches;
    if (!finePointer) return;

    const ring = document.querySelector('[data-cursor-ring]');
    const dot = document.querySelector('[data-cursor-dot]');
    if (!ring || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = 0;

    const move = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      rafId = window.requestAnimationFrame(loop);
    };

    const setInteractive = (active) => {
      ring.classList.toggle('active', active);
      dot.classList.toggle('active', active);
    };

    const hoverTargets = Array.from(
      document.querySelectorAll('a, button, input, textarea, .project-story, .project-media, .story-media, .logo-rail')
    );
    const onEnter = () => setInteractive(true);
    const onLeave = () => setInteractive(false);
    hoverTargets.forEach((node) => {
      node.addEventListener('mouseenter', onEnter);
      node.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', move, { passive: true });
    rafId = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', move);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      hoverTargets.forEach((node) => {
        node.removeEventListener('mouseenter', onEnter);
        node.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [pathname]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(document.querySelectorAll('.reveal'));
    if (prefersReduced) {
      targets.forEach((node) => node.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.skill-card'));
    if (!cards.length) return;

    let rafId = 0;
    let mouseX = 0;
    let mouseY = 0;

    const update = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = Math.max(-1, Math.min(1, (mouseX - cx) / rect.width));
        const dy = Math.max(-1, Math.min(1, (mouseY - cy) / rect.height));
        card.style.setProperty('--px', dx.toFixed(3));
        card.style.setProperty('--py', dy.toFixed(3));
      });
      rafId = 0;
    };

    const onMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return (
    <>
      <div className={`page-loader ${loading ? '' : 'hidden'}`} aria-hidden={!loading}>
        <div className="loader-brand">
          <Image
            src="/lifestyle logo.svg"
            alt="Lifestyle + AI"
            width={320}
            height={86}
            className="loader-logo"
            priority
          />
        </div>
      </div>

      <div className={`site-shell ${loading ? 'site-shell-loading' : ''}`}>
        {children}
      </div>

      <div className="cursor-ring" data-cursor-ring />
      <div className="cursor-dot" data-cursor-dot />
    </>
  );
}
