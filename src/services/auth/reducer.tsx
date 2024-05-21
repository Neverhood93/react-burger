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
  isAuthModalOpen: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  authLoading: false,
  authError: null,
  isAuthModalOpen: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.user = null;
        state.authLoading = true;
        state.authError = null;
        state.isAuthModalOpen = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        localStorage.setItem("token", action.payload?.accessToken);
        localStorage.setItem("refreshToken", action.payload?.refreshToken);
        state.authLoading = false;
        state.isLoggedIn = true;
        state.isAuthModalOpen = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.user = null;
        state.authLoading = false;
        state.isLoggedIn = false;
        state.authError = action?.error?.message as string;
        state.isAuthModalOpen = true;
      })

      .addCase(login.pending, (state) => {
        state.user = null;
        state.authLoading = true;
        state.authError = null;
        state.isAuthModalOpen = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        localStorage.setItem("token", action.payload?.accessToken);
        localStorage.setItem("refreshToken", action.payload?.refreshToken);
        state.authLoading = false;
        state.isLoggedIn = true;
        state.isAuthModalOpen = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.authLoading = false;
        state.isLoggedIn = false;
        state.authError = action?.error?.message as string;
        state.isAuthModalOpen = true;
      })

      .addCase(logout.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
        state.isAuthModalOpen = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        localStorage.setItem("token", "");
        localStorage.setItem("refreshToken", "");
        state.authLoading = false;
        state.isLoggedIn = false;
        state.isAuthModalOpen = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.user = null;
        state.authLoading = false;
        state.isLoggedIn = false;
        state.authError = action?.error?.message as string;
        state.isAuthModalOpen = true;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
        state.isAuthModalOpen = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isAuthModalOpen = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action?.error?.message as string;
        state.isAuthModalOpen = true;
      })

      .addCase(resetPassword.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
        state.isAuthModalOpen = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.authLoading = false;
        state.isAuthModalOpen = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action?.error?.message as string;
        state.isAuthModalOpen = true;
      })

      .addCase(getUser.pending, (state) => {
        state.user = null;
        state.authLoading = true;
        state.authError = null;
        state.isAuthModalOpen = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.authLoading = false;
        state.isLoggedIn = true;
        state.isAuthModalOpen = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = null;
        state.authLoading = false;
        state.isLoggedIn = false;
        state.authError = action?.error?.message as string;
        state.isAuthModalOpen = true;
      })

      .addCase(editUser.pending, (state) => {
        state.user = null;
        state.authLoading = true;
        state.authError = null;
        state.isAuthModalOpen = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.authLoading = false;
        state.isLoggedIn = true;
        state.isAuthModalOpen = false;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.user = null;
        state.authLoading = false;
        state.isLoggedIn = false;
        state.authError = action?.error?.message as string;
        state.isAuthModalOpen = true;
      })

      .addCase(refreshToken.pending, (state) => {
        state.authError = null;
        state.isAuthModalOpen = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload?.accessToken);
        localStorage.setItem("refreshToken", action.payload?.refreshToken);
        state.authLoading = false;
        state.isLoggedIn = true;
        state.isAuthModalOpen = false;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        localStorage.setItem("token", "");
        localStorage.setItem("refreshToken", "");
        state.authLoading = false;
        state.isLoggedIn = false;
        state.authError = action?.error?.message as string;
        state.isAuthModalOpen = true;
      });
  },
});

export const { closeAuthModal } = authSlice.actions;
