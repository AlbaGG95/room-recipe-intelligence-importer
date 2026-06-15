import { readFile } from "node:fs/promises";

export async function readRecipeSearchTerms(filePath: string): Promise<string[]> {
  const fileContent = await readFile(filePath, "utf8");

  return fileContent
    .split(/\r?\n|\r/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
