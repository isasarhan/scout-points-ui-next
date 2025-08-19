import * as z from "zod"

export const addressSchema = z.object({
    street: z.string().min(1, "Street is required"),
    building: z.string().min(1, "Building is required"),
    floor: z.string().min(1, "Floor is required"),
    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),
})

export const formSchema = z.object({
    username: z.string().min(2, "First name must be at least 2 characters"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
    motherName: z.string().min(2, "Mother's name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    address: addressSchema,
    nationality: z.string().min(2, "Nationality must be at least 2 characters"),
    department: z.string().min(1, "Department is required"),
})
