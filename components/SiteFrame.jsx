'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Aurora from './ui/Aurora';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteFrame({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 520);
    return () => window.clearTimeout(timer);
  }, []);

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

    const move = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      window.requestAnimationFrame(loop);
    };

    const setInteractive = (active) => {
      ring.classList.toggle('active', active);
      dot.classList.toggle('active', active);
    };

    const hoverTargets = Array.from(document.querySelectorAll('a, button, input, textarea, .card, .project-card'));
    const onEnter = () => setInteractive(true);
    const onLeave = () => setInteractive(false);
    hoverTargets.forEach((node) => {
      node.addEventListener('mouseenter', onEnter);
      node.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', move);
    window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', move);
      hoverTargets.forEach((node) => {
        node.removeEventListener('mouseenter', onEnter);
        node.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [pathname]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  return (
    <>
      <div className={`page-loader ${loading ? '' : 'hidden'}`} aria-hidden={!loading}>
        <div className="loader-brand">
          <Image
            src="/lifestyle-logo.svg"
            alt="Lifestyle + AI"
            width={320}
            height={86}
            className="loader-logo"
            priority
          />
        </div>
      </div>

      <div className="aurora-background" aria-hidden="true">
        <div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
          <Aurora
            colorStops={['#5227FF', '#7cff67', '#5227FF']}
            amplitude={1}
            blend={0.5}
          />
        </div>
      </div>

      <div className={`site-shell ${loading ? 'site-shell-loading' : ''}`}>
        <header className="site-header">
          <Link href="/" className="logo" aria-label="Lifestyle + AI home">
            <Image
              src="/lifestyle-logo.svg"
              alt="Lifestyle + AI"
              width={420}
              height={114}
              className="logo-image"
              priority
            />
          </Link>

          <button
            type="button"
            className={`menu-toggle ${mobileNavOpen ? 'open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className="site-nav" data-nav>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>
                {item.label}
              </Link>
            ))}
          </nav>

          <nav id="mobile-nav" className={`mobile-nav ${mobileNavOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <main>{children}</main>
      </div>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Lifestyle + AI</p>
      </footer>

      <div className="cursor-ring" data-cursor-ring />
      <div className="cursor-dot" data-cursor-dot />
    </>
  );
}
