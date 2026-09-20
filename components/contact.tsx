import type { Personal } from "@/content/site";

type ContactProps = {
  personal: Personal;
};

export function Contact({ personal }: ContactProps) {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div>
        <p className="eyebrow">contact</p>
        <h2 id="contact-title">Send a message or check the code.</h2>
      </div>
      <div className="contact-links">
        <a href={`mailto:${personal.email}`}>{personal.email}</a>
        <a href={personal.github} target="_blank" rel="noreferrer">
          github.com/JollyJolli
        </a>
      </div>
    </section>
  );
}
