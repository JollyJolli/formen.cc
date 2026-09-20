import Image from "next/image";
import type { Project } from "@/content/site";

const selected = [
  {
    slug: "sorting-algorithm-visualizer",
    image: "sorting",
    label: "01 / Sorting",
    note: "Compare the steps, not just the result.",
    alt: "SortViz with array bars, sorting controls, and algorithm information",
  },
  {
    slug: "maze-solver-visualizer",
    image: "maze",
    label: "02 / Pathfinding",
    note: "A different way to see the same problem.",
    alt: "MazeViz with a generated maze and pathfinding controls",
  },
  {
    slug: "invest-simulator",
    image: "invest",
    label: "03 / Browser game",
    note: "A small game about growing a number.",
    alt: "Investment Simulator showing the balance, upgrades, and virtual coin market",
  },
];

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="section-head">
        <p className="eyebrow">01 / Selected work</p>
        <h2 id="work-title">A closer look.</h2>
      </div>
      <div className="selected-work">
        {selected.map((item) => {
          const project = projects.find(
            (project) => project.slug === item.slug,
          );
          if (!project) return null;
          return (
            <article
              className={`project project-${item.image}`}
              key={item.slug}
            >
              <div className="project-info">
                <p className="project-number">{item.label}</p>
                <h3>
                  <a href={project.href} target="_blank" rel="noreferrer">
                    {project.title}
                  </a>
                </h3>
                <p className="project-note">{item.note}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-details">
                  <span>{project.category}</span>
                  <span>
                    {project.status === "Contribution"
                      ? "Contributor"
                      : "Personal project"}
                  </span>
                </div>
                <a
                  className="text-link"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open project <span aria-hidden="true">↗</span>
                </a>
              </div>
              <a
                className="project-preview"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title}`}
              >
                <Image
                  src={`/projects/${item.image}.webp`}
                  alt={item.alt}
                  loading={item.image === "sorting" ? "eager" : "lazy"}
                  width={1440}
                  height={1000}
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 65vw, 800px"
                />
                <span className="preview-caption" aria-hidden="true">
                  {new URL(project.href).hostname}
                  <span>Visit ↗</span>
                </span>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
