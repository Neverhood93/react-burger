import { BurgerIngredient } from "../types/types";

const ingredientsApiConfig = {
  baseUrl: "https://norma.nomoreparties.space/api/ingredients",
  headers: {
    "Content-Type": "application/json",
  },
};

interface IngredientsApiResponse {
  data: BurgerIngredient[];
}

const getResponse = async (res: Response): Promise<BurgerIngredient[]> => {
  if (res.ok) {
    const result: IngredientsApiResponse = await res.json();
    return result.data;
  }
  throw new Error(`Ошибка ${res.status}`);
};

export const getIngredients = async (): Promise<BurgerIngredient[]> => {
  const res = await fetch(`${ingredientsApiConfig.baseUrl}`, {
    headers: ingredientsApiConfig.headers,
  });
  return getResponse(res);
};
