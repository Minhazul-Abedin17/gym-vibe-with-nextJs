import { FiCheck, FiClock } from "react-icons/fi";
import { FaFireFlameCurved } from "react-icons/fa6";

interface PlanStatsProps {
  planLength: number;
  totalMinutes: number;
  totalCalories: number;
}
const PlanStats = ({planLength,totalMinutes,totalCalories,}: PlanStatsProps) => {
  return (
    <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-[#12141A] p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold tracking-widest text-gray-500">
            EXERCISES
          </p>
          <span className="text-[#CCFF00]">
            <FiCheck />
          </span>
        </div>
        <p className="mt-4 font-oswald text-4xl font-bold text-white">
          {planLength}
        </p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#12141A] p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold tracking-widest text-gray-500">
            MINUTES
          </p>
          <span className="text-[#CCFF00]">
            <FiClock />
          </span>
        </div>
        <p className="mt-4 font-oswald text-4xl font-bold text-white">
          {totalMinutes}
        </p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#12141A] p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold tracking-widest text-gray-500">
            CALORIES
          </p>
          <span className="text-[#CCFF00]">
            <FaFireFlameCurved />
          </span>
        </div>
        <p className="mt-4 font-oswald text-4xl font-bold text-white">
          {totalCalories}
        </p>
      </div>
    </section>
  );
};
export default PlanStats;