import {
  Box,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getCafeCountry,
  getCafeCurrentOrders,
  getNumberWebAppRegistered,
} from "../firebaseConfig/databaseRef";
import { get, onValue, ref, set } from "firebase/database";
import { database } from "../firebaseConfig/firebase.config";
import { FormattedMessage } from "react-intl";
import { useTheme } from "styled-components";
import AccountMenu from "./AccountMenu";
import TableNumberInput from "./TableNumberInput";
import { emptyStringValue } from "../constValues/appValues";
import { useUserAuth } from "../context/UserAuthContext";
import Row from "./homeOrdersTable/Row";
import createOrderData from "../functions/createOrderData";
import formatNumberLocalization from "../functions/formatNumberLocalization";
import {
  getIncrementInStorage,
  removeIncrementStorage,
} from "../AppLocalStorage/localStorageIncrement";
import {
  setUserLoggedInStorage,
  userNotLogged,
} from "../AppLocalStorage/localStorageLogin";

const Home = (props) => {
  const { selectedLocale } = props;
  const { fetchCafeLocale, webAppAuth, logOut, registeredCountries } =
    useUserAuth();
  const theme = useTheme();
  const { state } = useLocation();

  const [rows, setRows] = useState([]);
  const [ordersQuery, setOrdersQuery] = useState(false);
  const [orderTableQuery, setOrderTableQuery] = useState();
  const [localizationData, setLocalizationData] = useState({});
  const [dataFounded, setDataFounded] = useState(false);

  useEffect(() => {
    window.onpopstate = function () {
      webAppAuth(
        false,
        state.loggedPhone.cafeId,
        state.loggedPhone.phoneNumber.number
      );
      setUserLoggedInStorage(userNotLogged);
      logOut();
    };
  }, []);

  console.log(state.loggedPhone.phoneNumber.number)


  useEffect(() => {
    if (getIncrementInStorage() !== null) {
      webAppAuth(
        true,
        state.loggedPhone.cafeId,
        state.loggedPhone.phoneNumber.number
      );
      removeIncrementStorage();
    }
  }, []);

  useEffect(() => {
    async function getLocalizationData() {
      try {
        const countryCode = await fetchCafeLocale(state.loggedPhone.cafeId);
        setLocalizationData(registeredCountries[countryCode]);
        if (Object.keys(registeredCountries).length > 0) {
          setDataFounded(true);
        }
      } catch (error) {
        console.error("ERROR " + error);
      }
    }

    const cafeCountryDbRef = ref(
      database,
      getCafeCountry(state.loggedPhone.cafeId)
    );
    const unsubscribe = onValue(cafeCountryDbRef, (snapshot) => {
      if (snapshot.exists()) {
        getLocalizationData();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [registeredCountries]);

  useEffect(() => {
    if (dataFounded) {
      async function fetchCurrentOrders() {
        try {
          const currentOrdersRef = ref(
            database,
            getCafeCurrentOrders(state.loggedPhone.cafeId)
          );

          const unsubscribe = onValue(currentOrdersRef, (snapshot) => {
            const currentOrders = [];
            snapshot.forEach((childSnapshot) => {
              const orderId = childSnapshot.key;
              const order = childSnapshot.val();
              if (
                ordersQuery &&
                parseInt(order.currentOrderTableNumber) ===
                  Number(orderTableQuery)
              ) {
                const data = createOrderData(
                  orderId,
                  order.currentOrderDatetime,
                  order.currentOrderDelivererEmployee,
                  order.currentOrderDelivererNum,
                  order.currentOrderDrinks,
                  order.currentOrderMakerEmployee,
                  order.currentOrderMakerNum,
                  order.currentOrderProductAmount,
                  order.currentOrderStatus,
                  order.currentOrderTableNumber,
                  formatNumberLocalization(
                    order.currentOrderTotalPrice,
                    localizationData.decimalSeperator
                  ),
                  order.currentOrderTablesStatistic
                );
                currentOrders.push(data);
              } else if (!ordersQuery) {
                const data = createOrderData(
                  orderId,
                  order.currentOrderDatetime,
                  order.currentOrderDelivererEmployee,
                  order.currentOrderDelivererNum,
                  order.currentOrderDrinks,
                  order.currentOrderMakerEmployee,
                  order.currentOrderMakerNum,
                  order.currentOrderProductAmount,
                  order.currentOrderStatus,
                  order.currentOrderTableNumber,
                  formatNumberLocalization(
                    order.currentOrderTotalPrice,
                    localizationData.decimalSeperator
                  ),
                  order.currentOrderTablesStatistic
                );
                currentOrders.push(data);
              }
            });
            setRows(currentOrders);
          });

          return () => {
            unsubscribe();
          };
        } catch (error) {
          console.error(error);
        }
      }

      fetchCurrentOrders();
    }
  }, [orderTableQuery, localizationData, dataFounded]);

  const handleTableNumberInput = (tableNumber) => {
    if (tableNumber === emptyStringValue) {
      setOrdersQuery(false);
      setOrderTableQuery(undefined);
    } else {
      setOrdersQuery(true);
      setOrderTableQuery(tableNumber);
    }
  };

  return (
    <Container style={{ marginTop: "7rem", paddingBottom: "4rem" }}>
      <Box style={{ margin: "0 1rem 1rem" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <AccountMenu
              selectedLocale={selectedLocale}
              phoneNumber={state.loggedPhone.phoneNumber.number}
              cafeId={state.loggedPhone.cafeId}
            />
          </Grid>
          <Grid item lg={2}>
            <TableNumberInput
              tableNumberEntered={handleTableNumberInput}
              selectedLocale={selectedLocale}
            />
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper} elevation={8}>
        <Table aria-label="collapsible table">
          <TableHead
            sx={{
              display: "table-header-group",
              backgroundColor: theme.mainTableHeader,
            }}
          >
            <TableRow>
              <TableCell />
              <TableCell align="center">
                <FormattedMessage
                  id="homeOrderTime"
                  values={selectedLocale}
                ></FormattedMessage>
              </TableCell>
              <TableCell align="center">
                {" "}
                <FormattedMessage
                  id="homeTableNumber"
                  values={selectedLocale}
                ></FormattedMessage>
              </TableCell>
              <TableCell align="center">
                {" "}
                <FormattedMessage
                  id="homeProductAmount"
                  values={selectedLocale}
                ></FormattedMessage>
              </TableCell>
              <TableCell align="center">
                {" "}
                <FormattedMessage
                  id="homeTotalPrice"
                  values={selectedLocale}
                ></FormattedMessage>
              </TableCell>
              <TableCell align="center">
                {" "}
                <FormattedMessage
                  id="homeOrderDeliverer"
                  values={selectedLocale}
                ></FormattedMessage>
              </TableCell>
              <TableCell align="center">
                {" "}
                <FormattedMessage
                  id="homeActionOrder"
                  values={selectedLocale}
                ></FormattedMessage>
              </TableCell>
              <TableCell align="center">
                {" "}
                <FormattedMessage
                  id="homeActionPaid"
                  values={selectedLocale}
                ></FormattedMessage>
              </TableCell>
              <TableCell align="center">
                {" "}
                <FormattedMessage
                  id="homeActionDelete"
                  values={selectedLocale}
                ></FormattedMessage>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.orderKey}
                row={row}
                cafeLocalization={localizationData}
                cafeId={state.loggedPhone.cafeId}
                loggedPhone={state.loggedPhone.phoneNumber.number}
                employee={state.loggedPhone.phoneNumber.memoryWord}
                selectedTheme={theme}
                selectedLocale={selectedLocale}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length === 0 ? (
        <Grid container direction="row">
          <Grid item xs={3} />
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <h2>
              {" "}
              <FormattedMessage
                id="homeNoOrders"
                values={selectedLocale}
              ></FormattedMessage>
            </h2>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Home;
