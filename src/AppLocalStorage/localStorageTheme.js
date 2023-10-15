import { themeNameInStorage } from "../constValues/appValues";

export const setThemeInStorage = (theme) => {
    localStorage.setItem(themeNameInStorage, theme);
}

export const getThemeInStorage = () => {
    return localStorage.getItem(themeNameInStorage);
}