import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

export default function HoverNotch({ color = '#fff' }: { color?: string }) {
  // The curve gets a 1px soft edge so it doesn't look jagged
  const fill = {
    background: `radial-gradient(circle at 0 0, transparent 1.5rem, ${color} calc(1.5rem + 1px))`,
  };

  return (
    <div className="pointer-events-none absolute bottom-0 right-0 h-[4.75rem] w-[4.75rem] origin-bottom-right translate-x-2 translate-y-2 scale-75 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
      {/* The pieces overlap each other (and the card edge) by 1px,
          so no thin line of the image shows through between them */}
      <div className="absolute left-0 top-0 -bottom-px -right-px rounded-tl-[1.5rem]" style={{ backgroundColor: color }} />
      <div aria-hidden className="absolute bottom-[calc(100%-1px)] -right-px h-[calc(1.5rem+1px)] w-[calc(1.5rem+1px)]" style={fill} />
      <div aria-hidden className="absolute right-[calc(100%-1px)] -bottom-px h-[calc(1.5rem+1px)] w-[calc(1.5rem+1px)]" style={fill} />
      <span className="absolute bottom-0 right-0 flex h-[3.75rem] w-[3.75rem] origin-bottom-right scale-75 items-center justify-center rounded-full bg-black text-[#ffc83d] transition-transform duration-500 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100">
        <ArrowUpRightIcon className="h-5 w-5" />
      </span>
    </div>
  );
}