import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/types";
import {
  editUser,
  forgotPassword,
  getUser,
  login,
  logout,
  refreshToken,
  register,
  resetPassword,
} from "./action";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  authLoading: boolean;
  authError: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  authLoading: false,
  authError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.user = null;
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        localStorage.setItem("token", action.payload?.accessToken);
        localStorage.setItem("refreshToken", action.payload?.refreshToken);
        state.authLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.user = null;
        state.authLoading = false;
        state.isLoggedIn = false;
        state.authError = action?.error?.message as string;
      })

      .addCase(login.pending, (state) => {
        state.user = null;
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        localStorage.setItem("token", action.payload?.accessToken);
        localStorage.setItem("refreshToken", action.payload?.refreshToken);
        state.authLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.authLoading = false;
        state.isLoggedIn = false;
        state.authError = action?.error?.message as string;
      })

      .addCase(logout.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        localStorage.setItem("token", "");
        localStorage.setItem("refreshToken", "");
        state.authLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.user = null;
        state.authLoading = false;
        state.isLoggedIn = false;
        state.authError = action?.error?.message as string;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.authLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action?.error?.message as string;
      })

      .addCase(resetPassword.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.authLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action?.error?.message as string;
      })

      .addCase(getUser.pending, (state) => {
        state.user = null;
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.authLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = null;
        state.authLoading = false;
        state.isLoggedIn = false;
        state.authError = action?.error?.message as string;
      })

      .addCase(editUser.pending, (state) => {
        state.user = null;
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.authLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.user = null;
        state.authLoading = false;
        state.isLoggedIn = false;
        state.authError = action?.error?.message as string;
      })

      .addCase(refreshToken.pending, (state) => {
        state.authError = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload?.accessToken);
        localStorage.setItem("refreshToken", action.payload?.refreshToken);
        state.authLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        localStorage.setItem("token", "");
        localStorage.setItem("refreshToken", "");
        state.authLoading = false;
        state.isLoggedIn = false;
        state.authError = action?.error?.message as string;
      });
  },
});
