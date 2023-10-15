import { FormEvent, useState, useEffect, useRef } from "react";
import React from "react";
import ObjectMenuForm from "./ObjectMenuForm.tsx";
import ObjectForm from "./ObjectForm.tsx";
import UserForm from "./UserForm.tsx";
import useMultiStepForm from "./useMultiStepForm.ts";
import "./formInput.css";
import { ownerRole, themeLightString } from "../../constValues/appValues.js";
import { Box, Container, Grid, Paper } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useTheme } from "styled-components";
import { get, push, ref, set } from "firebase/database";
import { database } from "../../firebaseConfig/firebase.config.js";
import {
  getCafes,
  getRegisteredNumber,
  getRegisteredCountries,
} from "../../firebaseConfig/databaseRef.js";
import showToast from "../../messages/toastMessage.js";
import { messages } from "../../messages/messages.js";
import { Category, FormData } from "./RegistrationDataTypes.js";

const INITIAL_DATA: FormData = {
  cafeOwnerName: "",
  cafeOwnerLastName: "",
  cafeOwnerBirthday: "",
  cafeOwnerGmail: "",
  registeredNumber: "",
  cafeName: "",
  cafeLocation: "",
  cafeCountry: "",
  cafeTables: 1,
  cafeTablesStatistic: 1,
  cafeDrinksCategories: {},
};

const Registration = ({ selectedLocale, selectedTheme }) => {
  const theme = useTheme();
  const toastId = useRef(null);

  const [localizationData, setLocalizationData] = useState({});
  const [data, setData] = useState(INITIAL_DATA);
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [fileUploadedState, setUploadedFileState] = useState(0);
  const [invalidNumber, setInvalidNumber] = useState(0)

  useEffect(() => {
    const fetchLocalizationData = async () => {
      const cafeLocalizationRef = ref(database, getRegisteredCountries());

      const snapshot = await get(cafeLocalizationRef);
      if (snapshot.exists()) {
        setLocalizationData(snapshot.val());
      }
    };

    fetchLocalizationData();
  }, []);

  const handlePhoneNumber = (isValid: boolean) => {
    setValidPhoneNumber(isValid);
  };

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  function fileState(state: Number) {
    setUploadedFileState(state)
  }

  function invalidDrinksUpdate(number: Number) {
    setInvalidNumber(number)
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <UserForm
        {...data}
        updateFields={updateFields}
        selectedLocale={selectedLocale}
        handlePhoneNumber={handlePhoneNumber}
      />,
      <ObjectForm
        {...data}
        updateFields={updateFields}
        selectedLocale={selectedLocale}
        localizationData={localizationData}
      />,
      <ObjectMenuForm
        {...data}
        fileState={setUploadedFileState}
        fileUploadedState={fileUploadedState}
        invalidDrinksUpdate={invalidDrinksUpdate}
        invalidDrinksNumber={invalidNumber}
        localization={data.cafeCountry}
        updateFields={updateFields}
        selectedLocale={selectedLocale}
      />,
    ]);


  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (currentStepIndex === 0 && !validPhoneNumber) {
      return showToast(
        messages[selectedLocale].registrationInvalidNumber,
        3,
        toastId
      );
    }
    if (!isLastStep) return next();
    insertData();
    return showToast(
      messages[selectedLocale].registrationSuccessful,
      2,
      toastId
    );
  }

  function insertData() {
    const ownerPhoneNumber = data.registeredNumber;
    delete data.registeredNumber;
    const cafesRefPath = ref(database, getCafes());
    const newObject = push(cafesRefPath, data);
    const newObjectKey = newObject.key;

    const registeredNumberRef = ref(
      database,
      getRegisteredNumber(newObjectKey)
    );
    const object = {};
    if(ownerPhoneNumber) {
      object[ownerPhoneNumber] = {
        role: ownerRole,
      };
    }
    set(registeredNumberRef, object);
    setData(INITIAL_DATA);
    setInvalidNumber(0)
    setUploadedFileState(0)
    for (let counter = currentStepIndex; counter > 0; counter--) {
      back();
    }
  }

  return (
    <div
      className={`login-background ${
        selectedTheme === themeLightString
          ? "login-background-light"
          : "login-background-dark"
      }`}
    >
      <Container style={{ paddingTop: "6rem" }}>
        <Box>
          <Grid container>
            <Grid item lg={1} md={1}></Grid>
            <Grid item lg={10} md={10}>
              <Paper
                elevation={20}
                sx={{
                  backgroundColor: theme.body,
                  paddingBottom: "2rem",
                }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ marginTop: "0.6rem" }}
                  >
                    <h1
                      style={{
                        color: theme.title,
                        margin: 0,
                        marginBottom: "0.6rem",
                      }}
                    >
                      <FormattedMessage
                        id="registrationPageTitle"
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
                    <div
                      style={{
                        position: "relative",
                        border: "1px solid black",
                        borderRadius: ".5rem",
                        fontFamily: "Arial",
                        maxWidth: "80%",
                        width: "80%",
                        marginTop: "0rem",
                      }}
                    >
                      <form
                        onSubmit={onSubmit}
                        className="registration-form"
                        style={{ background: theme.semiBody }}
                      >
                        <h3
                          style={{
                            position: "absolute",
                            top: "1rem",
                            right: ".5rem",
                            margin: "0px",
                            fontSize: "1.8rem",
                          }}
                        >
                          {currentStepIndex + 1} / {steps.length}
                        </h3>
                        {step}
                        <div
                          style={{
                            marginTop: "2rem",
                            display: "flex",
                            gap: ".5rem",
                            justifyContent: "flex-end",
                          }}
                        >
                          {!isFirstStep && (
                            <button
                              className="registration-submit-btn"
                              type="button"
                              onClick={back}
                              style={{ background: "#deaa88" }}
                            >
                              <FormattedMessage
                                id="registrationBack"
                                values={selectedLocale}
                              ></FormattedMessage>
                            </button>
                          )}
                          <button
                            type="submit"
                            className="registration-submit-btn"
                            style={{ background: "#8ba8b7 " }}
                          >
                            {isLastStep ? (
                              <FormattedMessage
                                id="registrationFinish"
                                values={selectedLocale}
                              ></FormattedMessage>
                            ) : (
                              <FormattedMessage
                                id="registrationNext"
                                values={selectedLocale}
                              ></FormattedMessage>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid lg={1} md={1}></Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Registration;
