import serviceGlam from "@/assets/enhanced-glam.jpg";
import serviceHair from "@/assets/enhanced-hair1.jpg";
import serviceLashes from "@/assets/enhanced-lashes1.jpg";
import serviceBraids from "@/assets/enhanced-braids1.jpg";
import servicePerfumes from "@/assets/enhanced-perfume.jpg";
import serviceMakeup from "@/assets/enhanced-makeup.jpg";

const services = [
  {
    title: "Bridal Makeup & Gele",
    category: "Bridal",
    description: "Complete bridal transformation — flawless makeup, stunning gele tying, and accessories styling for your perfect day.",
    image: serviceGlam,
    featured: true,
  },
  {
    title: "Hair Styling & Wigs",
    category: "Hair",
    description: "Custom wigs, braiding, revamping, ventilation and professional hair styling to match your personality.",
    image: serviceHair,
  },
  {
    title: "Lashes & Extensions",
    category: "Lashes",
    description: "Wispy, dramatic, or natural — volume and classic lash extensions that elevate your look effortlessly.",
    image: serviceLashes,
  },
  {
    title: "Braiding & Styling",
    category: "Hair",
    description: "Expert braiding techniques from knotless braids to goddess locs — intricate styles that turn heads.",
    image: serviceBraids,
  },
  {
    title: "Perfumes & Products",
    category: "Products",
    description: "Premium fragrance collection and quality beauty products for every occasion. Delivery available via WhatsApp.",
    image: servicePerfumes,
  },
  {
    title: "Event & Occasion Makeup",
    category: "Makeup",
    description: "Red carpet ready looks for weddings, parties, photoshoots, and every celebration that matters.",
    image: serviceMakeup,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-14">
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-gold">
            What We Offer
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Our Services
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 ${
                i === 0 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className={`relative ${i === 0 ? "h-72 md:h-80" : "h-64"}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(338_40%_7%/0.75)] via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gold text-accent-foreground mb-2">
                  {service.category}
                </span>
                <h3 className="font-heading text-xl md:text-2xl font-bold mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-md">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
