import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { navigationHome, navigationLogin } from "../constValues/appValues";
import { getUserLoggedInStorage, userIsLogged } from "../AppLocalStorage/localStorageLogin";
const UserLoggedRoute = ({ children }) => {
  const { user } = useUserAuth();
  console.log(getUserLoggedInStorage())
  if (getUserLoggedInStorage() !== userIsLogged && !user) {
    return <Navigate to={navigationHome} />;
  }
  return children;
};

export default UserLoggedRoute;
