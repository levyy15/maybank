"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import "swiper/css";
import content from "@/data/content.json";

const images = [
  {
    id: 1,
    src: "/images/Image1.png",
    alt: content["Image1-title"],
    title: content["Image1-title"],
    text: content["Image1-text"],
  },
  {
    id: 2,
    src: "/images/Image2.png",
    alt: content["Image2-title"],
    title: content["Image2-title"],
    text: content["Image2-text"],
  },
  {
    id: 3,
    src: "/images/Image3.png",
    alt: content["Image3-title"],
    title: content["Image3-title"],
    text: content["Image3-text"],
  },
  {
    id: 4,
    src: "/images/Image4.png",
    alt: content["Image4-title"],
    title: content["Image4-title"],
    text: content["Image4-text"],
  },
];

// Rounds the image's corners on either side of the notch (white = page background)
const cornerFill = {
  background: "radial-gradient(circle at 0 0, transparent 24px, #fff 24px)",
};

type CardData = (typeof images)[number];

function Card({ src, alt, title, text }: CardData) {
  return (
    <Link href="/coe" draggable={false} className="group block">
      <div className="relative">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 25vw, 70vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Notch: appears bottom-right on hover */}
        <div className="pointer-events-none absolute bottom-0 right-0 h-[76px] w-[76px] origin-bottom-right scale-90 opacity-0 transition duration-300 ease-out group-hover:scale-100 group-hover:opacity-100">
          {/* White block cut into the image */}
          <div className="absolute inset-0 rounded-tl-[24px] bg-white" />

          {/* Corner patches: round the image's corners where it meets the notch */}
          <div
            aria-hidden
            className="absolute bottom-full right-0 h-6 w-6"
            style={cornerFill}
          />
          <div
            aria-hidden
            className="absolute bottom-0 right-full h-6 w-6"
            style={cornerFill}
          />

          {/* Black circle with yellow arrow */}
          <span className="absolute bottom-0 right-0 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-black text-[#ffc83d]">
            <ArrowUpRightIcon className="h-5 w-5" />
          </span>
        </div>
      </div>

      {/* Title + text */}
      <h3 className="mt-4 px-5 text-lg font-semibold text-[#373737] lg:text-xl">
        {title}
      </h3>
      <p className="mt-2 px-5 text-sm leading-relaxed text-[#373737]">{text}</p>
    </Link>
  );
}

export default function ImageRow() {
  // Swiper uses Date.now() internally, so it only renders in the browser
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="mx-auto mt-24 max-w-7xl px-4 pb-6 lg:px-8 lg:pb-10">
      {/* Header: title left, button right */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-semibold text-[#373737] lg:text-5xl">
          {content["ImageRow-title"]}
        </h2>

        <Link href="/coe" className="group ml-auto hidden items-center md:flex">
          {" "}
          <span className="flex h-11 items-center whitespace-nowrap rounded-full bg-black px-5 text-sm font-medium text-[#ffc83d]">
            Expand Your Knowledge
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-[#ffc83d]">
            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
          </span>
        </Link>
      </div>

      {/* Desktop (1024px and up): 4 images side by side */}
      <div className="hidden grid-cols-4 gap-6 lg:grid">
        {images.map((img) => (
          <Card key={img.id} {...img} />
        ))}
      </div>

      {/* Tablet and phone: swipeable slider */}
      <div className="lg:hidden">
        {mounted ? (
          <Swiper
            grabCursor
            slidesPerView={1.4}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
            }}
          >
            {images.map((img) => (
              <SwiperSlide key={img.id} className="!h-auto">
                <Card {...img} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="aspect-[3/4] w-[70%]" />
        )}
      </div>

      {/* Phone only: the one Expand Your Knowledge button, between ImageRow and Reviews */}
      <div className="mt-8 flex justify-center md:hidden">
        <Link href="/coe" className="group flex items-center">
          <span className="flex h-11 items-center whitespace-nowrap rounded-full bg-black px-5 text-sm font-medium text-[#ffc83d]">
            Expand Your Knowledge
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-[#ffc83d]">
            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
          </span>
        </Link>
      </div>
    </section>
  );
}
