"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import content from "@/data/content.json";

const c = content as unknown as Record<string, string>;

type Panel = {
  tab: string;
  title: string;
  text: string;
  image: string;
  href: string;
  stats?: { value: string; from: string; label: string }[];
};

// One entry per tab. Personal keeps the original key names.
const panels: Panel[] = [
  {
    tab: "Personal",
    title: c["CentreYellowBox-title"],
    text: c["CentreYellowBox-text"],
    image: "/images/wallet.jpg",
    href: "/personal",
  },
  {
    tab: "Business",
    title: c["CentreYellowBox-business-title"],
    text: c["CentreYellowBox-business-text"],
    image: "/images/handlaptop.jpg",
    href: "/business",
  },
  {
    tab: "Global",
    title: c["CentreYellowBox-global-title"],
    text: c["CentreYellowBox-global-text"],
    image: "/images/group.jpg",
    href: "/global",
    stats: [1, 2, 3].map((n) => ({
      value: c[`CentreYellowBox-global-stat${n}-value`],
      from: c[`CentreYellowBox-global-stat${n}-from`],
      label: c[`CentreYellowBox-global-stat${n}-label`],
    })),
  },
];

const statsTab = panels.findIndex((p) => p.stats);

// Fills the outside of a rounded image corner with the box's yellow
const cornerFill = {
  background:
    "radial-gradient(circle at 0 100%, transparent 1.5rem, #ffc83d 1.5rem)",
};

// Shared by both layers so they move in sync
const motion = "duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]";

