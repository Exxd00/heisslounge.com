"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "@/components/MobileMenu";
import { ChevronDown } from "lucide-react";
import * as gtag from "@/lib/gtag";

const categories = [
  {
    id: "alkoholische",
    title: "Alkoholische Getränke",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
    subcategories: [
      { name: "Biere", href: "/menu/biere" },
      { name: "Cocktails", href: "/menu/cocktails" },
      { name: "Caipi's", href: "/menu/caipis" },
      { name: "Shots", href: "/menu/shots" },
      { name: "Longdrinks", href: "/menu/longdrinks" },
      { name: "Weine & Sekt", href: "/menu/weine-sekt" },
      { name: "Bottles", href: "/menu/bottles" },
    ],
  },
  {
    id: "alkoholfrei",
    title: "Alkoholfreie Getränke",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
    subcategories: [
      { name: "Softdrinks", href: "/menu/softdrinks" },
      { name: "Sweet Drinks", href: "/menu/sweet-drinks" },
      { name: "Säfte", href: "/menu/saefte" },
      { name: "Driver's Cocktails", href: "/menu/drivers-cocktails" },
      { name: "Hot Coffee", href: "/menu/hot-coffee" },
      { name: "Ice Coffee", href: "/menu/ice-coffee" },
      { name: "Milchshakes", href: "/menu/milchshakes" },
    ],
  },
  {
    id: "suesses",
    title: "Süßes & Snacks",
    image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=600&q=80",
    subcategories: [
      { name: "Süßigkeiten", href: "/menu/suessigkeiten" },
      { name: "Ice Cream", href: "/menu/ice-cream" },
      { name: "Früchte", href: "/menu/fruechte" },
    ],
  },
  {
    id: "shisha",
    title: "Shisha",
    image: "/Shisha.png",
    subcategories: [
      { name: "Shisha Deluxe", href: "/menu/shisha-deluxe" },
      { name: "Shisha Standard", href: "/menu/shisha-standard" },
      { name: "Shisha Nikotinfrei", href: "/menu/shisha-nikotinfrei" },
    ],
  },
];

export default function MenuPage() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string, title: string) => {
    const state = openAccordion === id ? "Close" : "Open";
    gtag.event({
      action: `${title} ${state}`,
      category: "menu",
      label: `${title} Category ${state}`,
    });
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  const handleSubcategoryClick = (name: string) => {
    gtag.event({
      action: name,
      category: "menu",
      label: `${name} Clicked`,
    });
  };

  const handleSocialClick = (name: string) => {
    gtag.event({
      action: name,
      category: "social",
      label: `${name} Clicked`,
    });
  };

  const handleLegalClick = (name: string) => {
    gtag.event({
      action: name,
      category: "legal",
      label: `${name} Clicked`,
    });
  };

  const isOpen = (id: string) => openAccordion === id;

  return (
    <div className="min-h-screen">
      {/* Mobile Menu */}
      <MobileMenu />

      {/* Header */}
      <header className="header fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-end">
          {/* Social Media Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/heiss_lounge/?utm_source=ig_web_button_share_sheet"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick("Instagram")}
              className="text-[#c9a962] hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1DfMp4u2Vz/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick("Facebook")}
              className="text-[#c9a962] hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Section */}
          <section className="text-center mb-12 sm:mb-20">
            <h2 className="text-[#c9a962] text-2xl sm:text-3xl md:text-4xl tracking-[0.25em] font-light uppercase">
              HEIß LOUNGE
            </h2>
            <div className="section-divider" />
            <p className="text-[#8a8a8a] max-w-2xl mx-auto mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed px-4 tracking-widest uppercase">
              Menu
            </p>
          </section>

          {/* Categories Grid - Accordion Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {categories.map((category) => (
              <div key={category.id} className="category-card rounded-lg overflow-hidden">
                {/* Accordion Header - Clickable Image Area */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(category.id, category.title)}
                  className="relative h-40 sm:h-48 w-full overflow-hidden cursor-pointer group"
                  aria-expanded={isOpen(category.id)}
                  aria-controls={`accordion-content-${category.id}`}
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className={`object-cover transition-transform duration-500 ${
                      isOpen(category.id) ? "scale-110" : "group-hover:scale-105"
                    }`}
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />

                  {/* Title and Chevron */}
                  <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3">
                    <h3 className="category-card-title text-center text-lg sm:text-xl">
                      {category.title}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-[#c9a962] transition-transform duration-300 ${
                        isOpen(category.id) ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Accordion Content - Subcategories */}
                <div
                  id={`accordion-content-${category.id}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen(category.id) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-5 sm:p-8 pt-4 sm:pt-6">
                    <div className="section-divider mb-4 sm:mb-6" />
                    <div className="space-y-0">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => handleSubcategoryClick(sub.name)}
                          className="subcategory-link"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-4">
            <Image
              src="/splash-logo.png"
              alt="Heiß Lounge"
              width={45}
              height={40}
              className="w-[35px] h-auto sm:w-[40px] md:w-[45px] object-contain mx-auto"
              unoptimized
            />
          </div>
          <p className="text-[#c9a962] text-xs sm:text-sm tracking-widest font-light text-center">
            HEIß LOUNGE
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-4 mb-4">
            <Link
              href="/impressum"
              onClick={() => handleLegalClick("Impressum")}
              className="text-[#8a8a8a] hover:text-[#c9a962] text-[10px] sm:text-xs tracking-wider transition-colors"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              onClick={() => handleLegalClick("Datenschutz")}
              className="text-[#8a8a8a] hover:text-[#c9a962] text-[10px] sm:text-xs tracking-wider transition-colors"
            >
              Datenschutz
            </Link>
            <Link
              href="/agb"
              onClick={() => handleLegalClick("AGB")}
              className="text-[#8a8a8a] hover:text-[#c9a962] text-[10px] sm:text-xs tracking-wider transition-colors"
            >
              AGB
            </Link>
            <Link
              href="/hausordnung"
              onClick={() => handleLegalClick("Hausordnung")}
              className="text-[#8a8a8a] hover:text-[#c9a962] text-[10px] sm:text-xs tracking-wider transition-colors"
            >
              Hausordnung
            </Link>
          </div>

          <p className="text-[#8a8a8a] text-[9px] sm:text-[10px] tracking-wider text-center">
            Alle Rechte vorbehalten
          </p>
        </div>
      </footer>
    </div>
  );
}
