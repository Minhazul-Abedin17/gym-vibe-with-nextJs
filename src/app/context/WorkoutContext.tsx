"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { IWork } from "@/app/workout-type";

interface WorkoutContextType {
  plan: IWork[];
  saved: IWork[];
  doneIds: number[];
  toast: string | null;
  isLoaded: boolean;
  addToPlan: (workout: IWork) => void;
  saveWorkout: (workout: IWork) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
}
const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);
export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<IWork[]>([]);
  const [saved, setSaved] = useState<IWork[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [isLoaded] = useState<boolean>(true);
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const addToPlan = (workout: IWork) => {
    const alreadyAdded = plan.some((item) => item.id === workout.id);
    if (alreadyAdded) {
      setToast("Workout already in today's plan");
      return;
    }
    setPlan([...plan, workout]);
    setToast("Added to today's plan");
  };
  const saveWorkout = (workout: IWork) => {
    const alreadySaved = saved.some((item) => item.id === workout.id);
    if (alreadySaved) {
      setToast("Workout already saved");
      return;
    }
    setSaved([...saved, workout]);
    setToast("Workout saved for later");
  };
  const removeFromPlan = (id: number) => {
    setPlan(plan.filter((workout) => workout.id !== id));
    setDoneIds(doneIds.filter((workoutId) => workoutId !== id));
    setToast("Workout removed from today's plan");
  };
  const removeFromSaved = (id: number) => {
    setSaved(saved.filter((workout) => workout.id !== id));
    setToast("Workout removed from saved");
  };
  const markAsDone = (id: number) => {
    if (doneIds.includes(id)) {
      setToast("Workout already completed");
      return;
    }
    setDoneIds([...doneIds, id]);
    setToast("Workout marked as done!");
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
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};