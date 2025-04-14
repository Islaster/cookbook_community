"use server";

import BackButton from "@/components/shared/backButton";
import { prisma } from "@/lib/prisma";
import { SafeRecipe, Ingredient } from "@/types/recipe";
import Image from "next/image";
import Buttons from "./buttons";

type RecipeProps = {
  params: Promise<{
    id: string;
  }>;
};

const RecipeDetail = async ({ params }: RecipeProps) => {
  const { id } = await params;
  const recipeId = parseInt(id, 10);
  console.log(parseInt(id, 10));

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: recipeId,
    },
  });

  console.log(recipe);
  if (!recipe) throw new Error("recipe doesn't exist.");

  const safeRecipe: SafeRecipe = {
    ...recipe,
    ingredients: recipe.ingredients as Ingredient[],
    instructions: recipe.instructions as string[],
    toolsNeeded: recipe.toolsNeeded as string[],
  };

  const totalTime = (recipe?.cookingTime ?? 0) + (recipe?.prepTime ?? 0);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6 relative">
      <BackButton />
      <h1 className="text-3xl font-bold mt-8">{recipe.title}</h1>

      <p className="text-gray-700">{recipe.description}</p>
      <div className="flex gap-2 flex-wrap">
        <Buttons id={id} />
      </div>

      <div className="relative w-full h-64 overflow-hidden rounded-lg">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="font-medium">Prep Time</div>
          <div>{recipe.prepTime} mins</div>
        </div>
        <div>
          <div className="font-medium">Cook Time</div>
          <div>{recipe.cookingTime} mins</div>
        </div>
        <div>
          <div className="font-medium">Total Time</div>
          <div>{totalTime} mins</div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-5 space-y-1">
          {safeRecipe.ingredients.map((ingredient, idx) => (
            <li key={idx}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <ul className="list-none pl-5 space-y-2">
          {safeRecipe.instructions.map((instruction, idx) => (
            <li key={idx}>{instruction}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button className="bg-red-600 text-white w-full sm:w-48 text-lg font-semibold px-6 py-4 rounded-md hover:bg-red-700 active:scale-95 transition">
          I Made It
        </button>

        <button className="w-full sm:w-48 text-lg font-semibold px-6 py-4 rounded-md bg-beige text-gray-800 hover:bg-beige-dark active:scale-95 transition">
          Print
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
