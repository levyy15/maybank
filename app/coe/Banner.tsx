import Image from 'next/image';
import content from '@/data/content.json';

export default function Banner() {
  return (
    <section className="relative isolate flex min-h-[320px] items-center text-white md:min-h-[400px] lg:min-h-[460px] overflow-hidden rounded-b-[64px] bg-[#f4f4f4]">
      <Image
        src="/images/coe-banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover rounded-b-[64px] "
      />
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-10 lg:px-14 xl:px-20">
        <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
          {content['coe-banner-title']}
        </h1>
        <p className="mt-4 max-w-xl text-xs leading-relaxed text-white/90 sm:text-sm">
          {content['coe-banner-text']}
        </p>
      </div>
    </section>
  );
}