import React from "react";
import StyledTableRow from "../styles/StyledTableRow";
import {
  Box,
  Collapse,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import StyledDrinksContent from "../styles/StyledDrinksContent";
import StyledSecondaryTableRow from "../styles/StyledSecondaryTableRow";
import RowActions from "./RowActions";

function Row(props) {
  const { row, cafeLocalization, selectedTheme } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <React.Fragment>
        <StyledTableRow>
          <TableCell>
            <IconButton
              sx={{
                backgroundColor: selectedTheme.mainTableExpandRow,
                color: selectedTheme.text,
              }}
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell
            component="th"
            align="center"
            scope="row"
            className="main-table-cell"
          >
            {row.orderTime}
          </TableCell>
          <TableCell align="center" className="main-table-cell">
            <FormattedMessage
              id="homeTableNumber"
              values={row.selectedLocale}
            ></FormattedMessage>
            {": "}
            {row.orderTableNumber}
          </TableCell>
          <TableCell align="center" className="main-table-cell">
            {row.orderDrinksAmount}
          </TableCell>
          <TableCell align="center" className="main-table-cell">
            {row.orderTotalPrice + cafeLocalization.currency}
          </TableCell>
          <TableCell align="center" className="main-table-cell">
            {row.orderDelivererEmployee}
          </TableCell>
          <RowActions {...props} />
        </StyledTableRow>
        <TableRow>
          <StyledDrinksContent
            colSpan={9}
            sx={{ paddingBottom: "0", paddingTop: "0" }}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  color={selectedTheme.title}
                >
                  <FormattedMessage
                    id="homeOrderDrinks"
                    values={row.selectedLocale}
                  >
                    {" "}
                  </FormattedMessage>
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead sx={{ display: "table-header-group" }}>
                    <TableRow>
                      <TableCell align="center">
                        {" "}
                        <FormattedMessage
                          id="homeDrinkName"
                          values={row.selectedLocale}
                        >
                          {" "}
                        </FormattedMessage>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <FormattedMessage
                          id="homeDrinkAmount"
                          values={row.selectedLocale}
                        >
                          {" "}
                        </FormattedMessage>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <FormattedMessage
                          id="homeDrinkPrice"
                          values={row.selectedLocale}
                        >
                          {" "}
                        </FormattedMessage>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <FormattedMessage
                          id="homeDrinkTotalPrice"
                          values={row.selectedLocale}
                        >
                          {" "}
                        </FormattedMessage>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <FormattedMessage
                          id="homeDrinkFinished"
                          values={row.selectedLocale}
                        >
                          {" "}
                        </FormattedMessage>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.orderDrinks.map((drinkRow) => (
                      <StyledSecondaryTableRow key={drinkRow.drinkName}>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          sx={{ color: selectedTheme.text }}
                        >
                          {drinkRow.drinkName}
                        </TableCell>
                        <TableCell align="center">
                          {drinkRow.drinkAmount}
                        </TableCell>
                        <TableCell align="center">
                          {drinkRow.drinkPrice
                            .toFixed(2)
                            .replace(".", cafeLocalization.decimalSeperator) +
                            cafeLocalization.currency}
                        </TableCell>
                        <TableCell align="center">
                          {drinkRow.drinkTotalPrice
                            .toFixed(2)
                            .replace(".", cafeLocalization.decimalSeperator) +
                            cafeLocalization.currency}
                        </TableCell>
                        <TableCell align="center">
                          <Switch color="primary" size="medium" />
                        </TableCell>
                      </StyledSecondaryTableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </StyledDrinksContent>
        </TableRow>
      </React.Fragment>
    </>
  );
}

export default Row;
