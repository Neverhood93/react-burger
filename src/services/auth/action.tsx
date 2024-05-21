import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CommonResponse,
  EditUserRequest,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
  ResetPasswordRequest,
  UserResponse,
} from "../../types/types";
import {
  editUserEndpoint,
  forgotPasswordEndpoint,
  getUserEndpoint,
  loginEndpoint,
  logoutEndpoint,
  refreshTokenEndpoint,
  registerEndpoint,
  resetPasswordEndpoint,
} from "../../utils/auth-api";

export const register = createAsyncThunk<LoginResponse, RegisterRequest>(
  "auth/register",
  async (requestData) => {
    return await registerEndpoint(requestData);
  },
);

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/login",
  async (requestData) => {
    return await loginEndpoint(requestData);
  },
);

export const logout = createAsyncThunk<CommonResponse, string>(
  "auth/logout",
  async (refreshToken) => {
    return await logoutEndpoint(refreshToken);
  },
);

export const forgotPassword = createAsyncThunk<CommonResponse, string>(
  "auth/forgotPassword",
  async (email) => {
    return await forgotPasswordEndpoint(email);
  },
);

export const resetPassword = createAsyncThunk<
  CommonResponse,
  ResetPasswordRequest
>("auth/resetPassword", async (requestData) => {
  return await resetPasswordEndpoint(requestData);
});

export const getUser = createAsyncThunk<UserResponse, string>(
  "auth/getUser",
  async (accessToken) => {
    return await getUserEndpoint(accessToken);
  },
);

export const editUser = createAsyncThunk<UserResponse, EditUserRequest>(
  "auth/editUser",
  async (requestData) => {
    return await editUserEndpoint(requestData);
  },
);

export const refreshToken = createAsyncThunk<RefreshTokenResponse, string>(
  "auth/refreshToken",
  async (refreshToken) => {
    return await refreshTokenEndpoint(refreshToken);
  },
);
