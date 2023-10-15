import { TextareaAutosize } from "@mui/material";
import styled from "styled-components";

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    &:hover {
      border-color:${theme.dialogTextareaBorderHover};
    }
  
    &:focus {
      border-radius: 12px;
      border-color: ${theme.title};
      box-shadow: 2px 2px 2px #d1d1d1;
    }
  `
);

export default StyledTextarea;