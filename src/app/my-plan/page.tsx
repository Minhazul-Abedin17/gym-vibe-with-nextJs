
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  FiArrowRight,
  FiCheck,
  FiClock,
  FiStar,
  FiX,
} from "react-icons/fi";

import { FaFireFlameCurved } from "react-icons/fa6";

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
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const currentList = activeTab === "plan" ? plan : saved;

  // Sorting
  const sortedWorkouts = useMemo(() => {
    return [...currentList].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      return b.rating - a.rating;
    });
  }, [currentList, sortBy]);

  // Metrics are based on today's plan only
  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
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
          {/* Today's Plan */}
          <button
            onClick={() => {
              setActiveTab("plan");
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

          {/* Saved */}
          <button
            onClick={() => {
              setActiveTab("saved");
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

      {/* Sorting */}
      <div className="mt-6 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          aria-label="Sort workouts"
          className="rounded-full border border-white/10 bg-[#12141A] px-5 py-3 text-sm text-white outline-none transition focus:border-[#CCFF00]/50"
        >
          <option value="duration">Sort: Duration</option>
          <option value="calories">Sort: Calories</option>
          <option value="rating">Sort: Rating</option>
        </select>
      </div>

      {/* Workout list */}
      <section className="mt-6 space-y-4">
        {sortedWorkouts.length > 0 ? (
          sortedWorkouts.map((workout) => {
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
                <div className="flex w-full flex-col gap-2 sm:w-44 sm:shrink-0">
                  {/* View Details */}
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="flex w-full items-center justify-center rounded-full border border-white/15 px-4 py-2.5 text-xs font-bold text-white transition hover:border-[#CCFF00] hover:text-[#CCFF00]"
                  >
                    View Details
                  </Link>

                  {/* Mark as Done / Saved Remove */}
                  {activeTab === "plan" ? (
                    <button
                      onClick={() => markAsDone(workout.id)}
                      disabled={isDone}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#CCFF00] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FiCheck />
                      {isDone ? "Completed" : "Mark as Done"}
                    </button>
                  ) : (
                    <button
                      onClick={() => removeFromSaved(workout.id)}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-bold text-gray-300 transition hover:border-red-400 hover:text-red-400"
                    >
                      <FiX />
                      Remove
                    </button>
                  )}

                  {/* Remove from Plan */}
                  {activeTab === "plan" && (
                    <button
                      onClick={() => removeFromPlan(workout.id)}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-xs font-bold text-red-400 transition hover:border-red-400 hover:bg-red-500/10"
                    >
                      <FiX />
                      Remove
                    </button>
                  )}
                </div>
              </article>
            );
          })
        ) : (
          /* Empty State */
          <div className="rounded-3xl border border-dashed border-white/15 px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CCFF00]/10 text-[#CCFF00]">
              <FiCheck size={24} />
            </div>

            <h2 className="mt-5 font-oswald text-2xl font-bold text-white">
              NOTHING HERE YET
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              {activeTab === "plan"
                ? "Browse the workout library and add a workout to get started."
                : "Save a workout from the library to find it here later."}
            </p>

            <Link
              href="/workouts"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#CCFF00] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#b8e600]"
            >
              Go to workouts
              <FiArrowRight />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyPlanPage;