// Odometer: each digit is a strip of 0-9 that slides to the right number
function Roll({
  from,
  to,
  rolled,
}: {
  from: string;
  to: string;
  rolled: boolean;
}) {
  const current = rolled ? to : from;

  return (
    <span aria-hidden className="inline-flex tabular-nums">
      {to.split("").map((ch, i) => {
        if (!/\d/.test(ch)) return <span key={i}>{ch}</span>; // "+" or "M" stay still

        const digit = Number(current[i] ?? ch);

        return (
          <span
            key={i}
            className="inline-block h-[1.1em] overflow-hidden align-top"
          >
            <span
              className="flex flex-col transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{
                transform: `translateY(-${digit * 1.1}em)`,
                transitionDelay: `${i * 150}ms`, // digits land one after another
              }}
            >
              {Array.from({ length: 10 }, (_, n) => (
                <span
                  key={n}
                  className="flex h-[1.1em] items-center justify-center"
                >
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default function CentreYellowBox() {
  const [activeTab, setActiveTab] = useState(0);
  // The tab shown before the current one. Its picture stays fully visible
  // underneath while the new picture dissolves in on top of it.
  const [prevTab, setPrevTab] = useState(0);
  const [rolled, setRolled] = useState(false);

  const changeTab = (i: number) => {
    if (i === activeTab) return;
    setPrevTab(activeTab);
    setActiveTab(i);
  };

  // Phone / small tablet only: measure each text block, so the picture can
  // grow into the empty space under a shorter text (Personal, Business)
  // instead of leaving a gap. The box itself keeps the same height.
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [textHeights, setTextHeights] = useState<number[]>([]);

  useEffect(() => {
    const measure = () =>
      setTextHeights(textRefs.current.map((el) => el?.offsetHeight ?? 0));
    measure();
    const ro = new ResizeObserver(measure);
    textRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, []);

  const tallest = Math.max(0, ...textHeights);
  const activeHeight = textHeights[activeTab];
  const fitVars = (
    activeHeight
      ? {
          "--text-h": `${activeHeight}px`,
          "--extra-h": `${tallest - activeHeight}px`,
        }
      : {}
  ) as React.CSSProperties;

  useEffect(() => {
    const entering = activeTab === statsTab;
    const t = setTimeout(() => setRolled(entering), entering ? 450 : 700);
    return () => clearTimeout(t);
  }, [activeTab]);

  return (
    // Outer wrapper: no clipping classes, so the button never gets cut off
    <div
      className="group/box relative z-10 mx-auto -mt-10 mb-16 w-[92%]"
      style={fitVars}
    >
      {/* Layer 1: the yellow background. Only this changes width. */}
      <div
        aria-hidden
        className={`absolute left-1/2 top-0 bottom-0 w-full -translate-x-1/2 rounded-[3rem] bg-[#ffc83d] transition-[width,bottom] ${motion} lg:group-hover/box:-bottom-[8.7%] lg:group-hover/box:w-[108.7%]`}
      />

      {/* Layer 2: the content. It zooms with a transform, so nothing re-wraps. */}
      <div
        className={`relative origin-top transform-gpu px-4 pb-8 pt-8 transition-transform will-change-transform ${motion} lg:px-18 lg:group-hover/box:scale-[1.087]`}
      >
        {/* Tab switcher: light yellow pill, top middle */}
        <div className="flex justify-center">
          <div
            role="tablist"
            className="relative grid w-[20.625rem] max-w-full grid-cols-3 rounded-full bg-[#fff6dd] p-1.5 sm:w-[26.25rem]"
          >
            <span
              aria-hidden
              className="absolute bottom-1.5 left-1.5 top-1.5 w-[calc((100%-0.75rem)/3)] rounded-full bg-[#ffc83d] transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${activeTab * 100}%)` }}
            />

            {panels.map((p, i) => (
              <button
                key={p.tab}
                type="button"
                role="tab"
                aria-selected={activeTab === i}
                onClick={() => changeTab(i)}
                className="relative z-10 rounded-full py-3 text-sm font-medium text-[#373737]"
              >
                {p.tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-[100rem] max-md:h-[var(--text-h)] max-md:overflow-hidden max-md:transition-[height] max-md:duration-700 max-md:ease-in-out">
          {panels.map((p, i) => (
            <div
              key={p.tab}
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              aria-hidden={activeTab !== i}
              className={`col-start-1 row-start-1 grid self-start content-start gap-4 transition-[opacity,visibility] duration-700 ease-in-out lg:grid-cols-2 lg:gap-12 ${
                activeTab === i
                  ? "visible opacity-100"
                  : "pointer-events-none invisible opacity-0"
              }`}
            >
              <h2 className="text-2xl font-medium leading-tight text-[#373737] sm:text-[2rem] xl:text-[2.5rem]">
                {p.title}
              </h2>

              <div>
                <p className="text-xs leading-relaxed text-[#373737] lg:pt-2 lg:text-sm">
                  {p.text}
                </p>

                {p.stats && (
                  <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[#373737] sm:gap-4">
                    {p.stats.map((s) => (
                      <div key={s.label}>
                        <p
                          aria-label={s.value}
                          className="text-3xl font-medium leading-none sm:text-5xl"
                        >
                          <Roll from={s.from} to={s.value} rolled={rolled} />
                        </p>
                        <p className="mt-2 text-xs sm:text-sm">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* IMAGE: the notch and button never move. The new picture dissolves in
            on top of the old one (the old one stays fully visible underneath). */}
        <div className="relative mx-auto mt-8 w-full max-w-[100rem]">
          <div className="relative isolate h-[calc(15rem+var(--extra-h,0px))] overflow-hidden rounded-3xl transition-[height] duration-700 ease-in-out sm:h-[calc(18.75rem+var(--extra-h,0px))] md:h-[18.75rem] lg:h-[21.875rem]">
            {panels.map((p, i) => (
              <Image
                key={p.tab}
                src={p.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 85vw, 100vw"
                className={`object-cover ${
                  i === activeTab
                    ? "z-20 opacity-100 transition-opacity duration-700 ease-in-out"
                    : i === prevTab
                      ? "z-10 opacity-100"
                      : "z-0 opacity-0"
                }`}
              />
            ))}
          </div>

          {/* The notch: always starts at the exact center and runs to the right edge */}
          <div className="absolute right-0 -top-px left-1/2 h-[calc(3.25rem+1px)] rounded-bl-3xl bg-[#ffc83d]" />
          {/* Corner patch just left of the notch (25px so no hairline shows) */}
          <div
            aria-hidden
            className="absolute -top-px left-[calc(50%-1.5rem)] h-[calc(1.5rem+1px)] w-[calc(1.5rem+1px)]"
            style={cornerFill}
          />

          {/* Learn More: same look on every tab, so there is one button and only its link changes */}
          <div className="absolute left-1/2 top-0 flex h-[3.25rem] -translate-y-4 items-center pl-2 sm:-translate-y-5 sm:pl-6">
            {" "}
            <Link
              href={panels[activeTab].href}
              className="group flex items-center"
            >
              <span className="flex h-9 items-center whitespace-nowrap rounded-full bg-black px-3.5 text-xs font-medium text-[#ffc83d] sm:h-11 sm:px-5 sm:text-sm">
                Learn More
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-[#ffc83d] sm:h-11 sm:w-11">
                <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px sm:h-4 sm:w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
