import { IWork } from "@/app/workout-type";
import Image from "next/image";
import Link from "next/link";
import { FaFireFlameCurved } from "react-icons/fa6";
import { FiClock, FiStar } from "react-icons/fi";

const WorkOut = ({ card }: { card: IWork }) => {
  return (
    <Link
      href={`/workouts/${card.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#12141A] text-white transition duration-300 hover:-translate-y-1 hover:border-[#CCFF00]/50"
    >
      <div  className="relative h-52 w-full overflow-hidden bg-[#0B0D10]">
        <Image
          src={card.image}
          alt={card.name}
          fill
          className="object-contain transition duration-300"
        />
      </div>
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {card.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-[#CCFF00] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-black"
            >
              {group}
            </span>
          ))}
        </div>
        <h2 className="mb-2 text-xl font-black uppercase tracking-wide text-white">
          {card.name}
        </h2>
        <p className="text-sm text-gray-400">{card.equipment}</p>
        <div className="my-4 border-t border-white/10" />
        <div className="flex items-center justify-between text-xs text-gray-300">
          <div className="flex items-center gap-1.5">
            <FiClock className="text-gray-400" />
            <span>{card.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaFireFlameCurved className="text-gray-400" />
            <span>{card.caloriesBurned} kcal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiStar className="text-gray-400" />
            <span>{card.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default WorkOut;