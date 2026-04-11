import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#booking", label: "Book" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}>
      <div className="container mx-auto px-4 flex items-center justify-between py-2">
        <a href="#home" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Ruty's Makeovers"
            className="h-14 md:h-16 w-auto"
          />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium tracking-wide text-foreground/70 hover:text-primary transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button
          variant="hero"
          size="sm"
          asChild
          className="hidden md:inline-flex">
          <a href="#booking">Book Now</a>
        </Button>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border animate-fade-in">
          <ul className="flex flex-col items-center gap-4 py-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-base font-medium text-foreground/70 hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Button variant="hero" size="sm" asChild>
                <a href="#booking" onClick={() => setIsOpen(false)}>
                  Book Now
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
