import { z } from "zod";

export const AddAchievementSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    points: z.string(),
    deadline: z.string().optional(),
    categories: z.array(z.string()).min(1, "At least one category is required"),
    awardedBy: z.string().optional(),
    departments: z.array(z.string()).min(1, "At least one department is required"),
    attachments: z.array(z.string()).optional(),
});

export type CreateAchievementDto = z.infer<typeof AddAchievementSchema>;
