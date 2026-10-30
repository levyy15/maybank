"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import content from "@/data/content.json";

const tabs = ["Personal", "Business", "Global"];

// Fills the outside of a rounded image corner with the box's yellow
const cornerFill = {
  background:
    "radial-gradient(circle at 0 100%, transparent 24px, #ffc83d 24px)",
};

// Shared by both layers so they move in sync
const motion = "duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]";

export default function CentreYellowBox() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    // Outer wrapper: Kept clean without clipping classes so the button never gets cut off
    <div className="group/box relative z-10 mx-auto -mt-10 mb-16 w-[92%]">
      {/* Layer 1: the yellow background. Only this changes width. */}
      <div
        aria-hidden
        className={`absolute left-1/2 top-0 bottom-0 w-full -translate-x-1/2 rounded-[48px] bg-[#ffc83d] transition-[width,bottom] ${motion} lg:group-hover/box:-bottom-[8.7%] lg:group-hover/box:w-[108.7%]`}
      />

      {/* Layer 2: the content. It zooms with a transform, so nothing re-wraps. */}
      <div
        className={`relative origin-top transform-gpu px-4 pb-8 pt-8 transition-transform will-change-transform ${motion} lg:px-18 lg:group-hover/box:scale-[1.087]`}
      >

        {/* Tab switcher: light yellow pill, top middle */}
        <div className="flex justify-center">
          <div
            role="tablist"
            className="relative grid w-[330px] max-w-full grid-cols-3 rounded-full bg-[#fff6dd] p-1.5 sm:w-[420px]"
          >
            {/* Sliding highlight behind the active tab */}
            <span
              aria-hidden
              className="absolute bottom-1.5 left-1.5 top-1.5 w-[calc((100%-0.75rem)/3)] rounded-full bg-[#ffc83d] transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${activeTab * 100}%)` }}
            />

            {tabs.map((tab, i) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === i}
                onClick={() => setActiveTab(i)}
                className="relative z-10 rounded-full py-3 text-sm font-medium text-gray-00"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Personal tab */}
        {activeTab === 0 && (
          <>
            {/* Title (left) and text (right) */}
            <div className="mx-auto mt-10 grid max-w-7xl gap-4 lg:grid-cols-2 lg:gap-12">
              <h2 className="text-2xl font-medium leading-tight text-[#373737] sm:text-[32px] xl:text-[40px]">
                {content["CentreYellowBox-title"]}
              </h2>
              <p className="text-sm leading-relaxed text-[#373737] lg:pt-2 lg:text-base">
                {content["CentreYellowBox-text"]}
              </p>
            </div>

            {/* Image with the notch cut out of its top */}
            <div className="relative mx-auto mt-8 max-w-7xl">
              <div className="relative h-[240px] overflow-hidden rounded-[24px] sm:h-[300px] lg:h-[350px]">
                <Image
                  src="/images/wallet.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover"
                />
              </div>

              {/* The notch: runs to the right edge. Starts at 30% on phone/tablet, at the center on desktop. */}
              <div className="absolute right-0 top-0 left-1/2 h-[52px] rounded-bl-[24px] bg-[#ffc83d]" />

              {/* Corner patch: sits just left of the notch's left edge */}
              <div
                aria-hidden
                className="absolute top-0 left-[calc(50%-1.5rem)] h-6 w-6"
                style={cornerFill}
              />

              {/* Learn More: Scaled down on phone/tablet and perfectly positioned to stay inside the border */}
              <Link
                href="/personal"
                className="group absolute -top-2 left-[calc(50%+0.5rem)] right-auto flex items-center sm:left-[calc(50%+1.5rem)]"
              >
                <span className="flex h-9 items-center whitespace-nowrap rounded-full bg-black px-3.5 text-xs font-medium text-[#ffc83d] sm:h-11 sm:px-5 sm:text-sm">
                  Learn More
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-[#ffc83d] sm:h-11 sm:w-11">
                  <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px sm:h-4 sm:w-4" />
                </span>
              </Link>

            </div>
          </>
        )}

        {/* Business tab and Global tab: blank for now */}
        {activeTab !== 0 && <div className="min-h-[420px]" />}
      </div>
    </div>
  );
}
