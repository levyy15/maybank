'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Mousewheel } from 'swiper/modules';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import 'swiper/css';
import content from '@/data/content.json';
import useMounted from '@/components/shared/useMounted';

const c = content as unknown as Record<string, string>;
const tabs = content['coe-glossary-tabs'];

// Builds rows from coe-table-c1/r1, c2/r2, ... until a key is missing
const rows: { term: string; meaning: string }[] = [];
for (let n = 1; c[`coe-table-c${n}`] !== undefined; n++) {
  rows.push({ term: c[`coe-table-c${n}`], meaning: c[`coe-table-r${n}`] });
}

const arrowClass =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-400 text-gray-800 transition-colors duration-200 hover:border-[#ffc83d] hover:bg-[#ffc83d] disabled:pointer-events-none disabled:opacity-40';

export default function Glossary() {
  const mounted = useMounted();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [active, setActive] = useState(0);

  const select = (i: number) => {
    const next = Math.min(Math.max(i, 0), tabs.length - 1);
    setActive(next);
    swiper?.slideTo(next);
  };

  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 lg:mt-20 lg:px-8">
      <h2 className="text-3xl font-semibold text-gray-800 lg:text-5xl">{c['coe-title3']}</h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 lg:text-base">
        {c['coe-text3']}
      </p>

      {/* Arrows on either side of the tabs */}
      <div className="mt-8 flex items-center gap-3 lg:gap-5">
        <button
          type="button"
          aria-label="Previous"
          disabled={active === 0}
          onClick={() => select(active - 1)}
          className={arrowClass}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          {mounted ? (
            <Swiper
              modules={[Mousewheel]}
              mousewheel={{ forceToAxis: true }}
              onSwiper={setSwiper}
              grabCursor
              slidesPerView="auto"
              spaceBetween={8}
            >
              {tabs.map((tab, i) => (
                <SwiperSlide key={tab} className="!w-auto">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    className="relative whitespace-nowrap px-4 pb-3 text-sm text-gray-800 lg:text-lg"
                  >
                    {tab}
                    {/* Yellow bar under the selected tab */}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 bottom-0 h-1 origin-left rounded-full bg-[#ffc83d] transition-transform duration-300 ${
                        active === i ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="h-10" />
          )}
        </div>

        <button
          type="button"
          aria-label="Next"
          disabled={active === tabs.length - 1}
          onClick={() => select(active + 1)}
          className={arrowClass}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Table */}
      <div className="mt-8 overflow-hidden rounded-lg">
        <div className="bg-[#ffc83d] py-4 text-center text-base font-bold text-gray-900">
          {c['coe-table-title']}
        </div>

        {rows.map((row, i) => (
          <div
            key={row.term}
            className={`grid grid-cols-[2fr_3fr] gap-4 px-4 py-5 text-sm text-gray-800 lg:px-8 lg:text-base ${
              i % 2 === 0 ? 'bg-white' : 'bg-[#fffcf3]'
            }`}
          >
            <p className="font-semibold">{row.term}</p>
            <p>{row.meaning}</p>
          </div>
        ))}
      </div>
    </section>
  );
}