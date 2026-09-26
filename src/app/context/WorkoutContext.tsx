
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { IWork } from "@/app/workout-type";

interface WorkoutContextType {
  plan: IWork[];
  saved: IWork[];
  doneIds: number[];
  toast: string | null;
  isLoaded: boolean;

  addToPlan: (workout: IWork) => boolean;
  saveWorkout: (workout: IWork) => boolean;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  showToast: (message: string) => void;
}

const WorkoutContext = createContext<
  WorkoutContextType | undefined
>(undefined);

export const WorkoutProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [plan, setPlan] = useState<IWork[]>([]);
  const [saved, setSaved] = useState<IWork[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // Keep this so MyPlanPage can still use isLoaded
  const [isLoaded, setIsLoaded] = useState(true);

  // Automatically hide toast
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string) => {
    setToast(message);
  };

  // Add workout to today's plan (maximum 5)
  const addToPlan = (workout: IWork): boolean => {
    if (plan.some((item) => item.id === workout.id)) {
      showToast("Workout already in today's plan");
      return false;
    }

    if (plan.length >= 5) {
      showToast("Today's plan is full!");
      return false;
    }

    setPlan((prev) => [...prev, workout]);

    showToast("Added to today's plan");

    return true;
  };

  // Save workout for later
  const saveWorkout = (workout: IWork): boolean => {
    if (saved.some((item) => item.id === workout.id)) {
      showToast("Workout already saved");
      return false;
    }

    setSaved((prev) => [...prev, workout]);

    showToast("Workout saved for later");

    return true;
  };

  // Remove workout from today's plan
  const removeFromPlan = (id: number) => {
    setPlan((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setDoneIds((prev) =>
      prev.filter((itemId) => itemId !== id)
    );

    showToast("Workout removed from today's plan");
  };

  // Remove workout from saved list
  const removeFromSaved = (id: number) => {
    setSaved((prev) =>
      prev.filter((item) => item.id !== id)
    );

    showToast("Workout removed from saved");
  };

  // Mark workout as completed
  const markAsDone = (id: number) => {
    if (doneIds.includes(id)) {
      showToast("Workout already completed");
      return;
    }

    setDoneIds((prev) => [...prev, id]);

    showToast("Workout marked as done!");
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        doneIds,
        toast,
        isLoaded,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        showToast,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkout must be used inside WorkoutProvider"
    );
  }

  return context;
};
