"use client";
import { useState } from "react";
import FloatingInput from "./floatingInput";
import TagInput from "./tagInput";
import InstructionSteps from "./instructionSteps";
import IngredientTagInput from "./ingredientTagInput";
import { convertToFormData } from "./convertToFormdata";
import { useUserContext } from "@/contexts/userContext";
import { data } from "./types";
import { useRouter } from "next/navigation";

export default function CreateRecipe() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useUserContext();
  const [create, setCreate] = useState(false);
  const [formData, setFormData] = useState<data>({
    title: "",
    prepTimeHours: 0,
    prepTimeMinutes: 0,
    cookTimeHours: 0,
    cookTimeMinutes: 0,
    ingredients: [],
    instructions: [],
    toolsNeeded: [],
    description: "",
    imageFile: null,
    userId: user?.id,
  });
  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreate(true);
    try {
      const fd = convertToFormData(formData);
      const response = await fetch("/api/recipe/create", {
        method: "POST",
        body: fd,
      });
      if (!response.ok) {
        throw new Error("Failed to create recipe");
      }

      await response.json();
      router.push("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message);
      }
    } finally {
      setCreate(false);
    }
  }

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };
  return (
    <div className="w-full max-w-2xl mx-auto mt-5 px-4">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Add a New Recipe
      </h2>
      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Recipe Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange("title")}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange("description")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="imageUpload"
            className="block w-full px-4 py-6 border border-dashed border-gray-300 rounded-lg cursor-pointer text-center text-gray-500 hover:border-blue-500 hover:text-blue-600"
          >
            {formData.imageFile
              ? formData.imageFile.name
              : "Click to upload an image"}
          </label>

          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            name="imageFile"
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                imageFile: e.target.files?.[0] || null,
              })
            }
            className="hidden" // hides the browser's default file input
          />
        </div>
        {/* Prep Time */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Prep Time
          </label>
          <div className="flex space-x-2">
            <FloatingInput
              name="prepTimeHours"
              value={formData.prepTimeHours}
              onChange={handleSingleChange}
              label="Hrs"
            />
            <FloatingInput
              name="prepTimeMinutes"
              value={formData.prepTimeMinutes}
              onChange={handleSingleChange}
              label="Mins"
            />
          </div>
        </div>

        {/* Cook Time */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Cook Time
          </label>
          <div className="flex space-x-2">
            <FloatingInput
              name="cookTimeHours"
              value={formData.cookTimeHours}
              onChange={handleSingleChange}
              label="Hrs"
            />
            <FloatingInput
              name="cookTimeMinutes"
              value={formData.cookTimeMinutes}
              onChange={handleSingleChange}
              label="Mins"
            />
          </div>
        </div>
        <IngredientTagInput
          label="Ingredients"
          ingredients={formData.ingredients}
          setIngredients={(ingredients) =>
            setFormData({ ...formData, ingredients })
          }
        />
        <TagInput
          label="Tools Needed"
          tags={formData.toolsNeeded}
          setTags={(tags) => setFormData({ ...formData, toolsNeeded: tags })}
          placeholder="Add a tool"
        />
        <InstructionSteps
          steps={formData.instructions}
          setSteps={(steps) =>
            setFormData({ ...formData, instructions: steps })
          }
        />

        <button
          type="submit"
          disabled={create}
          className="w-full py-2 mt-2 text-white font-medium rounded-lg bg-gradient-to-r from-[#003366] via-[#0059b3] to-[#0073e6] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {create ? "creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
