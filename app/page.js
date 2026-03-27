import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="story">
      <section className="story-hero reveal">
        <p className="eyebrow">It starts with an idea </p>
        <h1>Turn your ideas into software</h1>
        <p className="hero-copy">
          We help founders go from idea → real product with a focused senior team and a clear path to launch.
        </p>
        <div className="hero-cta">
          <a href="mailto:mohammedmustafaja@gmail.com" className="btn btn-primary">Start a Project</a>
        </div>
        <div className="story-media">
          <Image
            src="/hero.png"
            alt="Team collaborating around a whiteboard"
            fill
            sizes="100vw"
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <p className="transition-line">Every idea starts somewhere. The story begins with one clear decision.</p>
      </section>

      <section className="story-clients reveal">
        <div className="story-heading">
          <h2 className="trusted-label">Trusted by</h2>
        </div>
        <div className="logo-rail" aria-label="Client logos">
          <div className="logo-item">
            <a href="https://www.zamzamrestaurants.com/" target="_blank" rel="noreferrer">
              <Image src="/dff92f9e-1-removebg-preview.png" alt="Zamzam" width={30} height={30} />
            </a>
          </div>
          <div className="logo-item">
            <a href="https://rentoinfra.com/" target="_blank" rel="noreferrer">
              <Image src="/Screenshot_2026-03-26_at_6.26.03_PM-removebg-preview.png" alt="Rent-O-Infra" width={120} height={120} />
            </a>
          </div>
        </div>
        <span className="footer-line" aria-hidden="true"></span>
      </section>

      <section className="story-projects reveal">
        <div className="story-heading">
          <h2>We’ve built things that started just like your idea</h2>
          <p>From first sketches to launch-ready products, we translate vision into real-world traction.</p>
        </div>

        <article className="project-story">
          <div className="project-media project-media--plain">
            <div className="project-media-inner">
              <Image
                src="/mac rento.png"
                alt="Product screen"
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
          </div>
          <div className="project-copy">
            <p className="project-tag">MARKETPLACE</p>
            <h3>Rent-O-Infra</h3>
            <p>Discover the infrastructure you need, access it on demand, and use it exactly when it matters—no barriers, just building what you set out to create.</p>
          </div>
        </article>

        <article className="project-story reverse">
          <div className="project-media project-media--plain">
            <div className="project-media-inner">
              <Image
                src="/zamzam iphone.png"
                alt="Product screen"
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
          </div>
          <div className="project-copy">
            <p className="project-tag">AI Tool</p>
            <h3>Zamzam Cake Studio</h3>
            <p>Describe your cake, see it come to life with AI, and order it exactly the way you imagined—no surprises, just perfect cakes.</p>
          </div>
        </article>

        <article className="project-story">
          <div className="project-media project-media--plain">
            <div className="project-media-inner">
              <Image
                src="/vton macos.png"
                alt="Product screen"
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </div>
          </div>
          <div className="project-copy">
            <p className="project-tag">MVP</p>
            <h3>Virtual Try On</h3>
            <p>See outfits on yourself instantly, experiment freely, and choose what works—no trials, no returns, just confident decisions.</p>
          </div>
        </article>
      </section>

      <section className="capability-carousel reveal" aria-label="Capabilities">
      <span className="footer-line" aria-hidden="true"></span>
      <h1>What we build</h1>
      <p style={{ textAlign: "center", marginTop: "-1.0rem", color:'grey'}}>
        Whatever your idea needs—we design it, build it, and bring it to life.
      </p>
        <div className="carousel-track">
          <div className="carousel-row">
            <span className="carousel-pill">AI Products</span>
            <span className="carousel-pill">Backend Systems</span>
            <span className="carousel-pill">Frontend</span>
            <span className="carousel-pill">Mobile Apps</span>
            <span className="carousel-pill">Landing Pages</span>
          </div>
          <div className="carousel-row" aria-hidden="true">
            <span className="carousel-pill">AI Products</span>
            <span className="carousel-pill">Backend Systems</span>
            <span className="carousel-pill">Frontend</span>
            <span className="carousel-pill">Mobile Apps</span>
            <span className="carousel-pill">Landing Pages</span>
          </div>
        </div>
      </section>

      <footer className="">
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
