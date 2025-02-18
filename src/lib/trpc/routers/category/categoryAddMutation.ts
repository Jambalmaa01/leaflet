import {
  categoryAddSchema,
  CategoryAddSchema,
} from "@/lib/zod/schemas/category/add.category";
import { publicProcedure } from "../../procedures";
import { tRPCException } from "../../exception";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/drizzle";
import { categoryTable } from "@/lib/drizzle/table/categoryTable";
import { eq } from "drizzle-orm";

export const categoryAddMutation = publicProcedure
  .input(categoryAddSchema)
  .mutation(async ({ input }) => {
    try {
      const { category } = input;
      const categoryField = await db.transaction(async (tx) => {
        const categoryFields = await tx
          .insert(categoryTable)
          .values({
            category,
          })
          .returning();

        const categoryField = categoryFields[0];

        return categoryField;
      });
      return {
        categoryField,
      };
    } catch (error) {
      throw tRPCException(error);
    }
  });
