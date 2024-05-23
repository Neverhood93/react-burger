import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CommonResponse,
  EditUserRequest,
  ForgotPasswordRequest,
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
import { AppDispatch } from "../store";

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

export const forgotPassword = createAsyncThunk<
  CommonResponse,
  ForgotPasswordRequest
>("auth/forgotPassword", async (requestData) => {
  return await forgotPasswordEndpoint(requestData);
});

export const resetPassword = createAsyncThunk<
  CommonResponse,
  ResetPasswordRequest
>("auth/resetPassword", async (requestData) => {
  return await resetPasswordEndpoint(requestData);
});

export const getUser = createAsyncThunk<
  UserResponse,
  string,
  { dispatch: AppDispatch }
>("auth/getUser", async (accessToken, { dispatch }) => {
  try {
    return await getUserEndpoint(accessToken);
  } catch (error: any) {
    if (error.message === "jwt expired") {
      const refreshTokenValue = localStorage.getItem("refreshToken") || "";
      await dispatch(refreshToken(refreshTokenValue));
      const newAccessToken = localStorage.getItem("token") || "";
      const newResult = await getUserEndpoint(newAccessToken);
      return newResult;
    } else {
      throw error;
    }
  }
});

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

export const checkUserAuth = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>("auth/checkUserAuth", async (_, { dispatch }) => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    dispatch(getUser(accessToken));
  }
});
