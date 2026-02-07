"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import MovingSpotlight from "./MovingSpotlight";
import MouseTrail from "./MouseTrail";
import FloatingParticles from "./FloatingParticles";
import ThemeToggle from "./ThemeToggle";
import * as gtag from "@/lib/gtag";

export default function LinksPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSplash, setShowSplash] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  // Prefetch menu page for faster navigation
  useEffect(() => {
    router.prefetch("/menu");
  }, [router]);

  // Auto-detect source from URL params
  useEffect(() => {
    const source = searchParams.get("ref") || searchParams.get("source");
    if (source) {
      const sourceMap: { [key: string]: string } = {
        web: "web",
        instagram: "instagram",
        ig: "instagram",
        freunde: "freunde",
        friends: "freunde",
        maps: "maps",
        google: "maps",
        googlemaps: "maps",
      };
      const mappedSource = sourceMap[source.toLowerCase()];
      if (mappedSource) {
        setSelectedSource(mappedSource);
        // Track auto-detected source
        gtag.event({
          action: "source_auto_detected",
          category: "engagement",
          label: mappedSource,
        });
      }
    }
  }, [searchParams]);

  const handleMenuClick = () => {
    // Track menu button click
    gtag.event({
      action: "click",
      category: "navigation",
      label: "Menu",
    });

    setShowSplash(true);
    // Start fade out after 1.8 seconds
    setTimeout(() => {
      setIsFading(true);
      // Navigate immediately when fade starts
      router.push("/menu");
    }, 1800);
  };

  const handleExternalLinkClick = (linkLabel: string) => {
    gtag.event({
      action: "click",
      category: "social",
      label: linkLabel,
    });
  };

  const handlePhoneClick = () => {
    gtag.event({
      action: "click",
      category: "contact",
      label: "Anrufen",
    });
  };

  const handleWhatsAppClick = () => {
    gtag.event({
      action: "click",
      category: "contact",
      label: "WhatsApp",
    });
  };

  const handleSourceSelect = (sourceId: string) => {
    setSelectedSource(sourceId);
    gtag.event({
      action: "source_selected",
      category: "engagement",
      label: sourceId,
    });
  };

  const sourceOptions = [
    { id: "web", label: "Web" },
    { id: "instagram", label: "Instagram" },
    { id: "freunde", label: "Freunde" },
    { id: "maps", label: "Google Maps" },
  ];

  const links = [
    {
      id: "menu",
      label: "Menu",
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      action: handleMenuClick,
      isInternal: true,
    },
    {
      id: "instagram",
      label: "Instagram",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFDC80" />
              <stop offset="25%" stopColor="#F77737" />
              <stop offset="50%" stopColor="#E1306C" />
              <stop offset="75%" stopColor="#C13584" />
              <stop offset="100%" stopColor="#833AB4" />
            </linearGradient>
          </defs>
          <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      href: "https://www.instagram.com/heiss_lounge/?utm_source=ig_web_button_share_sheet",
      isInternal: false,
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="facebook-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#18ACFE" />
              <stop offset="100%" stopColor="#0163E0" />
            </linearGradient>
          </defs>
          <path fill="url(#facebook-gradient)" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: "https://www.facebook.com/share/1DfMp4u2Vz/?mibextid=wwXIfr",
      isInternal: false,
    },
    {
      id: "maps",
      label: "Google Maps",
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path fill="#4285F4" d="M12 0C7.31 0 3.5 3.81 3.5 8.5c0 5.25 7.5 14.5 8.5 14.5s8.5-9.25 8.5-14.5C20.5 3.81 16.69 0 12 0z"/>
          <path fill="#34A853" d="M12 0C7.31 0 3.5 3.81 3.5 8.5c0 2.4.94 4.58 2.47 6.21L12 8.5V0z"/>
          <path fill="#FBBC04" d="M5.97 14.71C4.44 13.08 3.5 10.9 3.5 8.5 3.5 5.46 5.33 2.86 8 1.53L12 8.5l-6.03 6.21z"/>
          <path fill="#EA4335" d="M12 0v8.5L8 1.53C9.18.56 10.53 0 12 0z"/>
          <circle fill="white" cx="12" cy="8.5" r="3"/>
        </svg>
      ),
      href: "https://maps.app.goo.gl/W4FMYYLzvefNw72U7?g_st=ic",
      isInternal: false,
    },
  ];

  return (
    <>
      {/* Splash Screen Overlay */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700 ease-out bg-[var(--bg-dark)] ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Logo */}
          <div className="animate-fadeIn flex items-center justify-center">
            <Image
              src="/splash-logo.png"
              alt="Heiß Lounge"
              width={250}
              height={222}
              className="w-[180px] h-auto sm:w-[220px] md:w-[250px] object-contain"
              priority
              unoptimized
            />
          </div>

          {/* Text below logo */}
          <div className="mt-6 text-center animate-fadeInDelayed">
            <h1
              className="text-[var(--gold)] text-xl sm:text-2xl md:text-3xl tracking-[0.3em] font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              HEIß LOUNGE
            </h1>
            <p className="text-[var(--text-muted)] text-xs sm:text-sm tracking-[0.2em] mt-2">
              MENU
            </p>
          </div>
        </div>
      )}

      {/* Main Links Page */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative bg-[var(--bg-dark)] transition-colors duration-400">
        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Moving Spotlight Background */}
        <MovingSpotlight />

        {/* Mouse Trail Effect */}
        <MouseTrail />

        {/* Floating Golden Particles */}
        <FloatingParticles />

        {/* Logo - with floating animation */}
        <div className="mb-6 animate-fadeIn">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 animate-float">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] animate-pulse-glow opacity-30" />
            {/* Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/splash-logo.png"
                alt="Heiß Lounge"
                width={180}
                height={180}
                className="w-full h-auto object-contain drop-shadow-[0_0_20px_rgba(201,169,98,0.4)]"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10 animate-fadeInDelayed">
          <h1
            className="text-[var(--gold)] text-2xl sm:text-3xl md:text-4xl tracking-[0.2em] font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Heiss Lounge
          </h1>
          <p
            className="text-[var(--gold)] text-sm sm:text-base tracking-[0.15em] mt-2 font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Herzlich Willkommen
          </p>
        </div>

        {/* Link Buttons */}
        <div className="w-full max-w-md space-y-4 animate-fadeInDelayed">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => {
                if (link.isInternal && link.action) {
                  link.action();
                } else if (link.href) {
                  handleExternalLinkClick(link.label);
                  window.open(link.href, "_blank", "noopener,noreferrer");
                }
              }}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-full bg-[var(--card-bg)] border-2 border-[var(--gold)] hover:bg-[var(--card-hover)] hover:border-[var(--gold-light)] hover:scale-[1.02] transition-all duration-300 group"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-full bg-[var(--bg-dark)] flex items-center justify-center flex-shrink-0 border border-[var(--gold)]/30">
                <span className="text-[var(--gold)] group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </span>
              </div>

              {/* Label */}
              <span
                className="flex-1 text-center text-[var(--text-light)] text-base sm:text-lg tracking-wider font-light pr-12"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {link.label}
              </span>
            </button>
          ))}
        </div>

        {/* Contact Icons */}
        <div className="flex items-center justify-center gap-6 mt-6 animate-fadeInDelayed">
          {/* Phone Call */}
          <a
            href="tel:+4917623296860"
            onClick={handlePhoneClick}
            className="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--bg-dark)] hover:border-[var(--gold)] transition-all duration-300"
            aria-label="Anrufen"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/4917623296860"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[#25D366]/40 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300"
            aria-label="WhatsApp"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>

        {/* How did you find us? Section */}
        <div className="w-full max-w-md mt-10 animate-fadeInDelayed">
          {/* Section Title with Lines */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[var(--gold)]/50" />
            <span
              className="text-[var(--gold)] text-sm sm:text-base tracking-wider whitespace-nowrap"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Wie hast du uns gefunden?
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[var(--gold)]/50" />
          </div>

          {/* Source Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {sourceOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSourceSelect(option.id)}
                className={`relative px-4 py-2 rounded-full text-sm tracking-wider transition-all duration-300 ${
                  selectedSource === option.id
                    ? "bg-[var(--gold)] text-[var(--bg-dark)] border-2 border-[var(--gold)]"
                    : "bg-[var(--card-bg)] text-[var(--text-muted)] border border-[var(--border-color)] hover:border-[var(--gold)]/50 hover:text-[var(--text-light)]"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className={`flex items-center gap-2 ${selectedSource === option.id ? "font-medium" : "font-light"}`}>
                  {selectedSource === option.id && (
                    <Check className="w-4 h-4" />
                  )}
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center animate-fadeInDelayed">
          <p className="text-[var(--text-muted)] text-xs tracking-wider">
            SHISHA & COCKTAIL BAR
          </p>
        </div>
      </div>
    </>
  );
}
