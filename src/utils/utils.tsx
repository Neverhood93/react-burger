import { useMemo } from "react";
import { useAppSelector } from "../services/hooks";
import { getIngredients } from "../services/ingredients/selectors";
import { IBurgerIngredient, IOrder } from "../types/types";

export const useOrderTotalPrice = (ingredientsIds: number[]): number => {
  const ingredients = useAppSelector(getIngredients);

  return useMemo(() => {
    return ingredientsIds.reduce((acc, ingredientId) => {
      const ingredient = ingredients.find(
        (ingredient: IBurgerIngredient) =>
          ingredient._id === ingredientId.toString(),
      );
      return ingredient ? acc + ingredient.price : acc;
    }, 0);
  }, [ingredientsIds, ingredients]);
};

export const filterOrdersWithValidIngredients = (
  orders: IOrder[],
  ingredients: IBurgerIngredient[],
): IOrder[] => {
  const ingredientIds = new Set(
    ingredients.map((ingredient) => ingredient._id),
  );

  return orders.filter((order) =>
    order.ingredients.every((ingredientId) =>
      ingredientIds.has(ingredientId.toString()),
    ),
  );
};
