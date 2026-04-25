import Image from 'next/image';
import CapabilityScroller from '../components/CapabilityScroller';
import HeroCtaBand from '../components/HeroCtaBand';
import MemberSection from '../components/MemberSection';
import ProjectScroller from '../components/ProjectScroller';

export default function HomePage() {
  return (
    <main className="story">
      <section id="about" className="story-hero reveal">
        <div className="story-media" aria-hidden="true">
          <Image
            src="/hero.png"
            alt="Team collaborating around a whiteboard"
            fill
            sizes="100vw"
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="eyebrow">It starts with an idea</p>
          <h1>
            Turn your{" "}
            <span className="word-flip" aria-label="ideas">
              <span className="word-flip-track" aria-hidden="true">
                <span>ideas</span>
                <span>concept</span>
                <span>model</span>
                <span>thoughts</span>
                <span>ideas</span>
              </span>
            </span>
            <span className="hero-line-break">into software</span>
          </h1>
          <p className="hero-copy">
            We help founders go from vision to reality with a focused senior team and a clear path to launch.
          </p>
          <HeroCtaBand />
        </div>
      </section>

      <ProjectScroller />

      <CapabilityScroller />

      <MemberSection />

      <footer id="contact" className="story-footer-main">
        <span className="footer-line" aria-hidden="true"></span>
        <div className="footer-contact-block">
          <h2>It starts with a conversation</h2>
          <p>
            Every product we’ve built started with a simple message.
            </p><p>If you have an idea, a problem, or even just curiosity—reach out.
            We’ll figure it out together.
          </p>
          <div className="footer-contact-list">
            <a href="tel:+917204094741">+91-7204094741</a>
            <a href="mailto:lpluslabs@gmail.com">lpluslabs@gmail.com</a>
            <span>Bengaluru, India</span>
          </div>
        </div>
        <span className="footer-divider" aria-hidden="true"></span>
        <p>© {new Date().getFullYear()} Lifestyle + AI</p>
      </footer>
    </main>
  );
}
