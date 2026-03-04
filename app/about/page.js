export const metadata = {
  title: 'About | Lifestyle + AI',
  description: 'Learn how Lifestyle + AI Labs approaches product engineering and AI innovation.',
};

export default function AboutPage() {
  return (
    <section className="page reveal">
      <p className="eyebrow">About Us</p>
      <h1>We solve real-world problems with human-centered technology.</h1>
      <p>
        Lifestyle + AI Labs is an innovation studio that identifies inefficient processes and redesigns them with practical software and AI.
        Our goal is to make advanced technology feel simple, intuitive, and useful in daily operations.
      </p>

      <section className="stacked" id="workflow">
        <article className="card">
          <h2>Our Vision</h2>
          <p>Technology should be so intelligent and seamless that users focus on outcomes, not the system behind them.</p>
        </article>
        <article className="card">
          <h2>Our Mission</h2>
          <p>Fix what is broken using AI and software that serves people first, with clarity and trust at every step.</p>
        </article>
        <article className="card">
          <h2>How We Work</h2>
          <p>We listen first, build with craft, and stay involved long-term as a product and technology partner.</p>
        </article>
      </section>
    </section>
  );
}
