import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig/firebase.config";
import { getRegisteredNumbers } from "../firebaseConfig/databaseRef";
import { FormattedMessage } from "react-intl";
import { messages } from "../messages/messages";
import showToast from "../messages/toastMessage";
import {
  emptyStringValue,
  errorSenderWeb,
  getRegNumbersFailedMessage,
  getRegNumbersFailedTitle,
  loginBtnDisabled,
  navigationHome,
  navigationRegistration,
  noCafeId,
  noPhoneNumber,
  otpLoginRequiredLength,
  themeLightString,
} from "../constValues/appValues";
import OtpInput from "react-otp-input";
import PhoneNumberInput from "./PhoneNumberInput";
import { Box, Button, Container, Grid, Paper } from "@mui/material";
import { useTheme } from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { isValidPhoneNumber } from "react-phone-number-input";
import { CustomIconButton } from "./styles/CustomIconButton";
import firebaseToastMessage from "../messages/toastFbMessages";
import { Oval, ProgressBar } from "react-loader-spinner";
import {
  getCountryLoginInStorage,
  setCountryLoginInStorage,
} from "../AppLocalStorage/localStorageNumberCountry";
import { setIncrementInStorage } from "../AppLocalStorage/localStorageIncrement";
import { getCurrentTime } from "../functions/currentTime";
import {
  getUserLoggedInStorage,
  setUserLoggedInStorage,
  userIsLogged,
  userNotLogged,
} from "../AppLocalStorage/localStorageLogin";

