import { FC } from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

type SearchProps = {
  params: {
    username: string;
  };
};

const Search: FC<SearchProps> = async ({ params }) => {
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

  const arr = [...recipes, ...users];

  return (
    <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-6">
      {arr.map((ar, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2">
          <Link
            href={ar.username ? `/profile/${ar.username}` : `/recipe/${ar.id}`}
          >
            <img
              src={ar.image || "/profile.png"}
              alt={ar?.title || ar?.username}
              className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-lg transition-transform duration-200 hover:scale-105"
            />
            <p className="text-xs sm:text-sm md:text-base text-center font-medium">
              {ar?.title || ar?.username}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Search;
