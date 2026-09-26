"use client";
import { toast } from "react-toastify";
import { IWork } from "@/app/workout-type";
import { useWorkout } from "@/app/context/WorkoutContext";

interface WorkoutInfoProps {
  workout: IWork;
}

const WorkoutInfo = ({ workout }: WorkoutInfoProps) => {
  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {workout.muscleGroups.map((muscle) => (
          <span
            key={muscle}
            className="rounded-full bg-[#CCFF00] px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-black"
          >
            {muscle}
          </span>
        ))}
      </div>
      <h1 className="font-oswald text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl xl:text-5xl">
        {workout.name}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
        {workout.description}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-white/10 py-3 text-xs font-medium text-gray-300">
        <span>⏱ {workout.duration} min</span>
        <span>🔥 {workout.caloriesBurned} kcal</span>
        <span>★ {workout.rating}</span>
      </div>
      <section className="mt-5 rounded-2xl border border-white/10 bg-[#12141A] p-4 sm:p-5">
        <h2 className="font-oswald text-lg font-bold tracking-wide text-white">
          KEY SPECS
        </h2>
        <div className="mt-3">
          <div className="flex justify-between border-b border-white/10 py-2.5">
            <span className="text-xs text-gray-500">EQUIPMENT</span>
            <span className="text-sm font-semibold text-white">
              {workout.equipment}
            </span>
          </div>
          <div className="flex justify-between border-b border-white/10 py-2.5">
            <span className="text-xs text-gray-500">DIFFICULTY</span>
            <span className="text-sm font-semibold text-white">
              {workout.difficulty}
            </span>
          </div>
          <div className="flex justify-between border-b border-white/10 py-2.5">
            <span className="text-xs text-gray-500">SETS</span>
            <span className="text-sm font-semibold text-white">
              {workout.sets}
            </span>
          </div>
          <div className="flex justify-between border-b border-white/10 py-2.5">
            <span className="text-xs text-gray-500">REPS</span>
            <span className="text-sm font-semibold text-white">
              {workout.reps}
            </span>
          </div>
          <div className="flex justify-between border-b border-white/10 py-2.5">
            <span className="text-xs text-gray-500">DURATION</span>
            <span className="text-sm font-semibold text-white">
              {workout.duration} min
            </span>
          </div>
          <div className="flex justify-between border-b border-white/10 py-2.5">
            <span className="text-xs text-gray-500">CALORIES</span>
            <span className="text-sm font-semibold text-white">
              {workout.caloriesBurned} kcal
            </span>
          </div>
          <div className="flex justify-between py-2.5">
            <span className="text-xs text-gray-500">RATING</span>
            <span className="text-sm font-semibold text-white">
              {workout.rating}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export const WorkoutActions = ({ workout }: WorkoutInfoProps) => {
  const { plan, saved, addToPlan, saveWorkout } = useWorkout();
  const isInPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  const handleAddToPlan = () => {
    addToPlan(workout);
    toast.success("Workout added to today's plan! 🎉");
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        onClick={handleAddToPlan}
        disabled={isInPlan}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#CCFF00] px-5 py-3 text-sm font-extrabold text-black hover:bg-[#b8e600] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isInPlan ? "Added to plan" : "Add to today's plan"}
      </button>
      <button
        onClick={() => saveWorkout(workout)}
        disabled={isSaved}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-5 py-3 text-sm font-bold text-white hover:border-[#CCFF00]/50 hover:text-[#CCFF00] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
};

export default WorkoutInfo;