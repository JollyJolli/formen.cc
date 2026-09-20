import type { Personal } from "@/content/site";

export function Hero({
  personal,
  projectCount,
}: {
  personal: Personal;
  projectCount: number;
}) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-heading">
        <p className="eyebrow">Personal site / {personal.location}</p>
        <h1 id="hero-title">
          {personal.name}
          <span aria-hidden="true">.</span>
        </h1>
      </div>
      <div className="hero-bottom">
        <p className="hero-statement">
          Computer Science student.
          <br />I like building things for the web.
        </p>
        <div className="hero-meta">
          <span>JavaScript / Next.js / C / C++</span>
          <a href="#work">
            Explore my work <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="hero-foot">
        <span>Code. Learn. Try again.</span>
        <a href="#index">{projectCount} projects in the index</a>
      </div>
    </section>
  );
}
