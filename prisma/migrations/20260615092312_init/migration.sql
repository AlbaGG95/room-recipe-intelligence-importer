-- CreateTable
CREATE TABLE "Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "area" TEXT,
    "instructions" TEXT,
    "thumbnailUrl" TEXT,
    "youtubeUrl" TEXT,
    "sourceUrl" TEXT,
    "tags" JSONB,
    "llmSummary" TEXT,
    "rawPayload" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "recipeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "normalizedName" TEXT NOT NULL,
    "measure" TEXT,
    "position" INTEGER NOT NULL,
    CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ImportLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "searchTerm" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "recipesFound" INTEGER NOT NULL,
    "errorMessage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_externalId_key" ON "Recipe"("externalId");

-- CreateIndex
CREATE INDEX "RecipeIngredient_recipeId_idx" ON "RecipeIngredient"("recipeId");

-- CreateIndex
CREATE INDEX "RecipeIngredient_normalizedName_idx" ON "RecipeIngredient"("normalizedName");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_recipeId_position_key" ON "RecipeIngredient"("recipeId", "position");

-- CreateIndex
CREATE INDEX "ImportLog_searchTerm_idx" ON "ImportLog"("searchTerm");

-- CreateIndex
CREATE INDEX "ImportLog_status_idx" ON "ImportLog"("status");
