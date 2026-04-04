import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-card py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <button
          onClick={() => handleClick("#home")}
          className="font-heading text-xl font-bold tracking-tight text-foreground"
        >
          Tejas Itankar<span className="text-primary">.</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
          <a
            href="mailto:tejasitankar94820@gmail.com"
            className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-card mt-2 mx-4 rounded-xl p-4 animate-fade-in-up">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="block w-full text-left py-3 px-4 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
          <a
            href="mailto:tejasitankar94820@gmail.com"
            className="block mt-2 text-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
