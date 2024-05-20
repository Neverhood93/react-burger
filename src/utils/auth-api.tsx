import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
} from "../types/types";
import { baseApiConfig } from "./api-config";
import getResponse from "./api-utils";

export const loginEndpoint = async (
  requestData: LoginRequest,
): Promise<LoginResponse> => {
  const res = await fetch(`${baseApiConfig.baseUrl}/auth/login`, {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify(requestData),
  });
  return getResponse(res, (data) => data as LoginResponse);
};

export const registerEndpoint = async (
  requestData: RegisterRequest,
): Promise<LoginResponse> => {
  const res = await fetch(`${baseApiConfig.baseUrl}/auth/register`, {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify(requestData),
  });
  return getResponse(res, (data) => data as LoginResponse);
};

export const logoutEndpoint = async (
  refreshToken: string,
): Promise<LogoutResponse> => {
  const res = await fetch(`${baseApiConfig.baseUrl}/auth/logout`, {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify({ refreshToken }),
  });
  return getResponse(res, (data) => data as LogoutResponse);
};
