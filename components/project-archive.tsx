import type { Project } from "@/content/site";

type ProjectArchiveProps = {
  projects: Project[];
};

const categoryOrder = ["Data", "Tool", "Game", "Visual", "Contribution"] as const;

export function ProjectArchive({ projects }: ProjectArchiveProps) {
  const grouped = categoryOrder
    .map((category) => ({
      category,
      projects: projects.filter((project) => project.category === category),
    }))
    .filter((group) => group.projects.length > 0);

  return (
    <section className="index" id="index" aria-labelledby="index-title">
      <div className="section-head split">
        <div>
          <p className="eyebrow">project index</p>
          <h2 id="index-title">All public links stay here.</h2>
        </div>
        <p>
          Most of these are small web projects. Some are games, some are tools,
          and some are API pages. I keep them as a record of what I build.
        </p>
      </div>

      <div className="index-groups">
        {grouped.map((group) => (
          <div className="index-group" key={group.category}>
            <h3>/{group.category.toLowerCase()}</h3>
            <div className="index-list">
              {group.projects.map((project, index) => (
                <a className="index-row" href={project.href} key={project.slug} target="_blank" rel="noreferrer">
                  <span className="row-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="row-title">{project.title}</span>
                  <span className="row-desc">{project.description}</span>
                  <span className="row-type">{project.type}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
