import { incrementNameInStorage } from "../constValues/appValues";

export const setIncrementInStorage = (increment) => {
    localStorage.setItem(incrementNameInStorage, increment);
}

export const getIncrementInStorage = () => {
    return localStorage.getItem(incrementNameInStorage);
}

export const removeIncrementStorage = () => {
  localStorage.removeItem(incrementNameInStorage)
}