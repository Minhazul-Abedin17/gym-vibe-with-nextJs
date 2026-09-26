import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0B0D10]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-7 sm:px-6 md:flex-row lg:px-8">

        <Link
          href="/workouts"
          className="flex items-center gap-2"
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={30}
            height={30}
          />

          <span className="font-oswald text-xl font-bold tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        <p className="text-center text-xs leading-6 text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;