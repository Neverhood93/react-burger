import { IBurgerIngredient, IIngredientsApiResponse } from "../types/types";
import { baseApiConfig } from "./api-config";
import getResponse from "./api-utils";

export const getIngredients = async (): Promise<IBurgerIngredient[]> => {
  const res = await fetch(`${baseApiConfig.baseUrl}/ingredients`, {
    headers: baseApiConfig.headers,
  });
  return getResponse(res, (data) => (data as IIngredientsApiResponse).data);
};
