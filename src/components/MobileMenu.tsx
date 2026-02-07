"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import * as gtag from "@/lib/gtag";

interface MenuItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string }[];
}

const menuItems: MenuItem[] = [
  { name: "Hauptseite", href: "/" },
  { name: "Menu", href: "/menu" },
  {
    name: "Alkoholische",
    href: "#",
    submenu: [
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
    name: "Alkoholfrei",
    href: "#",
    submenu: [
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
    name: "Süßes & Snacks",
    href: "#",
    submenu: [
      { name: "Süßigkeiten", href: "/menu/suessigkeiten" },
      { name: "Ice Cream", href: "/menu/ice-cream" },
      { name: "Früchte", href: "/menu/fruechte" },
    ],
  },
  {
    name: "Shisha",
    href: "#",
    submenu: [
      { name: "Shisha Deluxe", href: "/menu/shisha-deluxe" },
      { name: "Shisha Standard", href: "/menu/shisha-standard" },
      { name: "Shisha Nikotinfrei", href: "/menu/shisha-nikotinfrei" },
    ],
  },
];

const legalLinks: MenuItem[] = [
  { name: "Hausordnung", href: "/hausordnung" },
  { name: "Impressum", href: "/impressum" },
  { name: "Datenschutz", href: "/datenschutz" },
  { name: "AGB", href: "/agb" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleMenuToggle = () => {
    const actionName = isOpen ? "Menu Close" : "Menu Open";
    gtag.event({
      action: actionName,
      category: "navigation",
      label: `Hamburger ${actionName}`,
    });
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (name: string) => {
    const state = openSubmenu === name ? "Close" : "Open";
    gtag.event({
      action: `${name} ${state}`,
      category: "navigation",
      label: `${name} Submenu ${state}`,
    });
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const handleMenuItemClick = (name: string) => {
    gtag.event({
      action: name,
      category: "navigation",
      label: `${name} Clicked`,
    });
    closeMenu();
  };

  const handleLegalLinkClick = (name: string) => {
    gtag.event({
      action: name,
      category: "legal",
      label: `${name} Clicked`,
    });
    closeMenu();
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={handleMenuToggle}
        className="fixed top-4 left-4 z-[60] w-10 h-10 flex flex-col justify-center items-center gap-1.5 bg-transparent"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-[2px] bg-[#c9a962] transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-[2px] bg-[#c9a962] transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-[2px] bg-[#c9a962] transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 z-[55] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Slide-out Menu */}
      <nav
        className={`fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-[#0f0f0f] z-[58] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu Header with Logo */}
        <div className="pt-20 pb-6 px-6 border-b border-[#2a2a2a]">
          <div className="flex justify-center">
            <Image
              src="/splash-logo.png"
              alt="Heiß Lounge"
              width={80}
              height={71}
              className="w-[70px] h-auto object-contain"
              unoptimized
            />
          </div>
          <p className="text-center text-[#c9a962] text-sm tracking-[0.2em] mt-3 font-light">
            HEIß LOUNGE
          </p>
        </div>

        {/* Menu Items */}
        <div className="py-4 overflow-y-auto max-h-[calc(100vh-260px)]">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <>
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(item.name)}
                    className="w-full flex items-center justify-between px-6 py-3.5 text-[#c9a962] hover:text-white hover:bg-[#1a1a1a] transition-colors"
                  >
                    <span className="text-sm tracking-[0.15em] uppercase">
                      {item.name}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openSubmenu === item.name ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {/* Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSubmenu === item.name ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <div className="bg-[#0a0a0a] py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => handleMenuItemClick(subItem.name)}
                          className="block px-10 py-2.5 text-[#8a8a8a] hover:text-[#c9a962] transition-colors text-sm tracking-wider"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => handleMenuItemClick(item.name)}
                  className="block px-6 py-3.5 text-[#c9a962] hover:text-white hover:bg-[#1a1a1a] transition-colors text-sm tracking-[0.15em] uppercase"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          {/* Legal Links Section */}
          <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
            <p className="px-6 py-2 text-[#666] text-xs tracking-wider uppercase">
              Rechtliches
            </p>
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleLegalLinkClick(item.name)}
                className="block px-6 py-2.5 text-[#8a8a8a] hover:text-[#c9a962] hover:bg-[#1a1a1a] transition-colors text-xs tracking-wider"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0f0f0f]">
          {/* Age Restriction Warning */}
          <div className="bg-red-900/30 border-t border-red-500/30 px-4 py-2">
            <p className="text-red-400 text-[10px] text-center font-semibold tracking-wider">
              AB 18 JAHREN - AUSWEISPFLICHT
            </p>
          </div>
          <div className="p-4 border-t border-[#2a2a2a]">
            <p className="text-[#8a8a8a] text-xs text-center tracking-wider">
              SHISHA & COCKTAIL BAR
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
