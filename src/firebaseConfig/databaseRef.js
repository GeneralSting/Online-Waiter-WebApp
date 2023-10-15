/*------------------appErrors---------------*/
const appErrorsPath = "appErrors/";

export const getAppErrors = () => {
    return appErrorsPath;
}

export const getAppError = (errorId) => {
    return getAppErrors() + errorId;
}

/*------------------cafes-------------------*/
const cafesPath = "cafes/";
const currentOrdersPath = "/cafeCurrentOrders/";
const currentOrderMakerNumPath = "/currentOrderMakerNum/";
const currentOrderMakerEmployeePath = "/currentOrderMakerEmployee/";
const currentOrderStatusPath = "/currentOrderStatus/";
const currentOrderMessagePath = "/currentOrderMessage/";
const cafeBillsPath = "/cafeBills/";
const cafeCountryPath = "/cafeCountry/";
const drinksCategoriesPath = "drinksCategories/";

export const getCafeDrinksCategories = () => {
    return drinksCategoriesPath;
}

export const getCafeCurrentOrders = (cafeId) => {
    return getCafes() + cafeId + currentOrdersPath;
}
export const getCafeCurrentOrder = (cafeId, orderId) => {
    return getCafeCurrentOrders(cafeId) + orderId;
}

export const getCurrentOrderMaker = (cafeId, orderId) => {
    return getCafeCurrentOrders(cafeId) + orderId + currentOrderMakerNumPath;
}

export const getCurrentOrderMakerEmployee = (cafeId, orderId) => {
    return getCafeCurrentOrders(cafeId) + orderId + currentOrderMakerEmployeePath;
}

export const getCurrentOrderStatus = (cafeId, orderId) => {
    return getCafeCurrentOrders(cafeId) + orderId + currentOrderStatusPath;
}

export const getCurrentOrderMessage = (cafeId, orderId) => {
    return getCafeCurrentOrder(cafeId, orderId) + currentOrderMessagePath;
}

export const getCafeBills = (cafeId) => {
    return getCafe(cafeId) + cafeBillsPath;
}

export const getCafeBill = (cafeId, cafeBillId) => {
    return getCafeBills(cafeId) + cafeBillId;
}

export const getCafes = () => {
    return cafesPath;
}

export const getCafe = (cafeId) => {
    return getCafes() + cafeId;
}

export const getCafeCountry = (cafeId) => {
    return getCafe(cafeId) + cafeCountryPath;
}

/*------------------registeredCountries-------------------*/
const registeredCountriesPath = "registeredCountries/";

export const getRegisteredNumbers = () => {
    return registeredNumbersPath;
}

export const getRegisteredNumber = (numberId) => {
    return getRegisteredNumbers() + numberId;
}

export const getNumberWebAppRegistered = (cafeId, phoneNumber) => {
    return getRegisteredNumbers() + cafeId + "/" + phoneNumber + "/" + registeredNumberWebPath;
}

/*------------------registeredNumbers-------------------*/
const registeredNumbersPath = "registeredNumbers/";
const registeredNumberWebPath = "/webAppRegistered";

export const getRegisteredCountry = (countryCode) => {
    return registeredCountriesPath + countryCode
}

export const getRegisteredCountries = () => {
    return registeredCountriesPath;
}

/*-------------------storage App files--------------------*/
const appFilesPath = "appFiles/";
const menuDrinksExamplePath = "objectDrinksExample_";
const menuDrinksExampleExstension = ".xlsx";

export const getAppFiles = () => {
    return appFilesPath;
}

export const getMenuExampleExstenstion = () => {
    return menuDrinksExampleExstension;
}

export const getMenuDrinksExample = (localization) => {
    return getAppFiles() + menuDrinksExamplePath + localization + menuDrinksExampleExstension;
}