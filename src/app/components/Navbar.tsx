"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import { useWorkout } from "@/app/context/WorkoutContext";

const Navbar = () => {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();
  const [menuOpen, setMenuOpen] = useState(false);

  const isWorkoutActive =
    pathname === "/" || pathname.startsWith("/workouts");

  const isPlanActive = pathname.startsWith("/my-plan");

  const navLink = (active: boolean) =>
    `rounded-full px-5 py-2 text-sm font-semibold transition ${
      active
        ? "bg-[#CCFF00] text-black"
        : "text-gray-400 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0D10]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/workouts"
          className="flex shrink-0 items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={36}
            height={36}
            className="object-contain"
          />

          <span className="font-oswald text-xl font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/workouts"
            className={navLink(isWorkoutActive)}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={navLink(isPlanActive)}
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#CCFF00] px-3 py-2 text-xs font-bold text-black transition hover:bg-[#b8e600]"
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white/30 px-3 py-2 text-xs font-bold text-white transition hover:border-[#CCFF00]"
          >
            Saved {saved.length}
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0B0D10] px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <Link
              href="/workouts"
              onClick={() => setMenuOpen(false)}
              className={navLink(isWorkoutActive)}
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className={navLink(isPlanActive)}
            >
              My Plan
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;