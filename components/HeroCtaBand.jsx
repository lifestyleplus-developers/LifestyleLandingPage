'use client';

import { useRef } from 'react';

export default function HeroCtaBand() {
  const linkRef = useRef(null);

  const onClick = (event) => {
    event.preventDefault();

    const link = linkRef.current;
    if (!link) return;

    link.classList.remove('is-whooshing');
    // Restart animation cleanly on repeated clicks.
    void link.offsetWidth;
    link.classList.add('is-whooshing');

    window.setTimeout(() => {
      link.classList.remove('is-whooshing');
    }, 540);

    window.setTimeout(() => {
      window.location.href = 'mailto:mohammedmustafaja@gmail.com';
    }, 520);
  };

  return (
    <div className="hero-cta-band-wrap">
      <a
        ref={linkRef}
        href="mailto:mohammedmustafaja@gmail.com"
        className="hero-cta-band"
        onClick={onClick}
      >
        <span className="hero-cta-band-label">Start a Project</span>
      </a>
    </div>
  );
}
