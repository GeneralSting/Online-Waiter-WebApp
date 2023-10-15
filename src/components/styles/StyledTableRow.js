import React from 'react';
import styled from 'styled-components';
import { TableRow } from '@mui/material';

const StyledTableRow = styled(TableRow)`
  border-bottom: 2px solid ${({ theme }) => theme.mainTableRowBorder};
  background-color: ${({ theme }) => theme.mainTableRow};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.mainTableRowHover}
  }
`;

export default StyledTableRow;