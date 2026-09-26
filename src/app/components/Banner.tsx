import Image from "next/image";

const Banner = () => {
  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl bg-[#15171D] px-6 py-10 sm:px-10 lg:flex-row lg:px-14 lg:py-12">
        <div className="w-full lg:w-1/2">
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#CCFF00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-oswald text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-6 text-[#9CA3AF] sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-7 inline-flex items-center rounded-full bg-[#CCFF00] px-5 py-3 text-sm font-extrabold text-black transition hover:bg-[#b8e600]"
          >
            BROWSE WORKOUTS
          </a>
        </div>
        <div className="relative h-[240px] w-full sm:h-[320px] lg:h-[360px] lg:w-1/2">
          <Image
            src="/assets/banner.png"
            alt="Workout training"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
