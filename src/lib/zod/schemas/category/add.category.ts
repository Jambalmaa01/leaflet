import { z } from "zod";

export const categoryAddSchema = z.object({
  category: z.string().min(1),
});

export type CategoryAddSchema = z.infer<typeof categoryAddSchema>;

export const categoryAddSchemaDefaultValues: CategoryAddSchema = {
  category: "",
};
