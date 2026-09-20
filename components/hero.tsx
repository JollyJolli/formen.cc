import type { Personal } from "@/content/site";

type HeroProps = {
  personal: Personal;
  projectCount: number;
};

const bootLines = [
  "boot formen.cc",
  "load web projects",
  "mount germany",
  "ready",
];

export function Hero({ personal, projectCount }: HeroProps) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-shell" aria-label="Status">
        {bootLines.map((line, index) => (
          <span key={line}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {line}
          </span>
        ))}
      </div>

      <div className="hero-main">
        <p className="eyebrow">{personal.location} / {personal.education}</p>
        <h1 id="hero-title">Formen</h1>
        <p className="hero-statement">
          Computer Science student. I like web development and small tools that
          make technology easier to understand.
        </p>
      </div>

      <div className="hero-meta" aria-label="Profile summary">
        <span>focus: web development</span>
        <span>projects: {projectCount}</span>
        <span>stack: js / next.js / c / c++</span>
      </div>
    </section>
  );
}
