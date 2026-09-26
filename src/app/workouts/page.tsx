
"use client";

import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import WorkOut from "../components/shared/WorkOut";
import { IWork } from "../workout-type";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState<IWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: IWork[] = await response.json();
        setWorkouts(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        console.error("Workout API error:", err);
        setError("Unable to load workouts. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchWorkouts();

    return () => controller.abort();
  }, []);

  return (
    <main>
      <Banner />

      <section
        id="library"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8"
      >
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#CCFF00]">
            FIND YOUR NEXT LIFT
          </p>

          <h2 className="font-oswald text-4xl font-bold uppercase text-white">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-60 flex-col items-center justify-center gap-4">
            <span className="loading loading-spinner loading-lg text-[#CCFF00]" />
            <p className="text-sm text-gray-400">
              Loading workouts…
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/30 p-8 text-center">
            <p className="text-red-400">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-[#CCFF00] px-5 py-2 font-bold text-black"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Workout Cards */}
        {!loading && !error && workouts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkOut key={workout.id} card={workout} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && workouts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/15 px-5 py-16 text-center">
            <h3 className="font-oswald text-2xl font-bold text-white">
              NO WORKOUTS AVAILABLE
            </h3>

            <p className="mt-3 text-sm text-gray-500">
              No workouts are available right now.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default WorkoutsPage;