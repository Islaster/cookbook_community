import { prisma } from "@/lib/prisma";

export async function saveToggle(id: number) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
    });
    if (recipe) {
      const existingLike = await prisma.save.findUnique({
        where: {
          userId_recipeId: {
            userId: recipe.userId,
            recipeId: recipe.id,
          },
        },
      });

      if (existingLike)
        await prisma.save.delete({
          where: {
            userId_recipeId: { userId: recipe.userId, recipeId: recipe.id },
          },
        });

      if (!existingLike)
        await prisma.save.create({
          data: {
            userId: recipe.userId,
            recipeId: recipe.id,
          },
        });
    }
    return { status: 200, saved: true };
  } catch (err: unknown) {
    if (err instanceof Error) return { status: 500, message: err.message };
  }
}
