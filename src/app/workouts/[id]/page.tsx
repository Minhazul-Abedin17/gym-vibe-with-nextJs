import Image from "next/image";
import Link from "next/link";
import { IWork } from "@/app/workout-type";
import WorkoutInstructions from "./WorkoutInstructions";
import WorkoutInfo, { WorkoutActions } from "./WorkoutInfo";

interface Props {
  params: Promise<{
    id: string;
  }>;
}
const WorkoutDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  const response = await fetch(
    `https://api.api-store.workers.dev/api/fitlog/${id}`
  );

  const workout: IWork = await response.json();
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link
        href="/workouts"
        className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#CCFF00]"
      >
        ← Back to workouts
      </Link>
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="sticky top-24 w-full">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-[#12141A] shadow-2xl sm:aspect-[4/3] lg:aspect-square">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-5 sm:p-8 lg:p-10"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-12 sm:px-7 sm:pb-7">
              <p className="text-xs font-bold tracking-[0.2em] text-[#CCFF00]">
                FITLOG / WORKOUT
              </p>
              <p className="mt-1 font-oswald text-lg font-semibold uppercase tracking-wide text-white">
                {workout.name}
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex flex-col justify-between space-y-8">
          <WorkoutInfo workout={workout} />
          <div className="border-t border-white/10 pt-6">
            <WorkoutInstructions instructions={workout.instructions} />
          </div>
          <WorkoutActions workout={workout} />
          <p className="pt-2 text-center text-[10px] font-medium tracking-[0.15em] text-gray-600">
            TRAIN WITH INTENT. LOG EVERY SET.
          </p>
        </div>

      </div>
    </main>
  );
};
export default WorkoutDetailsPage;