import { z } from "zod";

 export const addAssociationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.string().min(1, "Type is required"),
    description: z.string().optional(),
    website: z.string().url("Invalid URL").optional(),
});
