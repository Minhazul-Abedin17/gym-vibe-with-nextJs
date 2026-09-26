import Link from "next/link";
import { FiArrowRight, FiCheck } from "react-icons/fi";

interface EmptyStateProps {
  isPlan: boolean;
}
const EmptyState = ({ isPlan }: EmptyStateProps) => {
  return (
    <div className="rounded-3xl border border-dashed border-white/15 px-5 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#CCFF00]/10 text-[#CCFF00]">
        <FiCheck size={24} />
      </div>
      <h2 className="mt-5 font-oswald text-2xl font-bold text-white">
        NOTHING HERE YET
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
        {isPlan
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
  );
};
export default EmptyState;