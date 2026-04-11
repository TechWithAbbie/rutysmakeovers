import { Button } from "@/components/ui/button";
import heroTall from "@/assets/enhanced-glam.jpg";
import heroTop from "@/assets/enhanced-makeup.jpg";
import heroBottom from "@/assets/enhanced-hair1.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex items-center pt-20 pb-10 md:min-h-screen md:pb-0 bg-cream">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left column */}
          <div className="space-y-5 md:space-y-6 animate-fade-in-up">
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-gold">
              Ruty's Makeovers
            </p>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
              Where{" "}
              <em className="text-primary not-italic font-heading">Beauty</em>
              <br />
              Comes Alive
            </h1>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed font-body">
              Unleash your inner glow with Ruty's Makeovers — premium beauty
              services from stunning bridal looks to flawless everyday glam.
              Based in Port Harcourt, Nigeria.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <a href="#booking">Book a Session</a>
              </Button>
              <Button variant="outline-hero" size="lg" asChild>
                <a href="#services">Our Services</a>
              </Button>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-6 pt-4 md:pt-6 border-t border-border">
              {[
                { value: "7 Days", label: "a Week" },
                { value: "13h", label: "Daily Hours" },
                { value: "100+", label: "Services" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-heading font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — image grid */}
          <div className="hidden md:grid grid-cols-2 gap-3 animate-fade-in">
            <div className="row-span-2 rounded-2xl overflow-hidden shadow-card-hover">
              <img
                src={heroTall}
                alt="Glam makeup by Ruty's Makeovers"
                width={640}
                height={960}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img
                src={heroTop}
                alt="Gold glam makeup"
                width={640}
                height={512}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img
                src={heroBottom}
                alt="Body wave hair styling"
                width={640}
                height={512}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
