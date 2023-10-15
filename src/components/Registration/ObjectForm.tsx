import React from "react";
import FormWrapper from "./FormWrapper.tsx";
import { FormattedMessage } from "react-intl";
import { messages } from "../../messages/messages.js";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import StyledTableNumberInput from "../styles/StyledTableNumberInput.js";
import { regexFloatWithDot } from "../../constValues/appValues.js";
import { ObjectFormProps } from "./RegistrationDataTypes.js";

const ObjectForm = ({
  cafeName,
  cafeLocation,
  cafeCountry,
  cafeTables,
  selectedLocale,
  localizationData,
  updateFields,
}: ObjectFormProps) => {
  const handleKeyDown = (event) => {
    // Allow only numbers and Backspace key
    if ((event.key >= "0" && event.key <= "9") || event.key === "Backspace") {
      return;
    }

    event.preventDefault();
  };

  const handleInputChange = (event) => {
    let newValue = event.target.value;
    if (newValue.toString().length <= 4) {
      newValue = newValue.replace(/[^0-9]/g, "");
      updateFields({
        cafeTables: Number(newValue),
      });
    }
  };

  const handleBlur = (event) => {
    if (event.target.value.toString() === "0") {
      updateFields({
        cafeTables: Number(1),
      });
    }
  };

  return (
    <FormWrapper title={messages[selectedLocale].registrationObjectForm}>
      <Grid container rowSpacing={4}>
        <Grid item lg={2} md={2} />
        <Grid
          item
          md={8}
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <StyledTableNumberInput
            type="text"
            InputLabelProps={{ required: false }}
            label={
              <div>
                {messages[selectedLocale].registrationObjectName}
                <span className="input-required">
                  {messages[selectedLocale].inputRequired}
                </span>
              </div>
            }
            size="standard"
            value={cafeName}
            onChange={(event) =>
              updateFields({
                cafeName: event.target.value,
              })
            }
            sx={{ width: "100%" }}
            required
          />
        </Grid>
        <Grid item lg={2} md={2} />
        <Grid item lg={2} md={2} />
        <Grid
          item
          md={8}
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <StyledTableNumberInput
            type="text"
            InputLabelProps={{ required: false }}
            label={
              <div>
                {messages[selectedLocale].registrationObjectLocation}
                <span className="input-required">
                  {messages[selectedLocale].inputRequired}
                </span>
              </div>
            }
            size="standard"
            value={cafeLocation}
            onChange={(event) =>
              updateFields({
                cafeLocation: event.target.value,
              })
            }
            sx={{ width: "100%" }}
            required
          />
        </Grid>
        <Grid item lg={2} md={2} />
        <Grid item lg={2} md={2} />
        <Grid
          item
          md={8}
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {
                <div>
                  {messages[selectedLocale].registrationObjectLocalization}
                  <span className="input-required">
                    {messages[selectedLocale].inputRequired}
                  </span>
                </div>
              }
            </InputLabel>
            <Select
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom", // Position the menu below the Select component
                  horizontal: "left", // Position the menu to the left of the Select component
                },
                transformOrigin: {
                  vertical: "top", // Align the top of the menu with the top of the Select component
                  horizontal: "left", // Align the left of the menu with the left of the Select component
                },
                disableScrollLock: true,
              }}
              sx={{ width: "100% !important" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cafeCountry}
              label={messages[selectedLocale].registrationObjectLocalization}
              onChange={(event) =>
                updateFields({
                  cafeCountry: event.target.value,
                })
              }
              required
            >
              {Object.keys(localizationData).map((countryCode) => (
                <MenuItem
                  key={countryCode}
                  value={localizationData[countryCode].codeLocale}
                >
                  {localizationData[countryCode].name +
                    " (" +
                    localizationData[countryCode].nameLocale +
                    ")"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={2} md={2} />
        <Grid item lg={2} md={2} />
        <Grid
          item
          md={8}
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <StyledTableNumberInput
            type="text"
            InputLabelProps={{ required: false }}
            label={messages[selectedLocale].registrationObjectTables}
            size="standard"
            min="1"
            max="9999"
            value={cafeTables}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            onBlur={handleBlur}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item lg={2} md={2} />
      </Grid>
    </FormWrapper>
  );
};

export default ObjectForm;
