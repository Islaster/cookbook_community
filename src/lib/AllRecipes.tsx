"use server";

import { prisma } from "./prisma";

export async function AllRecipes() {
  const recipes = await prisma.recipe.findMany();
  return recipes;
}
