import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

type SearchProps = {
  params: Promise<{
    username: string;
  }>;
};

const Search = async ({ params }: SearchProps) => {
  const { username } = await params;
  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: username,
      },
    },
  });
  const recipes = await prisma.recipe.findMany({
    where: {
      title: {
        contains: username,
      },
    },
  });

  const results = [
    ...users.map((user) => ({ ...user, type: "user" as const })),
    ...recipes.map((recipe) => ({ ...recipe, type: "recipe" as const })),
  ];

  return (
    <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-6">
      {results.map((result, idx) => (
        <Link
          key={idx}
          href={
            result.type == "user"
              ? `/profile/${result.username}`
              : `/recipe/${result.id}`
          }
        >
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 overflow-hidden rounded-lg transition-transform duration-200 hover:scale-105">
              <Image
                src={result.image || "/profile.png"}
                alt={result.type === "recipe" ? result.title : result.username}
                fill
                className="object-cover"
              />
            </div>

            <p className="text-xs sm:text-sm md:text-base text-center font-medium">
              {result.type === "recipe" ? result.title : result?.username}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Search;
