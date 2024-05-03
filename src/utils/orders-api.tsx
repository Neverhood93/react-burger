import { OrderResponse } from "../types/types";

const apiConfig = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

const getResponse = async (res: Response): Promise<OrderResponse> => {
  if (res.ok) {
    const result: OrderResponse = await res.json();
    return result;
  }
  throw new Error(`Ошибка ${res.status}`);
};

export const postOrder = async (
  ingredientIds: string[],
): Promise<OrderResponse> => {
  const res = await fetch(`${apiConfig.baseUrl}/orders`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({ ingredients: ingredientIds }),
  });
  return getResponse(res);
};
