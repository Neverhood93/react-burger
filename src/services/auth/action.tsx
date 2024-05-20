import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
} from "../../types/types";
import {
  loginEndpoint,
  logoutEndpoint,
  registerEndpoint,
} from "../../utils/auth-api";

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/login",
  async (requestData) => {
    return await loginEndpoint(requestData);
  },
);

export const register = createAsyncThunk<LoginResponse, RegisterRequest>(
  "auth/register",
  async (requestData) => {
    return await registerEndpoint(requestData);
  },
);

export const logout = createAsyncThunk<LogoutResponse, string>(
  "auth/logout",
  async (refreshToken) => {
    return await logoutEndpoint(refreshToken);
  },
);
