"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "work", label: "work" },
  { href: "index", label: "index" },
  { href: "about", label: "about" },
  { href: "contact", label: "contact" },
];

export function Header() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const update = () => {
      const sections = navItems.filter(({ href }) => {
        const element = document.getElementById(href);
        return element && element.getBoundingClientRect().top <= 180;
      });
      setActive(sections.at(-1)?.href ?? "");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Formen home">
        <span>~/</span>formen.cc
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map(({ href, label }) => (
          <a
            key={href}
            href={`#${href}`}
            aria-current={active === href ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
