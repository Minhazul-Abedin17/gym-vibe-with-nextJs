"use client";
import { useState } from "react";
import { useWorkout } from "@/app/context/WorkoutContext";
import { IWork } from "@/app/workout-type";
import PlanStats from "./PlanStats";
import WorkoutItem from "./WorkoutItem";
import EmptyState from "./EmptyState";

const MyPlanPage = () => {
  const { plan, saved, doneIds, isLoaded, markAsDone, removeFromPlan, removeFromSaved } = useWorkout();
  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const totalMinutes = plan.reduce(
    (total: number, workout: IWork) => total + workout.duration, 0
  );
  const totalCalories = plan.reduce(
    (total: number, workout: IWork) => total + workout.caloriesBurned, 0
  );
  if (!isLoaded) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
        <span className="loading loading-spinner loading-lg text-[#CCFF00]" />
        <p className="text-sm text-gray-400">Loading workouts…</p>
      </main>
    );
  }
  const workouts: IWork[] = activeTab === "plan" ? [...plan] : [...saved];

  if (sortBy === "duration") {
    workouts.sort((a, b) => a.duration - b.duration);
  }
  if (sortBy === "calories") {
    workouts.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
  }
  if (sortBy === "rating") {
    workouts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }
  return (
    <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="font-oswald text-4xl font-bold uppercase text-white sm:text-5xl">
          MY PLAN
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>
      <PlanStats
        planLength={plan.length}
        totalMinutes={totalMinutes}
        totalCalories={totalCalories}
      />
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("plan")}
            className={`border-b-2 px-4 py-3 text-sm font-bold ${
              activeTab === "plan"
                ? "border-[#CCFF00] text-[#CCFF00]"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            Today's Plan
            <span className="ml-2 text-xs">{plan.length}</span>
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`border-b-2 px-4 py-3 text-sm font-bold ${
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
      <div className="mt-6 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-full border border-white/10 bg-[#12141A] px-5 py-3 text-sm text-white outline-none"
        >
          <option value="duration">Sort: Duration</option>
          <option value="calories">Sort: Calories</option>
          <option value="rating">Sort: Rating</option>
        </select>
      </div>
      <section className="mt-6 space-y-4">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutItem
              key={workout.id}
              workout={workout}
              isDone={doneIds.includes(workout.id)}
              isPlan={activeTab === "plan"}
              markAsDone={markAsDone}
              removeFromPlan={removeFromPlan}
              removeFromSaved={removeFromSaved}
            />
          ))
        ) : (
          <EmptyState isPlan={activeTab === "plan"} />
        )}
      </section>
    </main>
  );
};
export default MyPlanPage;