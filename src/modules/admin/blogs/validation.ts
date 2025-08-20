import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().optional(),
  rating: z.coerce.number().min(1).max(5).default(1),
  coverImage: z.any(),
  featuredImage: z.any(),
  author: z.string().optional(),
  categories: z.array(z.string()).optional(),

  enabled: z.boolean().default(true),

});

export const blogCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  slug: z.string().optional(),
  img: z.any(),

});