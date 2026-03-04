export const metadata = {
  title: 'Contact | Lifestyle + AI',
  description: 'Contact Lifestyle + AI Labs to discuss complex product and AI challenges.',
};

export default function ContactPage() {
  return (
    <section className="page reveal">
      <p className="eyebrow">Contact Us</p>
      <h1>Bring us the problem worth solving.</h1>
      <p>Share your challenge, context, and goals. We&apos;ll reply with a practical next-step plan.</p>

      <form className="contact-form" action="#" method="post" id="brief">
        <label>
          Name
          <input type="text" name="name" placeholder="Your name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="you@company.com" required />
        </label>
        <label>
          Project Brief
          <textarea name="message" rows="6" placeholder="Describe your project goals" required />
        </label>
        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>
      <p className="contact-alt">
        or email us at <a href="mailto:lpluslabs@gmail.com">lpluslabs@gmail.com</a> or call <a href="tel:+917204094741">+91 72040 94741</a>
      </p>
    </section>
  );
}
