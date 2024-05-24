import {
  CommonResponse,
  UserResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
  ResetPasswordRequest,
  EditUserRequest,
  ForgotPasswordRequest,
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
  requestData: RegisterRequest,
): Promise<LoginResponse> => {
  return await request<LoginResponse>("/auth/register", {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify(requestData),
  });
};

export const loginEndpoint = async (
  requestData: LoginRequest,
): Promise<LoginResponse> => {
  return await request<LoginResponse>("/auth/login", {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify(requestData),
  });
};

export const logoutEndpoint = async (
  token: string,
): Promise<CommonResponse> => {
  return await request<CommonResponse>("/auth/logout", {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify({ token }),
  });
};

export const forgotPasswordEndpoint = async (
  requestData: ForgotPasswordRequest,
): Promise<CommonResponse> => {
  return await request<CommonResponse>("/password-reset", {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify(requestData),
  });
};

export const resetPasswordEndpoint = async (
  requestData: ResetPasswordRequest,
): Promise<CommonResponse> => {
  return await request<CommonResponse>("/password-reset/reset", {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify(requestData),
  });
};

export const getUserEndpoint = async (
  accessToken: string,
): Promise<UserResponse> => {
  return await request<UserResponse>("/auth/user", {
    method: "GET",
    headers: {
      ...baseApiConfig.headers,
      Authorization: accessToken,
    },
  });
};

export const editUserEndpoint = async (
  requestData: EditUserRequest,
): Promise<UserResponse> => {
  return await request<UserResponse>("/auth/user", {
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
): Promise<RefreshTokenResponse> => {
  return await request<RefreshTokenResponse>("/auth/token", {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify({ token: refreshToken }),
  });
};
