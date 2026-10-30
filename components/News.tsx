"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Scrollbar } from "swiper/modules";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import "swiper/css";
import "swiper/css/scrollbar";
import content from "@/data/content.json";
import useMounted from "./shared/useMounted";
import SwiperScrollbar from "./shared/SwipperScrollbar";
import HoverNotch from "./shared/HoverNotch";

const c = content as unknown as Record<string, string>;
const pad = (n: number) => String(n).padStart(2, "0");

const news = [
  {
    id: 1,
    image: "/images/Image5.png",
    alt: c["News1-text"],
    text: c["News1-text"],
    date: c["News1-date"],
    category: c["News1-category"],
  },
  {
    id: 2,
    image: "/images/Image6.png",
    alt: c["News2-text"],
    text: c["News2-text"],
    date: c["News2-date"],
    category: c["News2-category"],
  },
  {
    id: 3,
    image: "/images/Image7.png",
    alt: c["News3-text"],
    text: c["News3-text"],
    date: c["News3-date"],
    category: c["News3-category"],
  },
  {
    id: 4,
    image: "/images/Image5.png",
    alt: c["News4-text"],
    text: c["News4-text"],
    date: c["News4-date"],
    category: c["News4-category"],
  },
];

const TOTAL = news.length;

export default function News() {
  const mounted = useMounted();

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 lg:px-8 lg:pb-24 lg:pt-10">
      {/* Header: title left, button right */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-md text-2xl font-semibold text-[#373737] lg:text-5xl">
          {c["News-title"]}
        </h2>

        <Link
          href="/news"
          className="group ml-auto hidden items-center md:flex"
        >
          {" "}
          <span className="flex h-11 items-center whitespace-nowrap rounded-full bg-black px-5 text-sm font-medium text-[#ffc83d]">
            Expand Your Knowledge
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-[#ffc83d]">
            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
          </span>
        </Link>
      </div>

      {mounted ? (
        <>
          <Swiper
            modules={[Mousewheel, Scrollbar]}
            mousewheel={{ forceToAxis: true }}
            scrollbar={{ el: ".news-scrollbar", draggable: true }}
            grabCursor
            slidesPerView={1.2}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2, spaceBetween: 24 },
            }}
          >
            {news.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto">
                {/* One whole box: image + text + date. Turns yellow on hover. */}
                <Link
                  href="/news"
                  draggable={false}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-4 transition-colors duration-300 hover:bg-[#ffc83d]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.alt || ""}
                      fill
                      sizes="(min-width: 1024px) 30vw, 80vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <p className="mt-4 text-lg leading-snug text-gray-800">
                    {item.text}
                  </p>

                  {/* Date and category, bottom left */}
                  <p className="mt-auto pt-6 text-sm text-gray-700">
                    {item.date}
                    <span className="mx-3">•</span>
                    {item.category}
                  </p>

                  {/* Black notch, appears bottom-right on hover */}
                  <HoverNotch />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <SwiperScrollbar
            selector="news-scrollbar"
            start={pad(1)}
            end={pad(TOTAL)}
          />
        </>
      ) : (
        <div className="h-[420px]" />
      )}
    </section>
  );
}
