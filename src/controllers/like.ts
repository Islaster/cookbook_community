import { prisma } from "@/lib/prisma";

export async function likeToggle(id: number) {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
  });
  try {
    if (recipe) {
      const existingLike = await prisma.like.findUnique({
        where: {
          userId_recipeId: {
            userId: recipe.userId,
            recipeId: recipe.id,
          },
        },
      });

      if (existingLike)
        await prisma.like.delete({
          where: {
            userId_recipeId: { userId: recipe.userId, recipeId: recipe.id },
          },
        });

      if (!existingLike)
        await prisma.like.create({
          data: {
            userId: recipe.userId,
            recipeId: recipe.id,
          },
        });
    }
    return { status: 200, liked: true };
  } catch (err: unknown) {
    if (err instanceof Error) return { status: 500, message: err.message };
  }
}
