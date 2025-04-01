export type data = {
  title: string;
  prepTimeHours: number;
  prepTimeMinutes: number;
  cookTimeHours: number;
  cookTimeMinutes: number;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  instructions: string[];
  toolsNeeded: string[];
  description: string;
  imageFile: File | null;
  userId?: number;
};
