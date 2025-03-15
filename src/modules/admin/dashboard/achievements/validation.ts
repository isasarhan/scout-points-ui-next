import { z } from "zod";
import { ObjectId } from "mongoose";

export const AddAchievementSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    deadline: z.date().optional(),
    categories: z.array(z.string()).min(1, "At least one category is required"),
    awardedBy: z.string().optional(),
    department: z.array(z.string()).min(1, "At least one department is required"),
    attachments: z.array(z.string()).optional(),
});

export type CreateAchievementDto = z.infer<typeof AddAchievementSchema>;
