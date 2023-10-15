import { userLoggedinStorage } from "../constValues/appValues";

export const setUserLoggedInStorage = (isLogged) => {
  localStorage.setItem(userLoggedinStorage, isLogged);
}

export const getUserLoggedInStorage = () => {
  return localStorage.getItem(userLoggedinStorage);
}

export const userIsLogged = "true";
export const userNotLogged = "false";