import Image from "next/image";
import Link from "next/link";
import { FiCheck, FiClock, FiStar, FiX } from "react-icons/fi";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IWork } from "@/app/workout-type";

interface WorkoutItemProps {
  workout: IWork;
  isDone: boolean;
  isPlan: boolean;
  markAsDone: (id: number) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
}
const WorkoutItem = ({workout,isDone,isPlan,markAsDone,removeFromPlan,removeFromSaved}: WorkoutItemProps) => {
  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#12141A] p-4 transition hover:border-white/20 sm:flex-row sm:items-center sm:p-5">
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-[#0B0D10] sm:h-32 sm:w-40">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, 160px"
          className="object-contain p-2"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#CCFF00]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#CCFF00]"
            >
              {muscle}
            </span>
          ))}
          {isDone && isPlan && (
            <span className="rounded-full border border-[#CCFF00]/30 px-2.5 py-1 text-[10px] font-bold text-[#CCFF00]">
              COMPLETED
            </span>
          )}
        </div>
        <h2 className="font-oswald text-xl font-bold uppercase text-white sm:text-2xl">
          {workout.name}
        </h2>
        <p className="mt-1 text-sm text-gray-500">{workout.equipment}</p>
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
      <div className="flex w-full flex-col gap-2 sm:w-44 sm:shrink-0">
        <Link
          href={`/workouts/${workout.id}`}
          className="flex w-full items-center justify-center rounded-full border border-white/15 px-4 py-2.5 text-xs font-bold text-white transition hover:border-[#CCFF00] hover:text-[#CCFF00]"
        >
          View Details
        </Link>
        {isPlan ? (
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
        {isPlan && (
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
};
export default WorkoutItem;