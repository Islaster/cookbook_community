import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

const Recipes = async () => {
  const recipes = await prisma.recipe.findMany();

  return (
    <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map((recipe, idx) => (
        <Link href={`recipe/${recipe.id}`} key={idx}>
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 overflow-hidden rounded-lg transition-transform duration-200 hover:scale-105">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-xs sm:text-sm md:text-base text-center font-medium">
              {recipe.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recipes;
