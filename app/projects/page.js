export const metadata = {
  title: 'Projects | Lifestyle + AI',
  description: 'Explore selected products and platforms built by Lifestyle + AI Labs.',
};

export default function ProjectsPage() {
  return (
    <section className="page reveal">
      <p className="eyebrow">Projects</p>
      <h1>Products built around high-friction, real-world workflows.</h1>
      <p>These projects represent how we combine product thinking, software engineering, and AI.</p>

      <section className="projects-grid">
        <article className="project-card" id="saas">
          <p className="tag">Innovation Infrastructure</p>
          <h2>Research Asset Marketplace</h2>
          <p>A marketplace platform designed to unlock and activate underused research and innovation infrastructure.</p>
        </article>
        <article className="project-card" id="ecommerce">
          <p className="tag">Computer Vision</p>
          <h2>Virtual Try-On for Indian Apparel</h2>
          <p>An AI-assisted try-on experience tailored to Indian fashion use cases and culturally specific fit expectations.</p>
        </article>
        <article className="project-card" id="internal">
          <p className="tag">Hospitality Operations</p>
          <h2>Property Management Platform</h2>
          <p>A software platform that streamlines hospitality operations by reducing manual coordination and service friction.</p>
        </article>
      </section>
    </section>
  );
}
