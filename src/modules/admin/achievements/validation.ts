import { Level } from "@/types/achievement";
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
    level: z.nativeEnum(Level).default(Level.BEGINNER),
    requirements: z.array(
        z.object({
          value: z.string().min(1, "Requirement is required"),
        })
      ),

});

export type CreateAchievementDto = z.infer<typeof AddAchievementSchema>;
