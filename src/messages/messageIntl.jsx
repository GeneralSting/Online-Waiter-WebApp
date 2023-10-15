import React, { useState } from "react";
import { messages } from "./messages";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FormattedMessage } from "react-intl";

export const MessageIntl = ({ selectedLocale, onLocaleChange }) => {
  const [locale, setLocale] = useState(selectedLocale);

  const handleLocaleChange = (event) => {
    setLocale(event.target.value);
    onLocaleChange(event.target.value);
  };

  const languageAbberviation = Object.keys(messages);

  return (
    <Box sx={{ maxWidth: 100 }}>
      <FormControl fullWidth variant="filled" sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="header-language">
          <FormattedMessage
            id="selectLocale"
            values={selectedLocale}
          ></FormattedMessage>
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
          labelId="header-language"
          id="simple-select-locale"
          label="Locale"
          value={locale}
          onChange={handleLocaleChange}
        >
          {languageAbberviation.map((language) => {
            return (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
