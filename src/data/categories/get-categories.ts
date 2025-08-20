import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { categoryTable } from "@/db/schema";

export const getCategories = async () => {
  const categories = await db.query.categoryTable.findMany({});
  return categories;
};

export const getCategoriesBySlug = async (slug: string) => {
  const categoriesBySlug = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });
  return categoriesBySlug;
};
