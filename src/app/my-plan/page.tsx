"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  FiArrowRight,
  FiCheck,
  FiClock,
  FiSearch,
  FiStar,
  FiX,
} from "react-icons/fi";

import { FaFireFlameCurved } from "react-icons/fa6";

import { IWork } from "@/app/workout-type";
import { useWorkout } from "@/app/context/WorkoutContext";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

const MyPlanPage = () => {
  const {
    plan,
    saved,
    doneIds,
    isLoaded,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  } = useWorkout();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const currentList = activeTab === "plan" ? plan : saved;

  // Search and sorting
  const filteredWorkouts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...currentList]
      .filter((workout) => {
        const searchableText = [
          workout.name,
          workout.equipment,
          ...workout.muscleGroups,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .sort((a, b) => {
        if (sortBy === "duration") {
          return a.duration - b.duration;
        }

        if (sortBy === "calories") {
          return b.caloriesBurned - a.caloriesBurned;
        }

        return b.rating - a.rating;
      });
  }, [currentList, search, sortBy]);

  // Metrics are based on today's plan only
  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  if (!isLoaded) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <span className="loading loading-spinner loading-lg text-[#CCFF00]" />
        <p className="text-sm text-gray-400">Loading workouts…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#CCFF00]">
            YOUR TRAINING LOG
          </p>

          <h1 className="font-oswald text-4xl font-bold uppercase text-white sm:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <Link
          href="/workouts#library"
          className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#CCFF00] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#b8e600] sm:self-auto"
        >
          Browse workouts
          <FiArrowRight />
        </Link>
      </div>

      {/* Metrics */}
      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: "EXERCISES",
            value: plan.length,
            icon: <FiCheck />,
          },
          {
            label: "MINUTES",
            value: totalMinutes,
            icon: <FiClock />,
          },
          {
            label: "CALORIES",
            value: totalCalories,
            icon: <FaFireFlameCurved />,
          },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-white/10 bg-[#12141A] p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold tracking-widest text-gray-500">
                {metric.label}
              </p>

              <span className="text-[#CCFF00]">{metric.icon}</span>
            </div>

            <p className="mt-4 font-oswald text-4xl font-bold text-white">
              {metric.value}
            </p>
          </div>
        ))}
      </section>

      {/* Tabs */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setActiveTab("plan");
              setSearch("");
            }}
            className={`border-b-2 px-4 py-3 text-sm font-bold transition ${
              activeTab === "plan"
                ? "border-[#CCFF00] text-[#CCFF00]"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            Today's Plan
            <span className="ml-2 text-xs">{plan.length}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("saved");
              setSearch("");
            }}
            className={`border-b-2 px-4 py-3 text-sm font-bold transition ${
              activeTab === "saved"
                ? "border-[#CCFF00] text-[#CCFF00]"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            Saved
            <span className="ml-2 text-xs">{saved.length}</span>
          </button>
        </div>
      </div>

      {/* Search and sorting */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workouts or muscle groups..."
            className="w-full rounded-full border border-white/10 bg-[#12141A] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#CCFF00]/50"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          aria-label="Sort workouts"
          className="rounded-full border border-white/10 bg-[#12141A] px-5 py-3 text-sm text-white outline-none focus:border-[#CCFF00]/50"
        >
          <option value="duration">Sort: Duration</option>
          <option value="calories">Sort: Calories</option>
          <option value="rating">Sort: Rating</option>
        </select>
      </div>

      {/* Workout list */}
      <section className="mt-6 space-y-4">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => {
            const isDone = doneIds.includes(workout.id);

            return (
              <article
                key={workout.id}
                className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#12141A] p-4 transition hover:border-white/20 sm:flex-row sm:items-center sm:p-5"
              >
                {/* Thumbnail */}
                <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-[#0B0D10] sm:h-32 sm:w-40">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 160px"
                    className="object-contain p-2"
                  />
                </div>

                {/* Workout details */}
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {workout.muscleGroups.map((group) => (
                      <span
                        key={group}
                        className="rounded-full bg-[#CCFF00]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#CCFF00]"
                      >
                        {group}
                      </span>
                    ))}

                    {isDone && activeTab === "plan" && (
                      <span className="rounded-full border border-[#CCFF00]/30 px-2.5 py-1 text-[10px] font-bold text-[#CCFF00]">
                        COMPLETED
                      </span>
                    )}
                  </div>

                  <h2 className="font-oswald text-xl font-bold uppercase text-white sm:text-2xl">
                    {workout.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {workout.equipment}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <FiClock />
                      {workout.duration} min
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FaFireFlameCurved />
                      {workout.caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-1.5">
                      <FiStar />
                      {workout.rating}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 sm:w-44 sm:shrink-0 sm:flex-col">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="flex flex-1 items-center justify-center rounded-full border border-white/15 px-4 py-2.5 text-xs font-bold text-white transition hover:border-[#CCFF00] hover:text-[#CCFF00] sm:w-full"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" ? (
                    <button
                      onClick={() => markAsDone(workout.id)}
                      disabled={isDone}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#CCFF00] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-50 sm:w-full"
                    >
                      <FiCheck />
                      {isDone ? "Completed" : "Mark as Done"}
                    </button>
                  ) : (
                    <button
                      onClick={() => removeFromSaved(workout.id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-bold text-gray-300 transition hover:border-red-400 hover:text-red-400 sm:w-full"
                    >
                      <FiX />
                      Remove
                    </button>
                  )}

                  {activeTab === "plan" && (
                    <button
                      onClick={() => removeFromPlan(workout.id)}
                      aria-label={`Remove ${workout.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray-500 transition hover:border-red-400 hover:text-red-400 sm:absolute sm:translate-x-[84px] sm:-translate-y-[0px]"
                    >
                      <FiX />
                    </button>
                  )}
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CCFF00]/10 text-[#CCFF00]">
              <FiSearch size={24} />
            </div>

            <h2 className="mt-5 font-oswald text-2xl font-bold text-white">
              {search ? "NO MATCHES FOUND" : "NOTHING HERE YET"}
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              {search
                ? "Try another workout name, equipment, or muscle group."
                : activeTab === "plan"
                  ? "Browse the library and add a lift to get today moving."
                  : "Save a workout from the library to find it here later."}
            </p>

            {search ? (
              <button
                onClick={() => setSearch("")}
                className="mt-6 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white hover:border-[#CCFF00]"
              >
                Clear search
              </button>
            ) : (
              <Link
                href="/workouts"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#CCFF00] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#b8e600]"
              >
                Go to workouts
                <FiArrowRight />
              </Link>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default MyPlanPage;
