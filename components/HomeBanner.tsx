import Image from "next/image";
import BannerSlider from "./BannerSlider";
import content from "@/data/content.json";

export default function HomeBanner() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem-9rem)] max-md:min-h-0 text-white md:min-h-[720px] lg:min-h-[min(calc(100svh-5rem-9rem),760px)] xl:min-h-[calc(100svh-5rem-9rem)]">
      {/* Background: runs past the banner so it sits underneath the yellow box */}
      <div className="absolute inset-x-0 top-0 -bottom-[33vh] -z-10 overflow-hidden">
        {/* Mobile Image */}
        <Image
          src="/images/handholdbanner2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top md:hidden"
        />

        {/* Desktop Image */}
        <Image
          src="/images/handholdbanner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center md:block"
        />
        
        <div className="absolute inset-0 bg-black/20" />
      </div>

<div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-10 pl-4 md:pr-0 pb-26 pt-18 md:justify-center md:gap-20 md:px-10 lg:flex-row lg:justify-between lg:gap-10 lg:px-14 lg:pb-20 lg:pt-25 xl:px-20">        {/* Text: tablet leans slightly left; desktop sits a bit lower and further from the edge */}
        <div className="md:max-w-[60%] lg:max-w-[48%] lg:self-start">
          <h1 className="text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl">
            {" "}
            {content["homepage-banner-title"]}
          </h1>
          <p className="mt-4 max-w-lg text-[10px] font-light leading-relaxed text-white/90 sm:text-xs">
            {" "}
            {content["homepage-banner-text"]}
          </p>
        </div>

        {/* Slider box: tablet sits slightly right; desktop is a bit higher and further left */}
        <div className="overflow-hidden md:ml-auto md:w-[68%] lg:absolute lg:bottom-28 lg:right-0 lg:ml-0 lg:w-1/2 lg:pl-[0%]">
          <BannerSlider />
        </div>
      </div>
    </section>
  );
}
