import { prisma } from "@/lib/prisma";
import { FC } from "react";

type RecipeDetailProps = {
  params: {
    id: string;
  };
};

const RecipeDetail: FC<RecipeDetailProps> = async ({ params }) => {
  const { id } = await params;
  const recipeId = parseInt(id, 10);
  console.log(parseInt(id, 10));

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: recipeId,
    },
  });

  console.log(recipe);

  const totalTime = (recipe?.cookTime ?? 0) + (recipe?.prepTime ?? 0);

  if (!recipe) return <div>Recipe not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">{recipe.title}</h1>

      <p className="text-gray-700">{recipe.description}</p>
      <div className="flex gap-2 flex-wrap">
        <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 active:scale-95 transition">
          Save
        </button>
        <button className="bg-beige text-gray-800 px-4 py-2 rounded-md active:scale-95 transition">
          Rate
        </button>
        <button className="bg-beige text-gray-800 px-4 py-2 rounded-md active:scale-95 transition">
          Print
        </button>
        <button className="bg-beige text-gray-800 px-4 py-2 rounded-md active:scale-95 transition">
          Share
        </button>
      </div>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="font-medium">Prep Time</div>
          <div>{recipe.prepTime} mins</div>
        </div>
        <div>
          <div className="font-medium">Cook Time</div>
          <div>{recipe.cookTime} mins</div>
        </div>
        <div>
          <div className="font-medium">Total Time</div>
          <div>{totalTime} mins</div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-5 space-y-1">
          {recipe.ingredients.map((ingredient, idx) => (
            <li key={idx}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <ul className="list-none pl-5 space-y-2">
          {recipe.instructions.map((instruction, idx) => (
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
