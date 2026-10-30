"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  PlusIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Personal from "./Personal";

type NavLink = {
  key: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
};

const links: NavLink[] = [
  { key: "about", label: "About Us", href: "/about" },
  { key: "personal", label: "Personal", href: "/personal", hasDropdown: true },
  { key: "business", label: "Business", href: "/business" },
  { key: "global", label: "Global", href: "/global" },
  { key: "coe", label: "COE", href: "/coe" },
];

// Reserves the width of the bold text so nothing shifts when it turns bold on hover
const labelBase =
  "inline-block before:invisible before:block before:h-0 before:overflow-hidden before:font-bold before:content-[attr(data-text)]";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const closeAll = () => {
    setDropdownOpen(false);
    setMobileOpen(false);
  };

  // Close when clicking outside the header or pressing Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Desktop only: close the dropdown when the mouse leaves the navbar + dropdown area
  const handleHeaderLeave = () => {
    if (window.innerWidth >= 1024) setDropdownOpen(false);
  };

  const itemClass =
    "group flex h-full items-center gap-1 text-sm font-medium text-gray-900";

  const renderItem = (link: NavLink, mobile = false) => {
    const isOpen = link.hasDropdown && dropdownOpen;

    const content = (
      <>
        <span
          data-text={link.label}
          className={`${labelBase} transition-all duration-200 group-hover:font-bold ${
            isOpen ? "font-bold" : ""
          }`}
        >
          {link.label}
        </span>
        <PlusIcon
          className={`h-3 w-3 stroke-[3] transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </>
    );

    if (link.hasDropdown) {
      return (
        <button
          type="button"
          // Desktop: opens on hover. Mobile: tap to toggle.
          onMouseEnter={() => !mobile && setDropdownOpen(true)}
          onClick={() =>
            mobile ? setDropdownOpen((o) => !o) : setDropdownOpen(true)
          }
          aria-expanded={dropdownOpen}
          className={itemClass}
        >
          {content}
        </button>
      );
    }

    return (
      <Link
        href={link.href}
        onClick={closeAll}
        // Hovering a different item closes the dropdown on desktop
        onMouseEnter={() => !mobile && setDropdownOpen(false)}
        className={itemClass}
      >
        {content}
      </Link>
    );
  };

  return (
    <header
      ref={headerRef}
      onMouseLeave={handleHeaderLeave}
      className="sticky top-0 z-50 w-full bg-[#ffc83d] shadow"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-20 lg:px-8">
        {/* Logo: always goes back to the homepage (app/page.tsx) */}
        <Link
          href="/"
          onClick={closeAll}
          aria-label="Go to homepage"
          className="flex h-70% shrink-0 items-center"
        >
          <Image
            src="/images/Logo.jpg"
            alt="Company logo"
            width={140}
            height={40}
            priority
            className="h-10 w-auto lg:h-full"
          />
        </Link>

        {/* Desktop links */}
        <nav className="ml-auto mr-8 hidden h-full items-center gap-8 lg:flex">
          {links.map((link) => (
            <div key={link.key} className="h-full">
              {renderItem(link)}
            </div>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onMouseEnter={() => setDropdownOpen(false)}
            className="group flex items-center gap-1 text-sm font-medium text-gray-900"
          >
            <GlobeAltIcon className="h-5 w-5" />
            <span
              data-text="EN"
              className={`${labelBase} transition-all duration-200 group-hover:font-bold`}
            >
              EN
            </span>
          </button>
          <button
            type="button"
            aria-label="Search"
            onMouseEnter={() => setDropdownOpen(false)}
            className="text-gray-900 transition-transform duration-200 hover:scale-110"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>

          {/* Hamburger (mobile/tablet only) */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="text-gray-900 lg:hidden"
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Desktop dropdown (full width, directly under the bar, no gap) */}
      <div
        aria-hidden={!dropdownOpen}
        className={`absolute left-0 right-0 top-full hidden bg-white transition-[grid-template-rows,box-shadow,visibility] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:grid ${
          dropdownOpen
            ? "visible grid-rows-[1fr] shadow-lg"
            : "invisible grid-rows-[0fr] shadow-none"
        }`}
      >
        {/* overflow-hidden clips the content while the panel is still growing */}
        <div className="overflow-hidden">
          <Personal onNavigate={closeAll} />
        </div>
      </div>

      {/* Mobile / tablet panel */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-black/10 bg-[#ffc83d] lg:hidden">
          <nav className="flex flex-col px-4 py-2">
            {links.map((link) => (
              <div key={link.key} className="border-b border-black/10 py-3">
                {renderItem(link, true)}
                {link.hasDropdown && dropdownOpen && (
                  <div className="mt-3 rounded bg-white">
                    <Personal onNavigate={closeAll} />
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
