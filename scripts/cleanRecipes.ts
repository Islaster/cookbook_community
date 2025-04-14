import fs from "fs";
import path from "path";

const recipesPath = path.join(__dirname, "../prisma/recipes.json");
const outputPath = path.join(__dirname, "../prisma/cleanRecipes.json");

const rawData = fs.readFileSync(recipesPath, "utf-8");
const recipes = JSON.parse(rawData);
console.log("Loaded", recipes.length, "recipes");

const cleanedRecipes = recipes
  .filter((recipe: any) => [1, 2].includes(recipe.userId))
  .map((recipe: any) => ({
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    image: recipe.image,
    difficulty: null,
    cookingTime: recipe.cookingTime,
    prepTime: recipe.prepTime,
    toolsNeeded: recipe.toolsNeeded,
    userId: recipe.userId,
  }));

fs.writeFileSync(outputPath, JSON.stringify(cleanedRecipes, null, 2));

console.log("Cleaned", cleanedRecipes.length, "recipes");

console.log("✨ Recipes cleaned and saved to cleanRecipes.json");
