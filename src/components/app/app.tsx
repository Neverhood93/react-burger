import React from "react";
import AppHeader from "../app-header/app-header";
import HomePage from "../../pages/home/homePage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/login/loginPage";
import RegisterPage from "../../pages/register/registerPage";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";

function App() {
  return (
    <>
      <AppHeader />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login " element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
