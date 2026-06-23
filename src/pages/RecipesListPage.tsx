import { ingredientsApi } from "@/api/ingredients/api";
import { recipesApi } from "@/api/recipes/api";
import RecipeAccordionItem from "@/components/recipes/RecipeAccordionItem";
import Hint from "@/components/ui/Hint";
import Ingredient from "@/components/ui/Ingredient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { CircleX, ScanLine, Sparkles } from "lucide-react";
import { Route as ScanRoute } from "@/routes/index";
import { useState } from "react";
import Button from "@/components/ui/Button";

export function RecipesListPage() {
  const {
    data: lastIngredients,
    isError: isIngredientsError,
    isPending: isIngredientsPending,
  } = useQuery({
    queryKey: ["ingredients", "last"],
    queryFn: ingredientsApi.getLast,
  });

  const {
    data: recipes,
    isError: isRecipesError,
    isPending: isRecipesPending,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: recipesApi.getList,
  });

  const queryClient = useQueryClient();

  const ingredientsMutation = useMutation({
    mutationFn: (newIng: string) => {
      return ingredientsApi.addIngredient(newIng);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["ingredients", "last"], data);
    },
  });

  const [ingToAdd, setIngToAdd] = useState("");
  const [showIngForm, setShowIngForm] = useState(false);

  const handleAddIngredient = () => {
    if (ingToAdd.length == 0) return;
    ingredientsMutation.mutate(ingToAdd);
    setShowIngForm(false);
    setIngToAdd("");
  };

  const handleCancelAddIngredient = () => {
    setShowIngForm(false);
    setIngToAdd("");
  };

  const handleDeleteIngredient = (ing: string) => {
    if (lastIngredients?.ingredients == undefined) return;
    const newIngredientsList = lastIngredients.ingredients.filter(
      (item) => item != ing,
    );
    queryClient.setQueryData(["ingredients", "last"], {
      ingredients: newIngredientsList,
      ingredientsNumber: newIngredientsList.length,
    });
  };

  return (
    <div className="min-h-screen">
      <div className="flex gap-0 min-h-screen">
        <div
          className="flex-shrink-0 flex flex-col gap-5 px-7 py-10 w-[280px] bg-card"
          style={{
            borderRight: "1px solid var(--border)",
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-xs text-accent" size={14} />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Сканирование
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {lastIngredients?.ingredientsNumber} ингредиентов обнаружено
            </p>
            <Hint
              text={`${recipes?.recipesNumber} подходящих рецептов найдено`}
              className="mt-1"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Ingredient
              title="+"
              className="text-xs!"
              onClick={() => setShowIngForm(true)}
            />
            {!isIngredientsError &&
              !isIngredientsPending &&
              lastIngredients.ingredients.map((ing) => (
                <Ingredient
                  key={ing}
                  title={ing}
                  className="text-xs"
                  onClick={() => handleDeleteIngredient(ing)}
                  deletable
                />
              ))}
          </div>
          {showIngForm && (
            <div className="flex flex-col gap-4">
              <input
                type="text"
                className="border-b border-custom"
                onChange={(e) => setIngToAdd(e.target.value.trim())}
                placeholder="Введите ингредиент"
              />
              <div className="flex flex-row gap-4 justify-between">
                <Button
                  text="Добавить"
                  onClick={handleAddIngredient}
                  className="py-1!"
                />
                <Button
                  text="Отмена"
                  onClick={handleCancelAddIngredient}
                  variant="secondary"
                  className="py-1!"
                />
              </div>
            </div>
          )}

          <div className="h-px bg-border" />

          <Link to={ScanRoute.to}>
            <button className="cursor-pointer bg-secondary text-foreground text-sm font-medium w-full py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:opacity-80">
              <ScanLine size={15} />
              Сканировать заново
            </button>
          </Link>
        </div>

        <div className="flex-1 px-8 py-10">
          <h1 className="text-3xl text-foreground mb-2">
            Предлагаемые рецепты
          </h1>

          <Hint
            text="Отсортированные по оценке совпадения ингредиентов - нажмите на рецепт для получения подробной информации"
            className="text-sm! mb-6"
          />
          {recipes?.recipes
            .sort((recA, recB) => recB.matchScore - recA.matchScore)
            .map((recipe) => (
              <RecipeAccordionItem key={recipe.id} recipe={recipe} />
            ))}
          {isRecipesError ||
            isRecipesPending ||
            (recipes.recipesNumber == 0 && (
              <div className="flex justify-center items-center">
                <div className="w-fit bg-card p-8 rounded-2xl border border-custom flex justify-center items-center gap-4 flex-col">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center bg-secondary">
                    <CircleX size={34} className="text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-semibold">
                      Рецепты не найдены
                    </p>
                    <Hint
                      text={
                        lastIngredients?.ingredientsNumber == 0
                          ? "Не удалось распознать продукты на фотографии. Добавьте их вручную либо сфотографируйте их заново"
                          : "Для данных продуктов не получилось найти подходящие рецепты"
                      }
                      className="text-sm! mt-2"
                    />
                  </div>
                  <div className="flex flex-row justify-center items-center gap-4 w-full">
                    <Button
                      text="Добавить ингредиенты"
                      variant="primary"
                      onClick={() => setShowIngForm(true)}
                    />
                    <Link to={ScanRoute.to} className="w-full rounded-xl">
                      <Button
                        text="Сканировать заново"
                        variant="secondary"
                        nofocus
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
