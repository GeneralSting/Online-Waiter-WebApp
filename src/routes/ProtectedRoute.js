import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { navigationLogin } from "../constValues/appValues";
import { getUserLoggedInStorage, userIsLogged } from "../AppLocalStorage/localStorageLogin";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  if (getUserLoggedInStorage() !== userIsLogged && !user) {
    return <Navigate to={navigationLogin} />;
  }
  return children;
};

export default ProtectedRoute;
