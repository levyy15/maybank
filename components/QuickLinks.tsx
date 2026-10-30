import Link from "next/link";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import content from "@/data/content.json";
import HoverNotch from "@/components/shared/HoverNotch";

const c = content as unknown as Record<string, string>;

const boxes = [1, 2, 3].map((n) => ({
  id: n,
  title: c[`link-box${n}-title`],
  text: c[`link-box${n}-text`],
  href: "#",
}));

export default function QuickLinks() {
  return (
    <section className="bg-[#ffc83d] py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="mb-8 text-3xl font-medium text-[#373737] lg:text-5xl">
          {c["Link-title"]}
        </h2>

        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {boxes.map((box) => (
            <Link
              key={box.id}
              href={box.href}
              className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-4xl bg-[#fff6dd] p-6 text-black transition-transform duration-300 hover:-translate-y-px lg:min-h-[260px] lg:p-8"
            >
              {/* Icon: top left */}
              <CreditCardIcon className="h-8 w-8" />

              {/* Title and text: centered in the remaining space */}
              <div className="my-auto py-4">
                <h3 className="text-xl text-[#373737] lg:text-2xl">
                  {box.title}
                </h3>
                <p className="mt-4 text-xs text-[#373737] lg:text-sm">{box.text}</p>
              </div>

              {/* Black notch, appears bottom-right on hover */}
              <HoverNotch color="#ffc83d" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
