import { TextField } from "@mui/material";
import styled from "styled-components";

const StyledPaymentInput = styled(TextField)(
    ({ theme }) => `
  .MuiFilledInput-root{
      color: ${theme.text};
      background-color: ${theme.paymentDialogInputRoot};  
  }
  
  .MuiFilledInput-root:hover{
    background-color: ${theme.paymentDialogInputHover};  
}
  
  .MuiFilledInput-input:focus {
    background-color: ${theme.paymentDialogInput};  
}
  `
  );

  export default StyledPaymentInput;