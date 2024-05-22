import {
  CommonResponse,
  UserResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
  ResetPasswordRequest,
  EditUserRequest,
} from "../types/types";
import { baseApiConfig } from "./api-config";
import getResponse from "./api-utils";

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

export const logoutEndpoint = async (
  refreshToken: string,
): Promise<CommonResponse> => {
  const res = await fetch(`${baseApiConfig.baseUrl}/auth/logout`, {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify({ refreshToken }),
  });
  return getResponse(res, (data) => data as CommonResponse);
};

export const forgotPasswordEndpoint = async (
  email: string,
): Promise<CommonResponse> => {
  const res = await fetch(`${baseApiConfig.baseUrl}/auth/forgot-password`, {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify({ email }),
  });
  return getResponse(res, (data) => data as CommonResponse);
};

export const resetPasswordEndpoint = async (
  requestData: ResetPasswordRequest,
): Promise<CommonResponse> => {
  const res = await fetch(`${baseApiConfig.baseUrl}/auth/reset-password`, {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify(requestData),
  });
  return getResponse(res, (data) => data as CommonResponse);
};

export const getUserEndpoint = async (
  accessToken: string,
): Promise<UserResponse> => {
  const res = await fetch(`${baseApiConfig.baseUrl}/auth/user`, {
    method: "GET",
    headers: {
      ...baseApiConfig.headers,
      Authorization: accessToken,
    },
  });
  return getResponse(res, (data) => data as UserResponse);
};

export const editUserEndpoint = async (
  requestData: EditUserRequest,
): Promise<UserResponse> => {
  const res = await fetch(`${baseApiConfig.baseUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      ...baseApiConfig.headers,
      Authorization: requestData.accessToken,
    },
    body: JSON.stringify(requestData.registerRequestData),
  });
  return getResponse(res, (data) => data as UserResponse);
};

export const refreshTokenEndpoint = async (
  refreshToken: string,
): Promise<RefreshTokenResponse> => {
  const res = await fetch(`${baseApiConfig.baseUrl}/auth/token`, {
    method: "POST",
    headers: baseApiConfig.headers,
    body: JSON.stringify({ refreshToken }),
  });
  return getResponse(res, (data) => data as RefreshTokenResponse);
};
