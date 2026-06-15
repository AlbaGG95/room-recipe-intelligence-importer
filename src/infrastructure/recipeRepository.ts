import type { Prisma } from "@prisma/client";
import type { NormalizedRecipe } from "../domain/recipe.js";
import { prisma } from "./prismaClient.js";

export type ImportLogStatus = "IMPORTED" | "NOT_FOUND" | "FAILED";

type CreateImportLogInput = {
  searchTerm: string;
  status: ImportLogStatus;
  recipesFound: number;
  errorMessage?: string;
};

export async function saveRecipe(recipe: NormalizedRecipe): Promise<void> {
  const tags = recipe.tags as Prisma.InputJsonValue;
  const rawPayload = recipe.rawPayload as Prisma.InputJsonValue;

  await prisma.$transaction(async (transaction) => {
    const savedRecipe = await transaction.recipe.upsert({
      where: {
        externalId: recipe.externalId,
      },
      create: {
        externalId: recipe.externalId,
        name: recipe.name,
        category: recipe.category,
        area: recipe.area,
        instructions: recipe.instructions,
        thumbnailUrl: recipe.thumbnailUrl,
        youtubeUrl: recipe.youtubeUrl,
        sourceUrl: recipe.sourceUrl,
        tags,
        llmSummary: recipe.llmSummary,
        rawPayload,
      },
      update: {
        name: recipe.name,
        category: recipe.category,
        area: recipe.area,
        instructions: recipe.instructions,
        thumbnailUrl: recipe.thumbnailUrl,
        youtubeUrl: recipe.youtubeUrl,
        sourceUrl: recipe.sourceUrl,
        tags,
        llmSummary: recipe.llmSummary,
        rawPayload,
      },
    });

    await transaction.recipeIngredient.deleteMany({
      where: {
        recipeId: savedRecipe.id,
      },
    });

    if (recipe.ingredients.length > 0) {
      await transaction.recipeIngredient.createMany({
        data: recipe.ingredients.map((ingredient) => ({
          recipeId: savedRecipe.id,
          name: ingredient.name,
          normalizedName: ingredient.normalizedName,
          measure: ingredient.measure,
          position: ingredient.position,
        })),
      });
    }
  });
}

export async function createImportLog(
  input: CreateImportLogInput,
): Promise<void> {
  await prisma.importLog.create({
    data: {
      searchTerm: input.searchTerm,
      status: input.status,
      recipesFound: input.recipesFound,
      errorMessage: input.errorMessage ?? null,
    },
  });
}
