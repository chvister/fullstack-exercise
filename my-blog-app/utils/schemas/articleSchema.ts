import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "Title is required").max(50),
  perex: z.string().min(1, "Perex is required").max(100),
  content: z.string().min(1, "Content is required"),
  imageId: z.string().optional(),
});
