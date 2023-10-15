import React from "react";
import FormWrapper from "./FormWrapper.tsx";
import { FormattedMessage } from "react-intl";
import { FilledInput, Grid, TextField } from "@mui/material";
import StyledTableNumberInput from "../styles/StyledTableNumberInput.js";
import { messages } from "../../messages/messages.js";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import ProbaPhoneInput from "./ProbaPhoneInput.jsx";
import MuiPhoneInput from "../MuiPhoneInput.jsx";
import { customCountryCodes } from "./CountryCode.ts";
import { useUserAuth } from "../../context/UserAuthContext.jsx";
import { useTheme } from "styled-components";
import { Oval } from "react-loader-spinner";
import { UserFormProps } from "./RegistrationDataTypes.js";

const UserForm = ({
  cafeOwnerName,
  cafeOwnerLastName,
  cafeOwnerBirthday,
  cafeOwnerGmail,
  registeredNumber,
  updateFields,
  selectedLocale,
  handlePhoneNumber,
}: UserFormProps) => {
  const { registeredCountries } = useUserAuth();
  const theme = useTheme();

  const handleNumberChange = (resultNumber: string) => {
    updateFields({ registeredNumber: resultNumber });
    if (resultNumber && isValidPhoneNumber(resultNumber.toString())) {
      handlePhoneNumber(true);
    } else {
      handlePhoneNumber(false);
    }
  };

  return (
    <>
      {Object.keys(registeredCountries).length > 0 ? (
        <FormWrapper title={messages[selectedLocale].registrationUserForm}>
          <Grid container rowSpacing={4} columnSpacing={4}>
            <Grid
              item
              lg={6}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <StyledTableNumberInput
                type="text"
                label={messages[selectedLocale].registrationUserFirstName}
                id="standard-size-small"
                size="standard"
                value={cafeOwnerName}
                onChange={(event) =>
                  updateFields({
                    cafeOwnerName: event.target.value,
                  })
                }
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid
              item
              lg={6}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <StyledTableNumberInput
                type="text"
                label={messages[selectedLocale].registrationUserLastName}
                size="standard"
                value={cafeOwnerLastName}
                onChange={(event) =>
                  updateFields({
                    cafeOwnerLastName: event.target.value,
                  })
                }
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid
              item
              lg={6}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <StyledTableNumberInput
                type="date"
                label={messages[selectedLocale].registrationUserBirthday}
                InputLabelProps={{ shrink: true }}
                size="standard"
                value={cafeOwnerBirthday}
                onChange={(event) =>
                  updateFields({
                    cafeOwnerBirthday: event.target.value,
                  })
                }
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid
              item
              lg={6}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <StyledTableNumberInput
                type="email"
                required
                InputLabelProps={{ required: false }}
                label={
                  <div>
                    {messages[selectedLocale].registrationUserEmail}
                    <span className="input-required">
                      {messages[selectedLocale].inputRequired}
                    </span>
                  </div>
                }
                size="standard"
                value={cafeOwnerGmail}
                onChange={(event) =>
                  updateFields({
                    cafeOwnerGmail: event.target.value,
                  })
                }
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid
              item
              lg={6}
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <PhoneInput
                registeredNumber={registeredNumber}
                onChange={handleNumberChange}
                inputComponent={MuiPhoneInput}
                selectedLocale={selectedLocale}
                countries={Object.keys(registeredCountries)}
                value={registeredNumber}
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </FormWrapper>
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
    </>
  );
};

export default UserForm;
