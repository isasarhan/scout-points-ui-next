import { z } from "zod";
import { Types } from "mongoose";
import { Rank, Role } from "@/types/user";

const AddressSchema = z.object({
  street: z.string().optional(),
  building: z.string().optional(),
  floor: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
});

const AddUserSchema = z.object({
  username: z.string().min(1, "First name is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  fatherName: z.string().min(1, "Father name is required"),
  motherName: z.string().optional(),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z.string().optional(),
  address: AddressSchema.optional(),
  nationality: z.string().optional(),
  points: z.number().default(0),
  department: z.string().optional(),
  profileUrl: z.string().url("Invalid URL format").optional(),
  achievements: z.array(z.instanceof(Types.ObjectId)).optional(),
  role: z.nativeEnum(Role).default(Role.USER),
  rank: z.nativeEnum(Rank).default(Rank.SCOUT)
});

export { AddUserSchema, AddressSchema };
