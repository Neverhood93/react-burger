import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import HomePage from "../../pages/home/homePage";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "../../pages/login/loginPage";
import RegisterPage from "../../pages/register/registerPage";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import NotFoundPage from "../../pages/not-found/not-found";
import Modal from "../modal/modal";
import IngredientDetailsPage from "../../pages/ingredient-details/ingredient-details";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  getIngredients,
  getIngredientsError,
  getIngredientsLoading,
} from "../../services/ingredients/selectors";
import { loadIngredients } from "../../services/ingredients/actions";
import Preloader from "../common/preloader/preloader";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrdersPage from "../../pages/orders/orders";
import { AuthRoute, UnAuthRoute } from "../protected-route/protected-route";
import { checkUserAuth } from "../../services/auth/action";

function App() {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(getIngredients);
  const loading = useAppSelector(getIngredientsLoading);
  const error = useAppSelector(getIngredientsError);

  useEffect(() => {
    dispatch(loadIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleCloseIngredientClick = () => {
    navigate(-1);
  };

  if (loading) return <Preloader />;

  if (error) return <p>Ошибка: {error}</p>;

  if (!ingredients || ingredients.length === 0) return <p>Нет ингредиентов</p>;

  return (
    <>
      <AppHeader />

      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />

        <Route
          path="/login"
          element={<UnAuthRoute component={<LoginPage />} />}
        />
        <Route
          path="/register"
          element={<UnAuthRoute component={<RegisterPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<UnAuthRoute component={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<UnAuthRoute component={<ResetPasswordPage />} />}
        />

        <Route
          path="/profile"
          element={<AuthRoute component={<ProfilePage />} />}
        />
        <Route
          path="/orders"
          element={<AuthRoute component={<OrdersPage />} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                title="Детали ингредиента"
                onClose={handleCloseIngredientClick}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
