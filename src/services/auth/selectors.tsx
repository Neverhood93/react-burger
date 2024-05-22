import { RootState } from "../store";

export const getIsAuthModalOpen = (state: RootState) =>
  state.auth.isAuthModalOpen;
export const getIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const getCurrentUser = (state: RootState) => state.auth.user;

export const getAuthLoading = (state: RootState) => state.auth.authLoading;
export const getAuthError = (state: RootState) => state.auth.authError;
