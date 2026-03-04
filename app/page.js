import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <section className="hero reveal">
        <div className="hero-copy-block">
          <p className="eyebrow">Lifestyle + AI Labs</p>
          <h1>
            Hey,
            {' '}
            <span className="hero-we">
              we
              <span className="hero-we-images" aria-hidden="true">
                <Image
                  src="/team-1.jpeg"
                  alt=""
                  width={46}
                  height={47}
                  className="hero-we-image"
                  priority
                />
                <Image
                  src="/team-2.jpeg"
                  alt=""
                  width={46}
                  height={47}
                  className="hero-we-image"
                  priority
                />
              </span>
            </span>
            {' '}
            build intelligent products that remove friction from everyday work.
          </h1>
          <p className="hero-copy">
            We partner with teams solving complex problems and ship thoughtful, human-centered technology from idea to production.
          </p>
          <div className="hero-cta">
            <Link href="/projects" className="btn btn-primary">See Projects</Link>
            <Link href="/contact" className="btn btn-ghost">Start a Project</Link>
          </div>
        </div>
      </section>

      <section className="preview-grid reveal">
        <article className="card">
          <h2>About Us</h2>
          <p>An innovation lab focused on practical AI and product engineering for real-world challenges.</p>
          <Link href="/about">Learn more</Link>
        </article>
        <article className="card">
          <h2>Project Highlights</h2>
          <p>Marketplace infrastructure, AI-powered virtual try-on, and hospitality operations software.</p>
          <Link href="/projects">View projects</Link>
        </article>
        <article className="card">
          <h2>Get in Touch</h2>
          <p>Bring us the hard problem. We&apos;ll help define and build the right solution.</p>
          <Link href="/contact">Contact us</Link>
        </article>
      </section>
    </>
  );
}