const Login = ({ selectedLocale, selectedTheme }) => {
  const {
    setUpRecaptha,
    resetRecaptcha,
    reportError,
    registeredCountries,
    user,
  } = useUserAuth();
  const theme = useTheme();
  const toastId = useRef(null);
  const navigate = useNavigate();

  const [otp, setOtp] = useState(emptyStringValue);
  const [otpConfirmObj, setOtpConfirmObj] = useState(emptyStringValue);
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneNumberBtn, setPhoneNumberBtn] = useState(false);
  const [otpDisabled, setOtpDisabled] = useState(true);
  const [otpBtnDisabled, setOtpBtnDisabled] = useState(true);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [loggedPhone, setLoggedPhone] = useState({});
  const [loginCountry, setLoginCountry] = useState(getCountryLoginInStorage());
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    resetRecaptcha();
  }, []);

  const collectRegisteredNumbers = () => {
    return new Promise((resolve, reject) => {
      const registeredNumbersRef = ref(database, getRegisteredNumbers());
      onValue(
        registeredNumbersRef,
        (snapshot) => {
          const matchedValue = findMatchingNumber(snapshot.val());
          resolve(matchedValue);
        },
        (err) => {
          showToast(messages[selectedLocale].appError, 4, toastId);
          reject(err);
          reportError(
            noCafeId,
            noPhoneNumber,
            getRegNumbersFailedMessage,
            getRegNumbersFailedTitle,
            errorSenderWeb,
            getCurrentTime()
          );
        }
      );
    });
  };

  function findMatchingNumber(registeredNumbers) {
    for (const cafeId in registeredNumbers) {
      if (registeredNumbers.hasOwnProperty(cafeId)) {
        const phoneObj = registeredNumbers[cafeId];
        if (phoneNumber in phoneObj) {
          return {
            cafeId: cafeId,
            phoneNumber: phoneObj[phoneNumber],
          };
        }
      }
    }
    return null; // If no match is found
  }

  const handleCountryChange = (countryCode) => {
    setLoginCountry(countryCode);
  };

  const handlePhoneNumber = (value) => {
    setPhoneNumber(value);
  };

  const sendPhoneNumber = async (event) => {
    event.preventDefault();
    setShowProgressBar(true);
    setPhoneNumberBtn(true);
    setTimeout(() => {
      setPhoneNumberBtn(false);
    }, loginBtnDisabled);
    if (phoneNumber === emptyStringValue || phoneNumber === undefined) {
      setShowProgressBar(false);
      return showToast(
        messages[selectedLocale].loginPhoneNumberErrorEmpty,
        3,
        toastId
      );
    } else if (!isValidPhoneNumber(phoneNumber)) {
      setShowProgressBar(false);
      return showToast(
        messages[selectedLocale].loginPhoneNumberInvalid,
        3,
        toastId
      );
    } else {
      const matchedNumber = await collectRegisteredNumbers();
      if (matchedNumber === null || matchedNumber === undefined) {
        setShowProgressBar(false);
        return showToast(
          messages[selectedLocale].LoginPhoneNumberNotRegistered,
          3,
          toastId
        );
      } else if (!matchedNumber.phoneNumber.allowed) {
        setShowProgressBar(false);
        return showToast(
          messages[selectedLocale].loginPhoneNumberDisabled,
          3,
          toastId
        );
      } else if (matchedNumber.phoneNumber.webAppRegistered > 0) {
        setUserLogged(true);
        showToast(messages[selectedLocale].loginPhoneNumberLogged, 3, toastId);
      }
      let phoneData = matchedNumber;
      phoneData.phoneNumber.number = phoneNumber;
      setLoggedPhone(phoneData);
      setOtpDisabled(false);
      sendOtp();
    }
  };

  const sendOtp = async () => {
    try {
      const response = await setUpRecaptha(phoneNumber);
      setOtpConfirmObj(response);
      setShowProgressBar(false);
    } catch (err) {
      //prijavi grešku
      setShowProgressBar(false);
      console.log(err.message);
      return firebaseToastMessage(err.code, toastId, selectedLocale);
    }
  };

  const handleOtpChange = (value) => {
    setOtp(value);
    if (value.length === 6) {
      setOtpBtnDisabled(false);
    } else {
      setOtpBtnDisabled(true);
    }
  };

  const handleOtpEnter = (event) => {
    if (event.keyCode === 13 && otp.length === otpLoginRequiredLength) {
      verifyOtp(null);
    }
  };

  const verifyOtp = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (otp === emptyStringValue || otp === null) {
      return showToast(messages[selectedLocale].loginOtpEmpty, 3, toastId);
    }
    try {
      await otpConfirmObj.confirm(otp);
      setCountryLoginInStorage(loginCountry);
      setIncrementInStorage(loggedPhone);
      setUserLoggedInStorage(userIsLogged);
      navigate(navigationHome, {
        state: {
          loggedPhone: loggedPhone,
        },
      });
    } catch (err) {
      console.log(err);
      firebaseToastMessage(err.code, toastId, selectedLocale);
      //prijavi grešku
    }
  };

  const isUserLogged = async () => {
    const matchedNumber = await collectRegisteredNumbers();
    let phoneData = matchedNumber;
    phoneData.phoneNumber.number = user.providerData[0].uid;
    navigate(navigationHome, {
      state: {
        loggedPhone: phoneData,
      },
    });
  };

  useEffect(() => {
    if (getUserLoggedInStorage() === userIsLogged) {
      if (user) {
        if (phoneNumber === undefined) {
          setPhoneNumber(user.providerData[0].uid);
        } else {
          isUserLogged();
        }
      }
    }
  }, [user, phoneNumber]);

  return (
    <div
      className={`login-background ${
        selectedTheme === themeLightString
          ? "login-background-light"
          : "login-background-dark"
      }`}
    >
      <Container style={{ paddingTop: "8rem" }}>
        <Box>
          <Grid container>
            <Grid item lg={3} md={1}></Grid>
            <Grid item lg={6} md={10}>
              {Object.keys(registeredCountries).length > 0 ? (
                <>
                  <Paper
                    elevation={20}
                    sx={{
                      backgroundColor: theme.body,
                      paddingBottom: "16px",
                    }}
                  >
                    <Grid container rowSpacing={4}>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <h1 style={{ color: theme.title, marginTop: 0 }}>
                          <FormattedMessage
                            id="loginPageTitle"
                            values={selectedLocale}
                          ></FormattedMessage>
                        </h1>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <PhoneNumberInput
                          selectedTheme={selectedTheme}
                          selectedLocale={selectedLocale}
                          valueUpdate={handlePhoneNumber}
                          defaultCountry={loginCountry}
                          phoneNumberCountries={Object.keys(
                            registeredCountries
                          )}
                          handleCountryChange={handleCountryChange}
                        />
                        <CustomIconButton
                          onClick={sendPhoneNumber}
                          disabled={phoneNumberBtn ? true : false}
                          sx={{ marginLeft: "0.5rem" }}
                        >
                          <SendIcon sx={{ color: theme.title }} />
                        </CustomIconButton>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {showProgressBar ? (
                          <ProgressBar
                            height="80"
                            width="80"
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{}}
                            wrapperClass="progress-bar-wrapper"
                            borderColor={theme.progressBarOutside}
                            barColor={theme.progressBarInside}
                          />
                        ) : (
                          <></>
                        )}
                      </Grid>
                      <Grid
                        xs={12}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <div id="recaptcha-container"></div>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <hr
                          className="loginSeparator"
                          style={{ color: theme.title }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      ></Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <OtpInput
                          value={otp}
                          onChange={handleOtpChange}
                          numInputs={6}
                          inputType="tel"
                          renderSeparator={
                            <span
                              className={`otp-separator ${
                                selectedTheme === themeLightString
                                  ? "otp-separator-light"
                                  : "otp-separator-dark"
                              }`}
                            >
                              -
                            </span>
                          }
                          renderInput={(props) => (
                            <input
                              {...props}
                              class="otp-container"
                              onKeyUp={handleOtpEnter}
                              disabled={otpDisabled ? true : false}
                            />
                          )}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {" "}
                        <Button
                          variant="contained"
                          color={userLogged ? "warning" : "primary"}
                          onClick={verifyOtp}
                          disabled={otpBtnDisabled ? true : false}
                        >
                          <FormattedMessage
                            id="loginPageOtpTitle"
                            values={selectedLocale}
                          />
                        </Button>
                        {userLogged && (
                          <p
                            className="errorText"
                            style={{ margin: "0.5rem 0 0 0" }}
                          >
                            <FormattedMessage
                              id="loginPhoneNumberLogged"
                              values={selectedLocale}
                            />
                          </p>
                        )}{" "}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ marginTop: "2rem" }}
                      >
                        <Link
                          to={navigationRegistration}
                          className="registration-link"
                        >
                          <h3
                            className="registration-link-text"
                            style={{
                              color: theme.title,
                              fontStyle: "italic",
                            }}
                          >
                            <FormattedMessage
                              id="loginRegistrationLink"
                              values={selectedLocale}
                            ></FormattedMessage>
                          </h3>
                        </Link>
                      </Grid>
                    </Grid>
                  </Paper>
                </>
              ) : (
                <Grid container rowSpacing={4}>
                  <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {" "}
                    <Oval
                      height="160"
                      width="160"
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass="progress-bar-wrapper"
                      secondaryColor={theme.progressBarOutside}
                      color={theme.progressBarInside}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid lg={3} md={1}></Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
