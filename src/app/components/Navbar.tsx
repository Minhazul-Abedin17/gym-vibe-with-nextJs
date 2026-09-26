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
  const workoutActive = pathname === "/" || pathname.startsWith("/workouts");
  const planActive = pathname.startsWith("/my-plan");
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0D10]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/workouts"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2"
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={36}
            height={36}
          />
          <span className="font-oswald text-xl font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/workouts"
            className={`rounded-full px-5 py-2 text-sm font-semibold ${
              workoutActive
                ? "bg-[#CCFF00] text-black"
                : "text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2 text-sm font-semibold ${
              planActive
                ? "bg-[#CCFF00] text-black"
                : "text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#CCFF00] px-3 py-2 text-xs font-bold text-black"
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white/30 px-3 py-2 text-xs font-bold text-white"
          >
            Saved {saved.length}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0B0D10] px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <Link
              href="/workouts"
              onClick={() => setMenuOpen(false)}
              className={`rounded-full px-5 py-2 text-sm font-semibold ${
                workoutActive
                  ? "bg-[#CCFF00] text-black"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className={`rounded-full px-5 py-2 text-sm font-semibold ${
                planActive
                  ? "bg-[#CCFF00] text-black"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
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
