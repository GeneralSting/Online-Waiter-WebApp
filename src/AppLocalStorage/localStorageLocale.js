import { localeNameInStorage } from "../constValues/appValues";
import { defaultLocale } from "../messages/messages";

export const setLocaleInStorage = (locale) => {
    localStorage.setItem(localeNameInStorage, locale);
}

export const getLocaleInStorage = () => {
    return localStorage.getItem(localeNameInStorage) || defaultLocale;
}