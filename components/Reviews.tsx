"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar } from "swiper/modules";
import { UserIcon } from "@heroicons/react/24/solid";
import "swiper/css";
import "swiper/css/scrollbar";
import content from "@/data/content.json";
import useMounted from "./shared/useMounted";
import SwiperScrollbar from "./shared/SwipperScrollbar";

const reviews = content.reviews;
const pad = (n: number) => String(n).padStart(2, "0");

export default function Reviews() {
  const mounted = useMounted();

  return (
    <section className="mt-8 overflow-hidden pb-16 lg:mt-12 lg:pb-24">
      {mounted ? (
        <>
          <Swiper
            modules={[Autoplay, Scrollbar]}
            centeredSlides
            rewind
            grabCursor
            speed={1200}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            scrollbar={{ el: ".reviews-scrollbar", draggable: true }}
            slidesPerView={1.15}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 1.4, spaceBetween: 24 },
              1024: { slidesPerView: 1.8, spaceBetween: 40 },
            }}
            className="[--swiper-wrapper-transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
          >
            {reviews.map((r) => (
              <SwiperSlide key={r.id} className="!h-auto">
                {({ isActive }) => (
                  // pb-10 leaves room for the half of the profile box that hangs out
                  <div className="pb-10">
                    <div className="relative">
                      {/* Review card (shorter) */}
                      <div
                        className={`min-h-[180px] rounded-[32px] border border-[#ffc83d] p-6 pb-12 transition-colors duration-1000 ease-in-out lg:p-10 lg:pb-14 ${
                          isActive
                            ? "bg-[#ffc83d] text-gray-900"
                            : "bg-white text-[#ffc83d]"
                        }`}
                      >
                        <p className="text-base leading-relaxed lg:text-xl">
                          {r.text}
                        </p>
                      </div>

                      {/* Profile box: top half over the card, bottom half hanging out */}
                      <div
                        className={`absolute bottom-0 left-6 flex w-fit translate-y-1/2 items-center gap-3 rounded-full py-2.5 pl-3 pr-8 transition-colors duration-1000 ease-in-out lg:left-10 ${
                          isActive
                            ? "bg-[#3a3a3a] text-white"
                            : "bg-[#fff6dd] text-gray-900"
                        }`}
                      >
                        {r.avatar ? (
                          <Image
                            src={r.avatar}
                            alt={r.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-300 text-gray-500">
                            <UserIcon className="h-6 w-6" />
                          </span>
                        )}
                        <div className="text-sm">
                          <p className="font-bold">{r.name}</p>
                          <p>{r.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mx-auto mt-2 max-w-[1100px] px-4">
            <SwiperScrollbar
              selector="reviews-scrollbar"
              start={pad(1)}
              end={pad(reviews.length)}
            />
          </div>
        </>
      ) : (
        <div className="h-[300px]" />
      )}
    </section>
  );
}
