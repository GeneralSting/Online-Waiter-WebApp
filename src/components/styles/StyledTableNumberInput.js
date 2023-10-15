import { TextField } from "@mui/material";
import styled from "styled-components";

const StyledTableNumberInput = styled(TextField)`

& .MuiInputBase-input {
    color: ${({ theme }) => theme.tableInputText};
  }

  & label.Mui-focused {
    color: ${({ theme }) => theme.tableInputFocusedLabel};
  }
  & .MuiInput-underline:before {
    border-bottom-color: ${({ theme }) => theme.tableInputUnderline};
  }
  & .MuiInput-underline:after {
    border-bottom-color:  ${({ theme }) => theme.tableInputUnderLineFocused};
  }
  & .MuiInputLabel-root {
    color:  ${({ theme }) => theme.tableInputLabel};
  }
  && .MuiInput-underline:hover:before {
    border-bottom: 2px solid lightblue;
  }
`;

export default StyledTableNumberInput;
