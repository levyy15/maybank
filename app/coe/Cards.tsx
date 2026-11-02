import Link from 'next/link';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import content from '@/data/content.json';
import HoverNotch from '@/components/shared/HoverNotch';

const c = content as unknown as Record<string, string>;

// The page background the notch cuts through to
const PAGE_BG = '#f4f4f4';

const colsClass = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' } as const;

type Props = {
  section: number; // reads coe-title{section} and coe-text{section}
  start: number; // first box number
  count: number; // how many boxes
  cols: 3 | 4; // columns on desktop
};

export default function Cards({ section, start, count, cols }: Props) {
  const boxes = Array.from({ length: count }, (_, i) => ({
    id: start + i,
    title: c[`coe-box${start + i}-title`],
    text: c[`coe-box${start + i}-text`],
  }));

  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 lg:mt-20 lg:px-8">
      <h2 className="text-3xl font-semibold text-gray-800 lg:text-5xl">
        {c[`coe-title${section}`]}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 lg:text-base">
        {c[`coe-text${section}`]}
      </p>

      <div className={`mt-8 grid gap-4 sm:grid-cols-2 lg:gap-6 ${colsClass[cols]}`}>
        {boxes.map((box) => (
          <Link
            key={box.id}
            href="#"
            className="group relative flex min-h-[12.5rem] flex-col rounded-3xl bg-white p-6 pb-20 transition-colors duration-300 hover:bg-[#ffc83d]"
          >
            <h3 className="text-lg font-semibold text-gray-800">{box.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{box.text}</p>

            {/* Notch: same smooth fade-in/fade-out as the homepage cards */}
            <HoverNotch color={PAGE_BG} />
          </Link>
        ))}
      </div>

      {/* View all: same black button as Expand Your Knowledge, centered */}
      <div className="mt-10 flex justify-center">
        <Link href="#" className="group flex items-center">
          <span className="flex h-11 items-center whitespace-nowrap rounded-full bg-black px-20 text-sm font-medium text-[#ffc83d]">
            View all
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-[#ffc83d]">
            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
          </span>
        </Link>
      </div>
    </section>
  );
}