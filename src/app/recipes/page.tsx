import { prisma } from "@/lib/prisma";
import data from "@/data/recipes.json";

const Recipes = async () => {
  const arr = await prisma.recipe.findMany();
  const recipes = arr.concat(data);
  console.log(recipes);
  return (
    <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map((recipe, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-lg transition-transform duration-200 hover:scale-105"
          />
          <p className="text-xs sm:text-sm md:text-base text-center font-medium">
            {recipe.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Recipes;
/*<div className="grid grid-cols-3 gap-1">
  {recipes.map((recipe, idx) => (
    <img
      key={idx}
      src={recipe.image}
      alt="recipe"
      className="aspect-square object-cover w-full"
    />
  ))}
</div>
</div>*/
