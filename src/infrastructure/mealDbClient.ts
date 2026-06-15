export type MealDbRawMeal = Record<string, string | null>;

type MealDbSearchResponse = {
  meals: MealDbRawMeal[] | null;
};

const baseUrl = "https://www.themealdb.com/api/json/v1/1/search.php";

export async function searchMealsByName(
  searchTerm: string,
): Promise<MealDbRawMeal[]> {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  const response = await fetch(`${baseUrl}?s=${encodedSearchTerm}`);

  if (!response.ok) {
    throw new Error(
      `TheMealDB request failed for "${searchTerm}" with status ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as MealDbSearchResponse;

  return data.meals ?? [];
}
