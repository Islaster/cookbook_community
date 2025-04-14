import { uploadToS3, streamToBuffer } from "@/lib/s3";
import { prisma } from "@/lib/prisma";

export async function create(formData: FormData) {
  const file = formData.get("image");
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const prepTime = formData.get("prepTime")?.toString();
  const cookTime = formData.get("cookTime")?.toString();
  const ingredients = formData.get("ingredients")?.toString();
  const instructions = formData.get("instructions")?.toString();
  const toolsNeeded = formData.get("toolsNeeded")?.toString();
  const userIdString = formData.get("userId")?.toString();

  if (!file) throw new Error("Image is required");

  if (
    !title ||
    !description ||
    !prepTime ||
    !cookTime ||
    !ingredients ||
    !instructions ||
    !toolsNeeded ||
    !userIdString
  ) {
    throw new Error("Missing required form data");
  }

  if (!file || !(file instanceof File)) {
    throw new Error("Image is required and must be a File");
  }

  const buffer = await streamToBuffer(file.stream());

  const imageUrl = await uploadToS3(buffer, file.name, file.type);
  const parsedIngredients = JSON.parse(ingredients);
  const parsedInstructions = JSON.parse(instructions);
  const parsedTools = JSON.parse(toolsNeeded);
  const userId = parseInt(userIdString, 10);
  const parsedCookTime = parseInt(cookTime, 10);
  const recipe = await prisma.recipe.create({
    data: {
      title,
      description,
      cookingTime: parsedCookTime,
      difficulty: prepTime,
      ingredients: parsedIngredients,
      instructions: parsedInstructions,
      toolsNeeded: parsedTools,
      image: imageUrl,
      userId,
    },
  });

  return recipe;
}
