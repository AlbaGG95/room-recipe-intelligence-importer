export type RecipeIngredient = {
  name: string;
  normalizedName: string;
  measure: string | null;
  position: number;
};

export type NormalizedRecipe = {
  externalId: string;
  name: string;
  category: string | null;
  area: string | null;
  instructions: string | null;
  thumbnailUrl: string | null;
  youtubeUrl: string | null;
  sourceUrl: string | null;
  tags: string[];
  llmSummary: string;
  rawPayload: Record<string, string | null>;
  ingredients: RecipeIngredient[];
};
