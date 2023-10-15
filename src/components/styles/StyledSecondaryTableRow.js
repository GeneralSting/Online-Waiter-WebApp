import React from 'react';
import styled from 'styled-components';
import { TableRow } from '@mui/material';

const StyledSecondaryTableRow = styled(TableRow)`
  background-color: ${({ theme }) => theme.secondaryTableRow};
  border-bottom: 2px solid ${({ theme }) => theme.mainTableRowBorder};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.secondaryTableRowHover};
  }
`;

export default StyledSecondaryTableRow;