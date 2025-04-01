import { data } from "./types";

export const convertToFormData = (data: data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);

  // Convert total prep and cook time to minutes (or send separately)
  const totalPrepTime = data.prepTimeHours * 60 + data.prepTimeMinutes;
  const totalCookTime = data.cookTimeHours * 60 + data.cookTimeMinutes;
  formData.append("prepTime", totalPrepTime.toString());
  formData.append("cookTime", totalCookTime.toString());

  // Convert arrays to JSON strings
  formData.append("ingredients", JSON.stringify(data.ingredients));
  formData.append("instructions", JSON.stringify(data.instructions));
  formData.append("toolsNeeded", JSON.stringify(data.toolsNeeded));
  if (typeof data.userId === "number")
    formData.append("userId", data.userId.toString());

  // Attach the image file
  if (data.imageFile) {
    formData.append("image", data.imageFile);
  }

  return formData;
};
