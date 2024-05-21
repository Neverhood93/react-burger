import { RootState } from "../store";

export const getIsAuthModalOpen = (state: RootState) =>
  state.auth.isAuthModalOpen;

export const getAuthLoading = (state: RootState) => state.auth.authLoading;
export const getAuthError = (state: RootState) => state.auth.authError;
