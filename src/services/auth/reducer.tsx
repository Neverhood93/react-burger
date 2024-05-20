import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/types";
import { login, register } from "./action";

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
      .addCase(login.pending, (state) => {
        state.user = null;
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.authLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.authLoading = false;
        state.authError = action?.error?.message as string;
        state.isLoggedIn = false;
      })

      .addCase(register.pending, (state) => {
        state.user = null;
        state.authLoading = true;
        state.authError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.authLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.user = null;
        state.authLoading = false;
        state.authError = action?.error?.message as string;
        state.isLoggedIn = false;
      });
  },
});
