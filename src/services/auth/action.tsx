import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ICommonResponse,
  IEditUserRequest,
  IForgotPasswordRequest,
  ILoginRequest,
  ILoginResponse,
  IRefreshTokenResponse,
  IRegisterRequest,
  IResetPasswordRequest,
  IUserResponse,
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

export const register = createAsyncThunk<ILoginResponse, IRegisterRequest>(
  "auth/register",
  registerEndpoint,
);

export const login = createAsyncThunk<ILoginResponse, ILoginRequest>(
  "auth/login",
  loginEndpoint,
);

export const logout = createAsyncThunk<ICommonResponse, string>(
  "auth/logout",
  logoutEndpoint,
);

export const forgotPassword = createAsyncThunk<
  ICommonResponse,
  IForgotPasswordRequest
>("auth/forgotPassword", forgotPasswordEndpoint);

export const resetPassword = createAsyncThunk<
  ICommonResponse,
  IResetPasswordRequest
>("auth/resetPassword", resetPasswordEndpoint);

export const getUser = createAsyncThunk<
  IUserResponse,
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

export const editUser = createAsyncThunk<IUserResponse, IEditUserRequest>(
  "auth/editUser",
  editUserEndpoint,
);

export const refreshToken = createAsyncThunk<IRefreshTokenResponse, string>(
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
