'use client';

import { useState } from 'react';
import {
  BuildingLibraryIcon,
  AcademicCapIcon,
  BookOpenIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import content from '@/data/content.json';

const c = content as unknown as Record<string, string>;

const items = [
  { Icon: BuildingLibraryIcon, text: c['coe-icon1-text'] },
  { Icon: AcademicCapIcon, text: c['coe-icon2-text'] },
  { Icon: BookOpenIcon, text: c['coe-icon3-text'] },
  { Icon: DocumentTextIcon, text: c['coe-icon4-text'] },
  { Icon: ChartBarIcon, text: c['coe-icon5-text'] },
];

export default function Icons() {
  const [active, setActive] = useState(0);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-60 lg:pt-14">
      <div className="grid grid-cols-5">
        {items.map(({ Icon, text }, i) => (
          <button
            key={text}
            type="button"
            onClick={() => setActive(i)}
            className="flex flex-col items-center gap-3 px-1 pb-5 text-center"
          >
            <Icon className="h-8 w-8 text-gray-900 lg:h-10 lg:w-10" />
            <span
              className={`text-xs text-gray-800 sm:text-sm lg:text-base ${
                active === i ? 'font-bold' : ''
              }`}
            >
              {text}
            </span>
          </button>
        ))}
      </div>

      {/* Track + sliding yellow bar centered beneath each icon */}
      <div className="relative h-1 rounded-full ">
        <span
          aria-hidden
          className="absolute left-[5%] top-0 h-full w-[10%] rounded-full bg-[#ffc83d] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: `translateX(${active * 200}%)` }}
        />
      </div>
    </section>
  );
}