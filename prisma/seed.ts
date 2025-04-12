import { PrismaClient } from "@prisma/client";
import recipes from "./cleanRecipes.json";
import { uploadToS3 } from "../scripts/uploadToS3";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  await prisma.recipe.deleteMany();
  console.log("🗑️ Existing recipes deleted");
  for (const recipe of recipes) {
    const imagePath = path.join(__dirname, `../public/${recipe.image}`);
    const imageUrl = await uploadToS3(recipe.image, imagePath);

    await prisma.recipe.create({
      data: {
        ...recipe,
        image: imageUrl, // now S3 link
      },
    });
  }
}

main()
  .then(() => console.log("🌱 Seed Complete"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
