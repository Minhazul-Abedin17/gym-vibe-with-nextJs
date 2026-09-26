
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  FiArrowLeft,
  FiCheck,
  FiClock,
  FiPlus,
  FiStar,
  FiBookmark,
} from "react-icons/fi";

import { FaFireFlameCurved } from "react-icons/fa6";

import { IWork } from "@/app/workout-type";
import { useWorkout } from "@/app/context/WorkoutContext";

const WorkoutDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [workout, setWorkout] = useState<IWork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { plan, saved, doneIds, addToPlan, saveWorkout } =
    useWorkout();

  // Fetch workout details
  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchWorkout = async () => {
      try {
        setLoading(true);
        setError("");
        setWorkout(null);

        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const result = await response.json();
        const data = result.workout ?? result.data ?? result;

        if (!data || !data.id) {
          throw new Error("Invalid workout data");
        }

        setWorkout(data as IWork);
      } catch (err) {
        if (
          err instanceof Error &&
          err.name === "AbortError"
        ) {
          return;
        }

        console.error("Workout details error:", err);
        setError("Workout not found. Please try another workout.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchWorkout();

    return () => controller.abort();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <span className="loading loading-spinner loading-lg text-[#CCFF00]" />
        <p className="text-sm text-gray-400">
          Loading workout details…
        </p>
      </main>
    );
  }

  // Error state
  if (error || !workout) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="font-oswald text-4xl font-bold text-white">
          WORKOUT NOT FOUND
        </h1>

        <p className="mt-3 text-gray-400">
          {error || "This workout does not exist."}
        </p>

        <Link
          href="/workouts"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#CCFF00] px-6 py-3 font-bold text-black transition hover:bg-[#b8e600]"
        >
          <FiArrowLeft />
          Back to workouts
        </Link>
      </main>
    );
  }

  const isInPlan = plan.some(
    (item) => item.id === workout.id
  );

  const isSaved = saved.some(
    (item) => item.id === workout.id
  );

  const isDone = doneIds.includes(workout.id);
  const isPlanFull = plan.length >= 5;

  const specifications = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", String(workout.sets)],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.caloriesBurned} kcal`],
    ["RATING", String(workout.rating)],
  ];

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">

      {/* Back navigation */}
      <Link
        href="/workouts"
        className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-[#CCFF00]"
      >
        <FiArrowLeft />
        Back to workouts
      </Link>

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">

        {/* LEFT: Workout image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#12141A] shadow-2xl shadow-black/20 sm:aspect-[5/4] lg:sticky lg:top-28 lg:aspect-[4/5]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-[#CCFF00]/[0.03]" />

          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 52vw"
            className="object-contain p-5 sm:p-8 lg:p-10"
          />

          {/* Image caption */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-12 sm:px-7 sm:pb-7">
            <p className="text-xs font-bold tracking-[0.2em] text-[#CCFF00]">
              FITLOG / WORKOUT
            </p>

            <p className="mt-1 font-oswald text-lg font-semibold uppercase tracking-wide text-white">
              {workout.name}
            </p>
          </div>
        </div>

        {/* RIGHT: Workout information */}
        <div className="min-w-0 lg:pt-2">

          {/* Category tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-[#CCFF00] px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-black"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-oswald text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl xl:text-6xl">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            {workout.description}
          </p>

          {/* Quick stats */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-white/10 py-4 text-xs font-medium text-gray-300 sm:gap-x-7">
            <span className="flex items-center gap-2">
              <FiClock className="text-[#CCFF00]" size={16} />
              {workout.duration} min
            </span>

            <span className="flex items-center gap-2">
              <FaFireFlameCurved
                className="text-[#CCFF00]"
                size={15}
              />
              {workout.caloriesBurned} kcal
            </span>

            <span className="flex items-center gap-2">
              <FiStar className="text-[#CCFF00]" size={16} />
              {workout.rating}
            </span>
          </div>

          {/* Key specifications */}
          <section className="mt-7 rounded-2xl border border-white/10 bg-[#12141A] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-oswald text-xl font-bold tracking-wide text-white">
                KEY SPECS
              </h2>

              <span className="text-[10px] font-bold tracking-[0.15em] text-gray-500">
                OVERVIEW
              </span>
            </div>

            <div className="mt-4 divide-y divide-white/[0.07]">
              {specifications.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 py-3.5"
                >
                  <span className="shrink-0 text-[10px] font-bold tracking-[0.13em] text-gray-500 sm:text-xs">
                    {label}
                  </span>

                  <span className="text-right text-sm font-semibold text-gray-100">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Instructions */}
          <section className="mt-8">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-oswald text-2xl font-bold tracking-wide text-white">
                INSTRUCTIONS
              </h2>

              <span className="text-xs text-gray-500">
                {workout.instructions.length} STEPS
              </span>
            </div>

            <ol className="mt-5 space-y-5">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#CCFF00]/20 bg-[#CCFF00]/10 font-oswald text-sm font-bold text-[#CCFF00]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="min-w-0 pt-1 text-sm leading-7 text-gray-400">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Action buttons */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={() => addToPlan(workout)}
              disabled={isInPlan || isPlanFull}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#CCFF00] px-5 py-3 text-sm font-extrabold text-black transition hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isInPlan ? (
                <>
                  <FiCheck size={18} />
                  Added to plan
                </>
              ) : (
                <>
                  <FiPlus size={18} />
                  {isPlanFull
                    ? "Plan is full"
                    : "Add to today's plan"}
                </>
              )}
            </button>

            <button
              onClick={() => saveWorkout(workout)}
              disabled={isSaved}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-5 py-3 text-sm font-bold text-white transition hover:border-[#CCFF00]/50 hover:bg-[#CCFF00]/[0.05] hover:text-[#CCFF00] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaved ? (
                <>
                  <FiCheck size={17} />
                  Saved
                </>
              ) : (
                <>
                  <FiBookmark size={17} />
                  Save for later
                </>
              )}
            </button>
          </div>

          {/* Completion status */}
          {isDone && (
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#CCFF00]/20 bg-[#CCFF00]/[0.05] p-4">
              <FiCheck className="shrink-0 text-[#CCFF00]" size={18} />

              <p className="text-sm text-gray-300">
                You have completed this workout.
              </p>
            </div>
          )}

          <p className="mt-5 text-center text-[10px] font-medium tracking-[0.15em] text-gray-600">
            TRAIN WITH INTENT. LOG EVERY SET.
          </p>
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetailsPage;