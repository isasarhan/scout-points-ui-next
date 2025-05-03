import { z } from "zod";

export const AddCategoriesSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "description is required"),
    imageUrl: z.string().optional()
});
