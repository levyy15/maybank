import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

export default function HoverNotch({ color = '#fff' }: { color?: string }) {
  const fill = {
    background: `radial-gradient(circle at 0 0, transparent 24px, ${color} 24px)`,
  };

  return (
    <div className="pointer-events-none absolute bottom-0 right-0 h-[76px] w-[76px] origin-bottom-right scale-90 opacity-0 transition duration-300 ease-out group-hover:scale-100 group-hover:opacity-100">
      <div className="absolute inset-0 rounded-tl-[24px]" style={{ backgroundColor: color }} />
      <div aria-hidden className="absolute bottom-full right-0 h-6 w-6" style={fill} />
      <div aria-hidden className="absolute bottom-0 right-full h-6 w-6" style={fill} />
      <span className="absolute bottom-0 right-0 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-black text-[#ffc83d]">
        <ArrowUpRightIcon className="h-5 w-5" />
      </span>
    </div>
  );
}