'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaWeixin,
} from 'react-icons/fa6';
import content from '@/data/content.json';

const c = content as unknown as Record<string, string | string[]>;

const columns = [1, 2, 3, 4, 5].map((n) => ({
  id: n,
  title: c[`footer-column${n}-title`] as string,
  links: c[`footer-column${n}-links`] as string[],
}));

const legal = c['footer-legal'] as string[];
const ethics = c['footer-ethics'] as string[];

const socials = [
  { label: 'Facebook', Icon: FaFacebookF, href: '#' },
  { label: 'X', Icon: FaXTwitter, href: '#' },
  { label: 'Instagram', Icon: FaInstagram, href: '#' },
  { label: 'YouTube', Icon: FaYoutube, href: '#' },
  { label: 'WeChat', Icon: FaWeixin, href: '#' },
];

// Yellow "|" between items. With `stack`, phones show one link per line with no "|".
function Divided({ items, stack = false }: { items: string[]; stack?: boolean }) {
  return (
    <ul
      className={`text-sm ${
        stack
          ? 'flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:items-center md:gap-y-2'
          : 'flex flex-wrap items-center gap-y-2'
      }`}
    >
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center">
          {i > 0 && (
            <span className={`mx-3 text-[#ffc83d] ${stack ? 'hidden md:inline' : ''}`}>|</span>
          )}
          <Link href="#" className="text-gray-400 transition-colors duration-200 hover:text-[#ffc83d]">
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  // Phones only: which column is open (one at a time)
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <footer className="bg-[#3a3a3a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        {/* Columns: accordion on phones, normal columns from 768px up */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 lg:grid-cols-5">
          {columns.map((col) => {
            const open = openId === col.id;

            return (
              <div key={col.id} className="border-b border-white/15 md:border-0">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : col.id)}
                  className="flex w-full items-center justify-between py-4 text-left text-sm font-bold md:pointer-events-none md:py-0 md:pb-4"
                >
                  {col.title}
                  <ChevronDownIcon
                    className={`h-4 w-4 text-[#ffc83d] transition-transform duration-300 md:hidden ${
                      open ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Links: slide open on phones, always visible from 768px up */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[1fr] ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <ul className="space-y-3 overflow-hidden">
                    {col.links.map((link) => (
                      <li key={link} className="first:mt-0">
                        <Link
                          href="#"
                          className="block text-sm text-gray-400 transition-colors duration-200 hover:text-[#ffc83d]"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                    <li aria-hidden className="h-1 md:hidden" />
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Yellow line */}
        <div className="my-10 h-px bg-[#ffc83d]" />

        {/* Legal links: one per line on phones */}
        <Divided items={legal} stack />

        {/* Bottom: logo + address (left), contact (right side of the page, left-aligned text) */}
        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Image src="/images/logo.png" alt="Company logo" width={140} height={40} className="h-10 w-auto" />
            <p className="mt-6 text-sm text-gray-400">{c['footer-address-line1']}</p>
            <p className="mt-1 text-sm text-gray-400">{c['footer-address-line2']}</p>
            <br />
            <p className="mt-1 text-sm text-gray-400">{c['footer-address-line3']}</p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold text-gray-400">{c['footer-contact-title']}</h3>

            <div className="flex gap-3">
              {socials.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-gray-400 transition-colors duration-200 hover:border-[#ffc83d] hover:bg-[#ffc83d] hover:text-black"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-6">
              <Divided items={ethics} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full">
        {/* Mobile Version (shown on screens smaller than 768px) */}
        <div className="block md:hidden">
          <Image 
            src="/images/footer2.jpg" 
            alt="Mobile footer design element" 
            width={768} 
            height={250} 
            className="w-full h-auto object-cover block"
            priority
          />
        </div>

        {/* Desktop Version (shown on md screen widths and up) */}
        <div className="hidden md:block">
          <Image 
            src="/images/footer.jpg" 
            alt="Desktop footer design element" 
            width={1920} 
            height={300} 
            className="w-full h-auto object-cover block"
            priority
          />
        </div>
      </div>
    </footer>
  );
}