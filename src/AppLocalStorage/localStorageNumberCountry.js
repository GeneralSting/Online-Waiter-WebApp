import { emptyStringValue, localPhoneCountryInStorage } from "../constValues/appValues";

export const setCountryLoginInStorage = (countryLogin) => {
    localStorage.setItem(localPhoneCountryInStorage, countryLogin);
}

export const getCountryLoginInStorage = () => {
    return localStorage.getItem(localPhoneCountryInStorage) || emptyStringValue;
}