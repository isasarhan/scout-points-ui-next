import { z } from "zod";

export const addDepartmentSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    username: z.string().min(3, "Name must be at least 3 characters"),
    type: z.string().min(3, "Type is required"),
    description: z.string().optional(),
    location: z.object({
        city: z.string().min(2, "City is required"),
        country: z.string().min(2, "Country is required"),
        postalCode: z.string().min(3, "Postal Code is required"),
        street: z.string().min(3, "Street is required")
    }),
    status: z.string().min(3, "Status is required"),
    manager: z.string().optional()
});
