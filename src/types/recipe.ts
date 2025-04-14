import type { Recipe } from "@prisma/client";

export type Ingredient = {
  name: string;
  quantity: number;
  unit: string;
};

export type SafeRecipe = Omit<
  Recipe,
  "ingredients" | "instructions" | "toolsNeeded"
> & {
  ingredients: Ingredient[];
  instructions: string[]; // or whatever yours looks like
  toolsNeeded: string[]; // or whatever yours looks like
};
