import { TextField } from "@mui/material";
import styled from "styled-components";

const StyledPaymentInputDisabled = styled(TextField)(
    ({ theme }) => `
  .MuiFilledInput-root{
      color: ${theme.text};
      background-color: ${theme.paymentDialogInputRoot};  
  }
  
  .MuiFilledInput-input {
    background-color: ${theme.paymentDialogInput};  
  }
  `
  );

  export default StyledPaymentInputDisabled;