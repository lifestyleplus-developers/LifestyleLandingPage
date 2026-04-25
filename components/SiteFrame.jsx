'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

const GREETINGS = [
  'Hello',
  'السلام علیکم',
  'नमस्ते',
  'কেমন আছেন',
  'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ',
  'નમસ્તે',
  'নমস্কার',
  'নমস্কাৰ',
  'ꯈꯨꯔꯨꯝꯖꯔꯤ',
  'ନମସ୍କାର',
  'வணக்கம்',
  'నమస్కారం',
  'ನಮಸ್ಕಾರ',
  'നമസ്കാരം',
];

const GREETING_STEP_MS = 150;
const LOGO_HOLD_MS = 420;
const EXIT_MS = 520;

export default function SiteFrame({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [loaderPhase, setLoaderPhase] = useState('greetings');
  const [greetingIndex, setGreetingIndex] = useState(0);
  const loaderPathRef = useRef(null);
  const finishRef = useRef(() => {});

  const loaderCurve = useMemo(() => {
    if (typeof window === 'undefined') {
      return 'M0 0 L0 0 L0 0 Q0 0 0 0 L0 0';
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    return `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`;
  }, [loading]);

  useEffect(() => {
    finishRef.current = () => {
      setLoading(false);
      window.setTimeout(() => {
        document.body.classList.remove('is-loading');
      }, EXIT_MS);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-loading', loading);
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      return;
    }

    document.body.classList.add('is-loading');
    let stepTimer;
    let logoTimer;
    let exitTimer;

    stepTimer = window.setInterval(() => {
      setGreetingIndex((current) => {
        if (current >= GREETINGS.length - 1) {
          window.clearInterval(stepTimer);
          logoTimer = window.setTimeout(() => {
            setLoaderPhase('logo');
            exitTimer = window.setTimeout(() => {
              setLoaderPhase('exit');
              finishRef.current();
            }, LOGO_HOLD_MS);
          }, GREETING_STEP_MS);
          return current;
        }

        return current + 1;
      });
    }, GREETING_STEP_MS);

    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(logoTimer);
      window.clearTimeout(exitTimer);
    };
  }, [loading]);

  useEffect(() => {
    if (!loading || loaderPhase !== 'exit') {
      return;
    }

    const path = loaderPathRef.current;
    if (!path) {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const baseCurve = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height} L0 0`;
    const start = performance.now();
    let rafId = 0;

    const animate = (now) => {
      const progress = Math.min((now - start) / 380, 1);
      const eased = 1 - (1 - progress) ** 3;
      const controlY = height + 300 * (1 - eased);
      path.setAttribute('d', `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${controlY} 0 ${height} L0 0`);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(animate);
      } else {
        path.setAttribute('d', baseCurve);
      }
    };

    const kickoff = window.setTimeout(() => {
      rafId = window.requestAnimationFrame(animate);
    }, 80);

    return () => {
      window.clearTimeout(kickoff);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [loaderPhase, loading]);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const syncCurve = () => {
      const path = loaderPathRef.current;
      if (!path) {
        return;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;
      path.setAttribute('d', `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height} L0 0`);
    };

    syncCurve();
    window.addEventListener('resize', syncCurve, { passive: true });
    return () => window.removeEventListener('resize', syncCurve);
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
      {loading ? (
        <div className={`page-loader page-loader-${loaderPhase}`} aria-hidden={!loading}>
          <div className="loader-copy-wrap">
            {loaderPhase === 'logo' || loaderPhase === 'exit' ? (
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
            ) : (
              <p className="loader-copy">{GREETINGS[greetingIndex]}</p>
            )}
          </div>
          <svg className="loader-curve" aria-hidden="true">
            <path ref={loaderPathRef} d={loaderCurve} />
          </svg>
        </div>
      ) : null}

      <header className="site-header-bar">
        <nav className="site-header-nav" aria-label="Primary">
          <div className="site-header-nav-left">
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
          </div>
          <a href="#about" className="site-header-brand" aria-label="Lifestyle + AI">
            <Image
              src="/Lifestyle logo light version (Email Header).png"
              alt="Lifestyle + AI"
              width={200}
              height={52}
              className="site-header-brand-image"
            />
          </a>
          <div className="site-header-nav-right">
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <div className={`site-shell ${loading ? 'site-shell-loading' : ''}`}>
        {children}
      </div>

      <div className="cursor-ring" data-cursor-ring />
      <div className="cursor-dot" data-cursor-dot />
    </>
  );
}
