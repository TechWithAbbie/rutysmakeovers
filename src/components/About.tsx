import about1 from "@/assets/enhanced-glam.jpg";
import about2 from "@/assets/enhanced-braids1.jpg";
import about3 from "@/assets/enhanced-nail2.jpg";
import about4 from "@/assets/enhanced-lashes1.jpg";

const tags = [
  "Bridal Specialist",
  "Home Service Available",
  "Gele Tying",
  "Wig Making",
  "Microblading",
  "Mon – Sun, 8 AM – 9 PM",
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Left — 2×2 image grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              {[about1, about2, about3, about4].map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden shadow-card aspect-square">
                  <img
                    src={src}
                    alt={`About Ruty's Makeovers ${i + 1}`}
                    loading="lazy"
                    width={640}
                    height={640}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 md:bottom-4 md:right-4 bg-primary text-primary-foreground rounded-full w-28 h-28 flex items-center justify-center text-center shadow-lg">
              <span className="text-xs font-heading font-semibold leading-tight px-2">
                100%<br />Passion<br />&amp; Pride
              </span>
            </div>
          </div>

          {/* Right — copy */}
          <div className="space-y-6 animate-fade-in-up">
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-gold">
              Our Story
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
              About Ruty's Makeovers
            </h2>
            <div className="w-16 h-1 bg-gold rounded-full" />
            <p className="text-muted-foreground leading-relaxed">
              At Ruty's Makeovers, we believe every woman deserves to feel like a queen. 
              Based in Port Harcourt, Nigeria, we specialize in transforming beauty visions 
              into reality — from breathtaking bridal looks and gele tying to professional 
              wig making, microblading, and lash extensions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With years of experience and a passion for perfection, our team delivers 
              personalized beauty experiences that celebrate your unique style. Whether it's 
              your wedding day, a special event, or just a day to pamper yourself — we've got you covered. 
              We also offer home service and travel for your convenience.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-xs font-medium bg-blush text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
