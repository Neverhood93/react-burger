import { authSlice, initialState, closeAuthModal } from "./reducer";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUser,
  editUser,
  refreshToken,
} from "./action";

describe("authSlice", () => {
  test("should return the initial state", () => {
    expect(authSlice.reducer(undefined, { type: undefined })).toEqual(
      initialState,
    );
  });

  test("should handle closeAuthModal", () => {
    const previousState = { ...initialState, isAuthModalOpen: true };
    expect(authSlice.reducer(previousState, closeAuthModal())).toEqual({
      ...initialState,
      isAuthModalOpen: false,
    });
  });

  const handlePendingTest = (actionType) => {
    const action = { type: actionType };
    const state = authSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      authLoading: true,
      authError: null,
      isAuthModalOpen: true,
      isForgotPasswordSent: false,
    });
  };

  test("should handle register.pending", () => {
    handlePendingTest(register.pending.type);
  });

  test("should handle login.pending", () => {
    handlePendingTest(login.pending.type);
  });

  test("should handle logout.pending", () => {
    handlePendingTest(logout.pending.type);
  });

  test("should handle forgotPassword.pending", () => {
    handlePendingTest(forgotPassword.pending.type);
  });

  test("should handle resetPassword.pending", () => {
    const action = { type: resetPassword.pending.type };
    const state = authSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      authLoading: true,
      authError: null,
      isAuthModalOpen: true,
    });
  });

  test("should handle getUser.pending", () => {
    handlePendingTest(getUser.pending.type);
  });

  test("should handle editUser.pending", () => {
    handlePendingTest(editUser.pending.type);
  });

  test("should handle refreshToken.pending", () => {
    handlePendingTest(refreshToken.pending.type);
  });

  const handleAuthFulfilledTest = (actionType, payload) => {
    const action = { type: actionType, payload };
    const state = authSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: payload.user,
      isLoggedIn: true,
      authLoading: false,
      isAuthModalOpen: false,
    });
    expect(localStorage.getItem("token")).toEqual(payload.accessToken);
    expect(localStorage.getItem("refreshToken")).toEqual(payload.refreshToken);
  };

  test("should handle register.fulfilled", () => {
    const payload = {
      success: true,
      user: { email: "test@test.com", name: "Test User" },
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
    handleAuthFulfilledTest(register.fulfilled.type, payload);
  });

  test("should handle login.fulfilled", () => {
    const payload = {
      success: true,
      user: { email: "test@test.com", name: "Test User" },
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
    handleAuthFulfilledTest(login.fulfilled.type, payload);
  });

  test("should handle logout.fulfilled", () => {
    const action = { type: logout.fulfilled.type };
    const state = authSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      isLoggedIn: false,
      authLoading: false,
      isAuthModalOpen: false,
    });
    expect(localStorage.getItem("token")).toEqual("");
    expect(localStorage.getItem("refreshToken")).toEqual("");
  });

  const handleRejectedTest = (actionType, errorMessage) => {
    const action = { type: actionType, error: { message: errorMessage } };
    const state = authSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      authLoading: false,
      isLoggedIn: false,
      authError: errorMessage,
      isAuthModalOpen: true,
      isForgotPasswordSent: false,
    });
  };

  test("should handle register.rejected", () => {
    handleRejectedTest(register.rejected.type, "Registration failed");
  });

  test("should handle login.rejected", () => {
    handleRejectedTest(login.rejected.type, "Login failed");
  });

  test("should handle logout.rejected", () => {
    handleRejectedTest(logout.rejected.type, "Logout failed");
  });

  test("should handle forgotPassword.rejected", () => {
    handleRejectedTest(forgotPassword.rejected.type, "Forgot password failed");
  });

  test("should handle resetPassword.rejected", () => {
    handleRejectedTest(resetPassword.rejected.type, "Reset password failed");
  });

  test("should handle getUser.rejected", () => {
    handleRejectedTest(getUser.rejected.type, "Get user failed");
  });

  test("should handle editUser.rejected", () => {
    handleRejectedTest(editUser.rejected.type, "Edit user failed");
  });

  test("should handle refreshToken.rejected", () => {
    handleRejectedTest(refreshToken.rejected.type, "Refresh token failed");
  });

  test("should handle forgotPassword.fulfilled", () => {
    const action = { type: forgotPassword.fulfilled.type };
    const state = authSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isForgotPasswordSent: true,
      authLoading: false,
      isAuthModalOpen: false,
    });
  });

  test("should handle getUser.fulfilled", () => {
    const payload = {
      success: true,
      user: { email: "test@test.com", name: "Test User" },
    };
    const action = { type: getUser.fulfilled.type, payload };
    const state = authSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: payload.user,
      isLoggedIn: true,
      authLoading: false,
      isAuthModalOpen: false,
    });
  });

  test("should handle refreshToken.fulfilled", () => {
    const payload = {
      success: true,
      accessToken: "newAccessToken",
      refreshToken: "newRefreshToken",
    };
    const action = { type: refreshToken.fulfilled.type, payload };
    const state = authSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoggedIn: true,
      authLoading: false,
      isAuthModalOpen: false,
    });
    expect(localStorage.getItem("token")).toEqual(payload.accessToken);
    expect(localStorage.getItem("refreshToken")).toEqual(payload.refreshToken);
  });
});
