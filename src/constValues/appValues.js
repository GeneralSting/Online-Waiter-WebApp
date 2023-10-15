import { countriesMap } from "./cafeCountryValues";

//value
export const emptyStringValue = "";
export const loginBtnDisabled = 2000;
export const otpLoginRequiredLength = 6;
export const DOT = ".";
export const UNDERSCORE = "_";
export const SLASH = "/";
export const categoryIdPartial = "category-id-";

//registration values
export const ownerRole = "owner";
export const drinkNoImage =
  "https://firebasestorage.googleapis.com/v0/b/online-waiter-db1c0.appspot.com/o/appImages%2Fstandard%2Fno_image.jpg?alt=media&token=34103017-4678-451f-acb2-6247186c6d07";
export const drinkNameMax = 25;
export const drinkDescriptionMax = 60;
export const drinkPriceMin = 0;
export const drinkPriceMax = 999999.99;
export const drinkQuantityMin = 0;
export const drinkQuantityMax = 999999999;
export const fileStateDefault = 0;
export const fileStateSuccess = 1;
export const fileStateWarning = 2;
export const fileStateInvalid = 3;
export const fileStateDanger = 4;

//error object
export const noCafeId = "";
export const noPhoneNumber = "";
export const errorSenderWeb = 1;

//error messages/titles
export const getRegNumbersFailedMessage =
  "Unsuccessful retrieving of registered numbers during user login";
export const getRegNumbersFailedTitle = "Collect registered numbers failed";

//theme
export const themeDarkString = "darkTheme";
export const themeLightString = "lightTheme";

//navigation
export const navigationHome = "/home";
export const navigationLogin = "/";
export const navigationRegistration = "/registration";

//localStorage
export const themeNameInStorage = "userTheme";
export const localeNameInStorage = "userLocale";
export const incrementNameInStorage = "webAppIncrement";
export const localPhoneCountryInStorage = "lastCountryLogin";
export const userLoggedinStorage = "userLogged";

//order status
export const currentOrderPending = 0;
export const currentOrderReady = 1;
export const currentOrderRemoved = 2;
export const currentOrderRemoveRequest = 3;

//payment dialog balance
export const paymentBalanceEqual = 1;
export const paymentBalanceGreater = 2;
export const paymentBalanceSmaller = 0;

//regex
export const regexFloatWithDot = /[^0-9]/g;
