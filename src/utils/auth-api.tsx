import {
  ICommonResponse,
  IUserResponse,
  ILoginRequest,
  ILoginResponse,
  IRefreshTokenResponse,
  IRegisterRequest,
  IResetPasswordRequest,
  IEditUserRequest,
  IForgotPasswordRequest,
} from "../types/types";
import { baseApiConfig } from "./api-config";
import getResponse from "./api-utils";

async function request<TResponse>(
  endpoint: string,
  options: RequestInit,
): Promise<TResponse> {
  const url = `${baseApiConfig.baseUrl}${endpoint}`;
  const res = await fetch(url, options);
  return getResponse(res, (data) => data as TResponse);
}

export const registerEndpoint = async (
  requestData: IRegisterRequest,
): Promise<ILoginResponse> => {
  return await request<ILoginResponse>("/auth/register", {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify(requestData),
  });
};

export const loginEndpoint = async (
  requestData: ILoginRequest,
): Promise<ILoginResponse> => {
  return await request<ILoginResponse>("/auth/login", {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify(requestData),
  });
};

export const logoutEndpoint = async (
  token: string,
): Promise<ICommonResponse> => {
  return await request<ICommonResponse>("/auth/logout", {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify({ token }),
  });
};

export const forgotPasswordEndpoint = async (
  requestData: IForgotPasswordRequest,
): Promise<ICommonResponse> => {
  return await request<ICommonResponse>("/password-reset", {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify(requestData),
  });
};

export const resetPasswordEndpoint = async (
  requestData: IResetPasswordRequest,
): Promise<ICommonResponse> => {
  return await request<ICommonResponse>("/password-reset/reset", {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify(requestData),
  });
};

export const getUserEndpoint = async (
  accessToken: string,
): Promise<IUserResponse> => {
  return await request<IUserResponse>("/auth/user", {
    method: "GET",
    headers: {
      ...baseApiConfig.headers,
      Authorization: accessToken,
    },
  });
};

export const editUserEndpoint = async (
  requestData: IEditUserRequest,
): Promise<IUserResponse> => {
  return await request<IUserResponse>("/auth/user", {
    method: "PATCH",
    headers: {
      ...baseApiConfig.headers,
      Authorization: requestData.accessToken,
    },
    body: JSON.stringify(requestData.registerRequestData),
  });
};

export const refreshTokenEndpoint = async (
  refreshToken: string,
): Promise<IRefreshTokenResponse> => {
  return await request<IRefreshTokenResponse>("/auth/token", {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify({ token: refreshToken }),
  });
};
