import React from "react";

import ceo from "@/assets/ceo.jpg";
import gallery1 from "@/assets/enhanced-glam.jpg";
import gallery2 from "@/assets/enhanced-makeup.jpg";
import gallery3 from "@/assets/enhanced-glam.jpg";
import gallery4 from "@/assets/enhanced-hair1.jpg";
import gallery5 from "@/assets/enhanced-braids1.jpg";
import gallery6 from "@/assets/enhanced-braids2.jpg";
import gallery7 from "@/assets/user-hair1.jpg";
import gallery8 from "@/assets/enhanced-lashes1.jpg";
import gallery9 from "@/assets/enhanced-lashes2.jpg";
import gallery10 from "@/assets/enhanced-nail1.jpg";
import gallery11 from "@/assets/enhanced-nail2.jpg";
import gallery12 from "@/assets/user-nail1.jpg";
import gallery13 from "@/assets/user-nail2.jpg";

interface GalleryItemData {
  src: string;
  label: string;
}

interface GalleryItemProps {
  item: GalleryItemData;
}

const items: GalleryItemData[] = [
  // GLAM & MAKEUP — 4 photos, CEO first
  { src: ceo, label: "CEO" },
  { src: gallery1, label: "Glam Makeup" },
  { src: gallery2, label: "Gold Eyes" },
  { src: gallery3, label: "Glam Art" },

  // HAIR — 4 photos
  { src: gallery4, label: "Body Wave Wig" },
  { src: gallery5, label: "Knotless Braids" },
  { src: gallery6, label: "Curly Braids" },
  { src: gallery7, label: "Hair Styling" },

  // LASHES — 2 photos
  { src: gallery8, label: "Lash Extensions" },
  { src: gallery9, label: "Natural Lashes" },

  // NAILS — 4 photos
  { src: gallery10, label: "Nail Art" },
  { src: gallery11, label: "Stiletto Nails 1" },
  { src: gallery12, label: "Stiletto Nails 2" },
  { src: gallery13, label: "Stiletto Nails 3" },
];

const GalleryItem: React.FC<GalleryItemProps> = ({ item }) => {
  return (
    <div className="relative group rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={item.src}
        alt={item.label}
        loading="lazy"
        className="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <p className="absolute bottom-3 left-3 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {item.label}
      </p>
    </div>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-14">
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-gold">
            Our Portfolio
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark-foreground">
            Gallery
          </h2>
        </div>

        <div className="space-y-12">
          {/* GLAM & MAKEUP */}
          <div>
            <h3 className="font-heading text-xl text-gold mb-4 tracking-widest uppercase">
              Glam & Makeup
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {items.slice(0, 4).map((item) => (
                <GalleryItem key={item.label} item={item} />
              ))}
            </div>
          </div>

          {/* HAIR */}
          <div>
            <h3 className="font-heading text-xl text-gold mb-4 tracking-widest uppercase">
              Hair
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {items.slice(4, 8).map((item) => (
                <GalleryItem key={item.label} item={item} />
              ))}
            </div>
          </div>

          {/* LASHES */}
          <div>
            <h3 className="font-heading text-xl text-gold mb-4 tracking-widest uppercase">
              Lashes
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {items.slice(8, 10).map((item) => (
                <GalleryItem key={item.label} item={item} />
              ))}
            </div>
          </div>

          {/* NAILS */}
          <div>
            <h3 className="font-heading text-xl text-gold mb-4 tracking-widest uppercase">
              Nails
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {items.slice(10).map((item) => (
                <GalleryItem key={item.label} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
