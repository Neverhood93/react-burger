import React from "react";
import { useAppSelector } from "../../services/hooks";
import { getAuthLoading, getCurrentUser } from "../../services/auth/selectors";
import { Navigate, useLocation } from "react-router-dom";
import Preloader from "../common/preloader/preloader";
import { IProtectedRoute } from "../../types/types";

const ProtectedRoute: React.FC<IProtectedRoute> = ({
  onlyUnAuth = false,
  component,
}: IProtectedRoute): React.ReactElement | null => {
  const isAuthLoading = useAppSelector(getAuthLoading);
  const user = useAppSelector(getCurrentUser);
  const location = useLocation();

  if (isAuthLoading) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = (location.state as { from: { pathname: string } }) || {
      from: { pathname: "/" },
    };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{component}</>;
};

export const AuthRoute: React.FC<{ component: React.ReactNode }> = ({
  component,
}) => <ProtectedRoute component={component} />;

export const UnAuthRoute: React.FC<{ component: React.ReactNode }> = ({
  component,
}) => <ProtectedRoute onlyUnAuth={true} component={component} />;
