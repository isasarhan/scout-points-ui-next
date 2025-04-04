import { EnumAssociationType } from "@/types/association";
import { z } from "zod";

 export const addAssociationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.nativeEnum(EnumAssociationType).default(EnumAssociationType.SCOUT),
    description: z.string().optional(),
    website: z.string().url("Invalid URL").optional(),
});
