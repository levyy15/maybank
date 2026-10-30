type Props = {
  selector: string; // unique class name for this slider's bar
  start?: string; // text at the front of the bar, e.g. "01"
  end?: string; // text at the end of the bar, e.g. "06"
};

export default function SwiperScrollbar({ selector, start, end }: Props) {
  return (
    <div className="mt-8 flex items-center gap-4 text-sm font-bold text-gray-800">
      {start && <span>{start}</span>}

      {/* Swiper draws the draggable yellow thumb inside this element */}
      <div
        className={`${selector} relative h-1.5 flex-1 cursor-pointer rounded-full bg-[#fff3cc] [--swiper-scrollbar-drag-bg-color:#ffc83d] [--swiper-scrollbar-border-radius:9999px]`}
      />

      {end && <span>{end}</span>}
    </div>
  );
}