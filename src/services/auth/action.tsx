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
  registerEndpoint,
);

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/login",
  loginEndpoint,
);

export const logout = createAsyncThunk<CommonResponse, string>(
  "auth/logout",
  logoutEndpoint,
);

export const forgotPassword = createAsyncThunk<
  CommonResponse,
  ForgotPasswordRequest
>("auth/forgotPassword", forgotPasswordEndpoint);

export const resetPassword = createAsyncThunk<
  CommonResponse,
  ResetPasswordRequest
>("auth/resetPassword", resetPasswordEndpoint);

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
      return await getUserEndpoint(newAccessToken);
    } else {
      throw error;
    }
  }
});

export const editUser = createAsyncThunk<UserResponse, EditUserRequest>(
  "auth/editUser",
  editUserEndpoint,
);

export const refreshToken = createAsyncThunk<RefreshTokenResponse, string>(
  "auth/refreshToken",
  refreshTokenEndpoint,
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
