interface WorkoutInstructionsProps {
  instructions: string[];
}
const WorkoutInstructions = ({instructions}: WorkoutInstructionsProps) => {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="font-oswald text-2xl font-bold tracking-wide text-white">
          INSTRUCTIONS
        </h2>
        <span className="text-xs text-gray-500">
          {instructions.length} STEPS
        </span>
      </div>
      <ol className="mt-5 space-y-5">
        {instructions.map((instruction, index) => (
          <li
            key={index}
            className="flex items-start gap-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#CCFF00]/20 bg-[#CCFF00]/10 font-oswald text-sm font-bold text-[#CCFF00]">
              {index + 1}
            </span>
            <p className="min-w-0 pt-1 text-sm leading-7 text-gray-400">
              {instruction}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};
export default WorkoutInstructions;
