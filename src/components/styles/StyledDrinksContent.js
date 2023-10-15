import React from 'react';
import styled from 'styled-components';
import { TableCell } from '@mui/material';

const StyledDrinksContent = styled(TableCell)`
  background-color: ${({ theme }) => theme.mainTableDrinkContent};
  padding-bottom: 0;
  padding-top: 0; 
`;

export default StyledDrinksContent;