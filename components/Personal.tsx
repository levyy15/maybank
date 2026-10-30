import Link from "next/link";
import { CreditCardIcon } from "@heroicons/react/24/outline";

// Any Heroicon can be used as an icon
type IconType = typeof CreditCardIcon;

type LinkItem = {
  label: string;
  href: string;
  icon: IconType;
};

type Column = {
  title?: string; // column 1 has no title
  links: LinkItem[];
};

const columns: Column[] = [
  {
    // No title for the first column
    links: [
      { label: "Saving Account", href: "#", icon: CreditCardIcon },
      { label: "Current Account", href: "#", icon: CreditCardIcon },
      { label: "Deposits/AI", href: "#", icon: CreditCardIcon },
      { label: "Terms", href: "#", icon: CreditCardIcon },
      { label: "Foreign", href: "#", icon: CreditCardIcon },
      { label: "Mudarabah", href: "#", icon: CreditCardIcon },
      { label: "Cards", href: "#", icon: CreditCardIcon },
    ],
  },
  {
    title: "FINANCING",
    links: [
      { label: "Property", href: "#", icon: CreditCardIcon },
      { label: "Vehicle", href: "#", icon: CreditCardIcon },
      { label: "Personal", href: "#", icon: CreditCardIcon },
      { label: "Unit Trust", href: "#", icon: CreditCardIcon },
      { label: "Education", href: "#", icon: CreditCardIcon },
    ],
  },
  {
    title: "INSURANCE & TAKAFUL",
    links: [
      { label: "Personal Accident", href: "#", icon: CreditCardIcon },
      { label: "Motor", href: "#", icon: CreditCardIcon },
      { label: "Home", href: "#", icon: CreditCardIcon },
    ],
  },
  {
    title: "INVESTMENT",
    links: [
      { label: "SHARE TRADING", href: "#", icon: CreditCardIcon },
      { label: "Wasiat", href: "#", icon: CreditCardIcon },
      { label: "Foreign Currency", href: "#", icon: CreditCardIcon },
      { label: "Multi-Assest Investment Account-i", href: "#", icon: CreditCardIcon },
      { label: "Maybank Islamic Gold Account-i", href: "#", icon: CreditCardIcon },
      { label: "ESOS/IPO Financing-i", href: "#", icon: CreditCardIcon },
    ],
  },
  {
    title: "ISLAMIC WEALTH MANAGEMENT",
    links: [
      { label: "Wealth Creation", href: "#", icon: CreditCardIcon },
      { label: "Wealth Accumulation", href: "#", icon: CreditCardIcon },
      { label: "Wealth Preservation", href: "#", icon: CreditCardIcon },
      { label: "Wealth Purification", href: "#", icon: CreditCardIcon },
      { label: "Wealth Distribution", href: "#", icon: CreditCardIcon },
    ],
  },
];

type Props = {
  onNavigate: () => void;
};

export default function Personal({ onNavigate }: Props) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 px-4 py-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 lg:px-8 lg:py-10">
      {columns.map((col, i) => (
        <div key={col.title ?? `col-${i}`}>
          {col.title && (
            <h3 className="mb-4 text-sm font-bold text-gray-500">
              {col.title}
            </h3>
          )}

          <ul className="space-y-1">
            {col.links.map((link) => {
              const Icon = link.icon;

              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className="group -mx-3 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-800 transition-all duration-200  hover:bg-[#ffc83d]/20 hover:text-[#ffc83d]"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-gray-500 transition-colors duration-200 group-hover:text-[#ffc83d]" />
                    <span
                      data-text={link.label}
                      className="inline-block before:invisible before:block before:h-0 before:overflow-hidden before:font-bold before:content-[attr(data-text)]"
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
