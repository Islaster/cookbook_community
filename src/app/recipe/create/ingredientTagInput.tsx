"use client";
import { useState } from "react";

type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

type IngredientTagInputProps = {
  label?: string;
  ingredients: Ingredient[];
  setIngredients: (newIngredients: Ingredient[]) => void;
  placeholder?: string;
};

export default function IngredientTagInput({
  label,
  ingredients,
  setIngredients,
  placeholder,
}: IngredientTagInputProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [unit, setUnit] = useState("");

  const addIngredient = () => {
    const trimmedName = name.trim();
    const trimmedUnit = unit.trim();

    if (trimmedName && quantity !== "" && !isNaN(Number(quantity))) {
      setIngredients([
        ...ingredients,
        {
          name: trimmedName,
          quantity: Number(quantity),
          unit: trimmedUnit || "unit",
        },
      ]);
      setName("");
      setQuantity("");
      setUnit("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  const removeIngredient = (index: number) => {
    const updated = [...ingredients];
    updated.splice(index, 1);
    setIngredients(updated);
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 font-medium text-gray-700">{label}</label>
      )}

      <div className="flex flex-wrap gap-2 mb-2">
        <input
          type="text"
          placeholder="Ingredient"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.valueAsNumber)}
          onKeyDown={handleKeyDown}
          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={addIngredient}
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          +
        </button>
      </div>

      <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1 border border-gray-200 rounded">
        {ingredients.map((item, index) => (
          <span
            key={`${item.name}-${index}`}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {item.name} — {item.quantity} {item.unit}
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="text-red-500 hover:text-red-700 text-xs"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
