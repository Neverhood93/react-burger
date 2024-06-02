import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";
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
  user: IUser | null;
  isLoggedIn: boolean;
  authLoading: boolean;
  authError: string | null;
  isAuthModalOpen: boolean;
  isForgotPasswordSent: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  authLoading: false,
  authError: null,
  isAuthModalOpen: false,
  isForgotPasswordSent: false,
};

const handlePending = (state: AuthState) => {
  state.authLoading = true;
  state.authError = null;
  state.isAuthModalOpen = true;
  state.isForgotPasswordSent = false;
};

const handleAuthFulfilled = (state: AuthState, action: PayloadAction<any>) => {
  if (action.payload?.user) {
    state.user = action.payload?.user;
  }
  if (action.payload?.accessToken) {
    localStorage.setItem("token", action.payload.accessToken);
  }
  if (action.payload?.refreshToken) {
    localStorage.setItem("refreshToken", action.payload.refreshToken);
  }
  state.authLoading = false;
  state.isLoggedIn = true;
  state.isAuthModalOpen = false;
};

const handleRejected = (state: AuthState, action: any) => {
  state.user = null;
  state.authLoading = false;
  state.isLoggedIn = false;
  state.authError = action?.error?.message || "Неизвестная ошибка";
  state.isAuthModalOpen = true;
  state.isForgotPasswordSent = false;
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
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, handleAuthFulfilled)
      .addCase(register.rejected, handleRejected)

      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, handleAuthFulfilled)
      .addCase(login.rejected, handleRejected)

      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        localStorage.setItem("token", "");
        localStorage.setItem("refreshToken", "");
        state.authLoading = false;
        state.isLoggedIn = false;
        state.isAuthModalOpen = false;
      })
      .addCase(logout.rejected, handleRejected)

      .addCase(forgotPassword.pending, handlePending)
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isForgotPasswordSent = true;
        state.authLoading = false;
        state.isAuthModalOpen = false;
      })
      .addCase(forgotPassword.rejected, handleRejected)

      .addCase(resetPassword.pending, (state) => {
        state.authLoading = true;
        state.authError = null;
        state.isAuthModalOpen = true;
      })
      .addCase(resetPassword.fulfilled, handleAuthFulfilled)
      .addCase(resetPassword.rejected, handleRejected)

      .addCase(getUser.pending, handlePending)
      .addCase(getUser.fulfilled, handleAuthFulfilled)
      .addCase(getUser.rejected, handleRejected)

      .addCase(editUser.pending, handlePending)
      .addCase(editUser.fulfilled, handleAuthFulfilled)
      .addCase(editUser.rejected, handleRejected)

      .addCase(refreshToken.pending, handlePending)
      .addCase(refreshToken.fulfilled, handleAuthFulfilled)
      .addCase(refreshToken.rejected, handleRejected);
  },
});

export const { closeAuthModal } = authSlice.actions;
