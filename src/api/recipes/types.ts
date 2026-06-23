import type { Recipe, RecipeDetail } from "@/types/recipes";

export interface GetRecipesListResponse {
  recipesNumber: number;
  recipes: Recipe[];
}

export interface GetRecipeDetailResponse {
  recipe: RecipeDetail;
}
