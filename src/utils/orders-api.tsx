import { IGetOrderResponse, IOrderResponse } from "../types/types";
import { baseApiConfig } from "./api-config";
import getResponse from "./api-utils";

export const postOrder = async (
  ingredientIds: string[],
): Promise<IOrderResponse> => {
  const res = await fetch(`${baseApiConfig.baseUrl}/orders`, {
    method: "POST",
    headers: {
      ...baseApiConfig.headers,
      Authorization: localStorage.getItem("token") || "",
    },
    body: JSON.stringify({ ingredients: ingredientIds }),
  });
  return getResponse(res, (data) => data as IOrderResponse);
};

export const getOrder = async (
  orderNumber: number,
): Promise<IGetOrderResponse> => {
  const res = await fetch(`${baseApiConfig.baseUrl}/orders/${orderNumber}`, {
    method: "GET",
    headers: baseApiConfig.headers,
  });
  return getResponse(res, (data) => data as IGetOrderResponse);
};
