"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

// Swiper styles (core only, no pagination css needed)
import "swiper/css";

import content from "@/data/content.json";
import useRem from "./shared/useRem";

const slides = content["homepage-banner-slides"];
const pad = (n: number) => String(n).padStart(2, "0");

// const FADE_DISTANCE = 250;

export default function BannerSlider() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  //   const [opacity, setOpacity] = useState(1);
  //   const wrapRef = useRef<HTMLDivElement>(null);
  const total = slides.length;
  const rem = useRem();

  // Only render Swiper in the browser (it uses Date.now() internally)
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full">
      {/* Counter + progress bar (01 ---- 03), as in the mockup */}
      <div className="mb-4 flex items-center gap-3 text-xs font-bold lg:pr-[18%]">
        <span>{pad(active + 1)}</span>
        <div className="relative h-[3px] flex-1 rounded-full bg-white/60">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-[#ffc83d] transition-all duration-500"
            style={{ width: `${((active + 1) / total) * 100}%` }}
          />
        </div>
        <span>{pad(total)}</span>
      </div>

      {mounted ? (
        <Swiper
          modules={[Mousewheel]}
          mousewheel={{ forceToAxis: true }}
          grabCursor
          slidesPerView={"auto"}
          spaceBetween={rem}
          onSlideChange={(s) =>
            setActive(s.isEnd ? total - 1 : Math.min(s.activeIndex, total - 1))
          }
        >
          {slides.map((slide) => (
            <SwiperSlide
              key={slide.id}
              className="!h-auto !w-[min(20rem,82vw)] sm:!w-[25rem]"
            >
              <Link
                href={slide.href}
                draggable={false}
                className="flex h-[8.125rem] flex-col justify-between rounded-[1.75rem] border border-white/60 bg-white/10 p-4 backdrop-blur-[4px] sm:aspect-[7/3] sm:h-auto sm:p-5"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs">{slide.category}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/50 backdrop-blur-[4px]">
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="text-base font-bold leading-snug sm:text-lg">
                  {slide.title}
                </h3>
              </Link>
            </SwiperSlide>
          ))}
          {/* Spacer: empty room after the last card so it can be swiped further across */}
          <SwiperSlide
            aria-hidden
            className="pointer-events-none !h-auto !w-[20vw] lg:!w-[15vw]"
          />
        </Swiper>
      ) : (
        <div className="h-[8.125rem] w-[min(20rem,82vw)] sm:aspect-[7/3] sm:h-auto sm:w-[25rem]" />
      )}
    </div>
  );
}
