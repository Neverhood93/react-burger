import { IOrderResponse } from "../types/types";
import { baseApiConfig } from "./api-config";
import getResponse from "./api-utils";

export const postOrder = async (
  ingredientIds: string[],
): Promise<IOrderResponse> => {
  const res = await fetch(`${baseApiConfig.baseUrl}/orders`, {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify({ ingredients: ingredientIds }),
  });
  return getResponse(res, (data) => data as IOrderResponse);
};
