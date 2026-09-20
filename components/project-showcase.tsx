import type { Project } from "@/content/site";

const featuredSlugs = [
  "sorting-algorithm-visualizer",
  "maze-solver-visualizer",
  "invest-simulator",
  "pass-requirement-calculator",
];

type ProjectShowcaseProps = {
  projects: Project[];
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const featured = featuredSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="section-head">
        <p className="eyebrow">selected processes</p>
        <h2 id="work-title">Projects where the logic is the main part.</h2>
      </div>

      <div className="process-list">
        {featured.map((project, index) => (
          <article className="process" key={project.slug}>
            <a href={project.href} target="_blank" rel="noreferrer" className="process-link">
              <span className="process-id">pid:{String(index + 41)}</span>
              <span className="process-main">
                <span className="process-title">{project.title}</span>
                <span className="process-desc">{project.description}</span>
              </span>
              <span className="process-meta">
                <span>{project.category}</span>
                <span>{project.type}</span>
                <span>{project.status}</span>
              </span>
            </a>
            <ProjectTrace slug={project.slug} />
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectTrace({ slug }: { slug: string }) {
  const traces: Record<string, string[]> = {
    "sorting-algorithm-visualizer": ["swap", "compare", "pivot", "done"],
    "maze-solver-visualizer": ["start", "visit", "backtrack", "exit"],
    "invest-simulator": ["click", "buy", "wait", "grow"],
    "pass-requirement-calculator": ["grade", "weight", "target", "result"],
  };

  return (
    <div className="trace" aria-hidden="true">
      {(traces[slug] ?? ["open", "read", "run", "close"]).map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
