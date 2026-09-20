const navItems = [
  { href: "#work", label: "work" },
  { href: "#index", label: "index" },
  { href: "#about", label: "about" },
  { href: "#contact", label: "contact" },
];

export function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Formen home">
        <span>~/</span>formen.cc
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
