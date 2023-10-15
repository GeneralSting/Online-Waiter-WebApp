import { IconButton } from "@mui/material";
import styled from "styled-components";

export const CustomIconButtonLarge = styled(IconButton)`
  svg {
    color: ${({ theme }) => theme.title};
  }
`;
