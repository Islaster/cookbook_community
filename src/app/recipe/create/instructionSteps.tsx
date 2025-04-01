"use client";
import { useState } from "react";

type InstructionStepsProps = {
  steps: string[];
  setSteps: (steps: string[]) => void;
};

export default function InstructionSteps({
  steps,
  setSteps,
}: InstructionStepsProps) {
  const [currentStep, setCurrentStep] = useState("");

  const addStep = () => {
    const trimmed = currentStep.trim();
    if (trimmed) {
      setSteps([...steps, trimmed]);
      setCurrentStep("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addStep();
    }
  };

  const removeStep = (index: number) => {
    const updated = [...steps];
    updated.splice(index, 1);
    setSteps(updated);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium text-gray-700">
        Instructions
      </label>

      {/* Input area with plus button */}
      <div className="flex items-start gap-2 mb-4">
        <div className="relative w-full">
          <span className="absolute top-1 left-2 text-xs text-gray-500 font-medium">
            Step {steps.length + 1}
          </span>
          <textarea
            value={currentStep}
            onChange={(e) => setCurrentStep(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            placeholder="Write instruction and press Enter or +"
            className="w-full pt-5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <button
          type="button"
          onClick={addStep}
          className="mt-1 bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700 h-fit"
        >
          +
        </button>
      </div>

      {/* List of added steps */}
      <ol className="list-decimal list-inside space-y-3">
        {steps.map((step, index) => (
          <li key={index} className="bg-blue-50 p-3 rounded relative group">
            <p className="text-sm text-gray-800">{step}</p>
            <button
              type="button"
              onClick={() => removeStep(index)}
              className="absolute top-1 right-2 text-red-500 text-sm opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
