"use client";
import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import WorkOut from "../components/shared/WorkOut";
import { IWork } from "../workout-type";

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState<IWork[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "https://api.api-store.workers.dev/api/fitlog"
      );
      const data = await res.json();
      setWorkouts(data);
    };

    getData();
  }, []);

  return (
    <main>
      <Banner />
      <section
        id="library"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <h2 className="font-oswald text-3xl font-bold text-white">
            THE LIBRARY
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkOut key={workout.id} card={workout} />
          ))}
        </div>
      </section>
    </main>
  );
};
export default WorkoutsPage;