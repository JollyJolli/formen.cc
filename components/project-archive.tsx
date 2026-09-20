"use client";

import { useId, useState, useSyncExternalStore } from "react";
import type { Project } from "@/content/site";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const categoryOrder = [
  "Data",
  "Tool",
  "Game",
  "Visual",
  "Contribution",
] as const;

export function ProjectArchive({ projects }: { projects: Project[] }) {
  const interactive = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const searchId = useId();
  const categoryId = useId();
  const matching = projects.filter(
    (project) =>
      (category === "All" || category === project.category) &&
      `${project.title} ${project.description} ${project.type}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const grouped = categoryOrder
    .map((category) => ({
      category,
      projects: matching.filter((project) => project.category === category),
    }))
    .filter((group) => group.projects.length);
  return (
    <section className="index" id="index" aria-labelledby="index-title">
      <div className="section-head">
        <p className="eyebrow">02 / Project index</p>
        <div>
          <h2 id="index-title">Small ideas, kept online.</h2>
          <p>
            Tools, games, and experiments. Some are my own; others are projects
            I contributed to.
          </p>
        </div>
      </div>
      <div className="index-controls">
        <div className="search-field">
          <label htmlFor={searchId}>Find a project</label>
          <input
            id={searchId}
            type="search"
            disabled={!interactive}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or topic"
            autoComplete="off"
          />
        </div>
        <div className="category-field">
          <label htmlFor={categoryId}>Category</label>
          <select
            disabled={!interactive}
            id={categoryId}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="All">All projects</option>
            {categoryOrder.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <p className="result-count" role="status" aria-live="polite">
          {String(matching.length).padStart(2, "0")} / {projects.length}
        </p>
      </div>
      <div className="index-groups">
        {grouped.map((group) => (
          <div className="index-group" key={group.category}>
            <h3>
              {group.category.toLowerCase()}
              <span>{String(group.projects.length).padStart(2, "0")}</span>
            </h3>
            <div className="index-list">
              {group.projects.map((project) => (
                <a
                  className="index-row"
                  href={project.href}
                  key={project.slug}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="row-title">{project.title}</span>
                  <span className="row-desc">{project.description}</span>
                  <span className="row-type">
                    {project.status === "Contribution"
                      ? "contribution"
                      : project.type}
                  </span>
                  <span className="row-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
        {matching.length === 0 && (
          <div className="empty-state">
            <p>No projects found.</p>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
