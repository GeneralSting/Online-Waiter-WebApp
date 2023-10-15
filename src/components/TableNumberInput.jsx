import * as React from "react";
import Box from "@mui/material/Box";
import { messages } from "../messages/messages";
import StyledTableNumberInput from "./styles/StyledTableNumberInput";
import { useState } from "react";
import { emptyStringValue } from "../constValues/appValues";
import showToast from "../messages/toastMessage";
import { useRef } from "react";

export default function TableNumberInput({
  tableNumberEntered,
  selectedLocale,
}) {
  const [tableNumber, setTableNumber] = useState(emptyStringValue)
  const toastId = useRef(null);

  const handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      tableNumberEntered(tableNumber);
      return;
    }
    else 
    if (
      event.key !== "e" &&
      event.key !== "." &&
      event.key !== "," &&
      event.key !== "-"
    ) {
    }
    else {
      event.preventDefault();
    }
  }

  const handleChange = (event) => {
    if(parseInt(event.target.value) === 0 || event.target.value === "0") {
      event.target.value = emptyStringValue;
    }
    else {
      if(event.target.value.length < 5) {
        setTableNumber(event.target.value)
      }
      else {
        event.target.value = event.target.value.slice(0, 4);
        return showToast(messages[selectedLocale].homeTableNumberMax, 3, toastId);
      }
    }
  }

  return (
    <Box>
      <div>
        <StyledTableNumberInput
          type="number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*",}}
          InputProps={{ inputProps: { min: 1,}}}
          label={messages[selectedLocale].tablePhoneNumberLabel}
          id="standard-size-small"
          size="small"
          variant="standard"
          onChange={handleChange}
          onKeyDown={handleEnterKey}
        />
      </div>
    </Box>
  );
}
