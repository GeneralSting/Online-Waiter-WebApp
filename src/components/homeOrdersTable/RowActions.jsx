import { get, ref, remove, set } from "firebase/database";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { database } from "../../firebaseConfig/firebase.config";
import {
  getCafeBill,
  getCurrentOrderMaker,
  getCurrentOrderMessage,
  getCafeCurrentOrders,
  getCurrentOrderStatus,
  getCafeCurrentOrder,
  getCurrentOrderMakerEmployee,
} from "../../firebaseConfig/databaseRef";
import showToast from "../../messages/toastMessage";
import { messages } from "../../messages/messages";
import {
  currentOrderPending,
  currentOrderReady,
  currentOrderRemoveRequest,
  currentOrderRemoved,
} from "../../constValues/appValues";
import { getLocaleCurrentTime } from "../../functions/currentTime";
import { Button, TableCell } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { DeleteForever, PriceCheck } from "@mui/icons-material";
import RemoveOrderRequest from "./RemoveOrderRequest";
import PaymentDialog from "./PaymentDialog";
import RemoveOrderDialog from "./RemoveOrderDialog";

function RowActions(props) {
  const {
    row,
    selectedLocale,
    selectedTheme,
    loggedPhone,
    cafeId,
    cafeLocalization,
    employee,
  } = props;
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  let orderMakerNum = row.orderMakerNum;

  const toastId = useRef(null);

  const acceptOrder = () => {
    const currentOrderMakerRef = ref(
      database,
      getCurrentOrderMaker(cafeId, row.orderKey)
    );

    get(currentOrderMakerRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          showToast(
            messages[selectedLocale].homeAlreadyAcceptedOrder,
            3,
            toastId
          );
        } else {
          set(currentOrderMakerRef, loggedPhone)
            .then(() => {
              const curretnOrderMakerEmployeeRef = ref(
                database,
                getCurrentOrderMakerEmployee(cafeId, row.orderKey)
              );
              set(curretnOrderMakerEmployeeRef, employee).then(() => {
                showToast(
                  messages[selectedLocale].homeAcceptOrderSuccessful,
                  2,
                  toastId
                );
              });
            })
            .catch((error) => {
              console.log(error.message);
              showToast(messages[selectedLocale].appError, 4, toastId);
            });
        }
      })
      .catch((error) => {
        console.log(error.message);
        showToast(messages[selectedLocale].appError, 4, toastId);
      });
  };

  const orderReady = () => {
    const currentOrderStatus = ref(
      database,
      getCurrentOrderStatus(cafeId, row.orderKey)
    );

    set(currentOrderStatus, currentOrderReady)
      .then(() => {
        showToast(messages[selectedLocale].homeOrderReady, 2, toastId);
      })
      .catch((error) => {
        console.log(error.message);
        showToast(messages[selectedLocale].appError, 4, toastId);
      });
  };

  const closeDialog = () => {
    setOpenRequestDialog(false);
    setOpenPaymentDialog(false);
    setOpenRemoveDialog(false);
  };

  const removeOrder = () => {
    const currentOrderRef = ref(
      database,
      getCafeCurrentOrder(cafeId, row.orderKey)
    );

    remove(currentOrderRef)
      .then(() => {
        showToast(
          messages[selectedLocale].homeOrderRequestAccepted,
          1,
          toastId
        );
      })
      .catch((error) => {
        console.log(error.message);
        showToast(messages[selectedLocale].appError, 4, toastId);
      });
  };

  const rejectRequest = () => {
    const currentOrderStatus = ref(
      database,
      getCurrentOrderStatus(cafeId, row.orderKey)
    );

    set(currentOrderStatus, currentOrderPending)
      .then(() => {
        showToast(
          messages[selectedLocale].homeOrderRequestDeclined,
          1,
          toastId
        );
      })
      .catch((error) => {
        console.log(error.message);
        showToast(messages[selectedLocale].appError, 4, toastId);
      });
  };

  const orderDeletedStatus = (waiterMessage) => {
    const orderStatusRef = ref(
      database,
      getCurrentOrderStatus(cafeId, row.orderKey)
    );

    set(orderStatusRef, currentOrderRemoved)
      .then(() => {
        sendWaiterMessage(waiterMessage);
      })
      .catch((error) => {
        console.log(error.message);
        showToast(messages[selectedLocale].appError, 4, toastId);
      });
  };

  const sendWaiterMessage = (waiterMessage) => {
    const orderStatusMessage = ref(
      database,
      getCurrentOrderMessage(cafeId, row.orderKey)
    );

    set(orderStatusMessage, waiterMessage)
      .then(() => {
        showToast(
          messages[selectedLocale].homeOrderRemoveMessageSent,
          2,
          toastId
        );
      })
      .catch((error) => {
        console.log(error.message);
        showToast(
          messages[selectedLocale].homeorderRemoveMessageFail,
          4,
          toastId
        );
      });
  };

  const finishOrder = () => {
    const currentOrderDrinks = {};

    row.orderDrinks.forEach((drink) => {
      const { drinkId, ...drinkWithoutId } = drink;
      currentOrderDrinks[drinkId] = drinkWithoutId;
    });

    const cafeBillDbRef = ref(database, getCafeBill(cafeId, row.orderKey));
    const cafeBillObject = {
      cafeBillDate: row.orderTime,
      cafeBillDelivererEmployee: row.orderDelivererEmployee,
      cafeBillDelivererNum: row.orderDelivererNum,
      cafeBillDrinks: currentOrderDrinks,
      cafeBillMakerEmployee: row.orderMakerEmployee,
      cafeBillMakerNum: row.orderMakerNum,
      cafeBillPaymentDatetime: getLocaleCurrentTime(
        cafeLocalization.timeZone,
        cafeLocalization.timeZoneLocale
      ),
      cafeBillProductAmount: row.orderDrinksAmount,
      cafeBillTableNumber: row.orderTableNumber,
      cafeBillTotalPrice: row.orderTotalPrice,
      cafeBillTablesStatistic: row.orderTablesStatistic,
    };

    set(cafeBillDbRef, cafeBillObject)
      .then(() => {
        const currentOrderDbRef = ref(
          database,
          getCafeCurrentOrder(cafeId, row.orderKey)
        );
        remove(currentOrderDbRef)
          .then(() => {
            showToast(
              messages[selectedLocale].homeOrderPaymentSuccessful,
              2,
              toastId
            );
          })
          .catch((error) => {
            console.log(error.message);
            showToast(messages[selectedLocale].appError, 4, toastId);
          });
      })
      .catch((error) => {
        console.log(error.message);
        showToast(messages[selectedLocale].appError, 4, toastId);
      });
    closeDialog();
  };

  return (
    <>
      <TableCell align="center" className="main-table-cell">
        {row.orderStatus === currentOrderPending && (
          <>
            {orderMakerNum === loggedPhone ? (
              <Button variant="contained" color="success" onClick={orderReady}>
                <FormattedMessage
                  id="homeActionFinishedOrder"
                  values={row.selectedLocale}
                >
                  {" "}
                </FormattedMessage>
              </Button>
            ) : (
              <>
                {orderMakerNum === undefined ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={acceptOrder}
                  >
                    <FormattedMessage
                      id="homeActionTakeOrder"
                      values={row.selectedLocale}
                    >
                      {" "}
                    </FormattedMessage>
                  </Button>
                ) : (
                  <Button disabled variant="contained" color="primary">
                    <FormattedMessage
                      id="homeActionTakeOrder"
                      values={row.selectedLocale}
                    >
                      {" "}
                    </FormattedMessage>
                  </Button>
                )}
              </>
            )}
          </>
        )}
        {row.orderStatus === currentOrderReady && (
          <>
            {orderMakerNum === loggedPhone ? (
              <Button variant="text" color="success">
                <FormattedMessage
                  id="homeActionFinishedOrder"
                  values={row.selectedLocale}
                >
                  {" "}
                </FormattedMessage>
              </Button>
            ) : (
              <Button disabled variant="text" color="success">
                <FormattedMessage
                  id="homeActionFinishedOrder"
                  values={row.selectedLocale}
                >
                  {" "}
                </FormattedMessage>
              </Button>
            )}
          </>
        )}

        {row.orderStatus === currentOrderRemoved && (
          <>
            <Button variant="text" color="error">
              <FormattedMessage
                id="homeActionDeleteOrder"
                values={row.selectedLocale}
              >
                {" "}
              </FormattedMessage>
            </Button>
          </>
        )}

        {row.orderStatus === currentOrderRemoveRequest && (
          <>
            {orderMakerNum === loggedPhone || orderMakerNum === undefined ? (
              <Button
                variant="contained"
                color="warning"
                onClick={() => setOpenRequestDialog(true)}
              >
                <FormattedMessage
                  id="homeActionRequestOrder"
                  values={row.selectedLocale}
                >
                  {" "}
                </FormattedMessage>
              </Button>
            ) : (
              <Button disabled variant="contained" color="warning">
                <FormattedMessage
                  id="homeActionRequestOrder"
                  values={row.selectedLocale}
                >
                  {" "}
                </FormattedMessage>
              </Button>
            )}
          </>
        )}
      </TableCell>
      <TableCell align="center">
        {row.orderStatus === currentOrderReady ? (
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenPaymentDialog(true)}
          >
            <PriceCheck />
          </Button>
        ) : (
          <Button variant="contained" color="success" disabled>
            <PriceCheck />
          </Button>
        )}
      </TableCell>
      <TableCell align="center">
        {row.orderStatus === currentOrderRemoved ||
        row.orderStatus === currentOrderReady ? (
          <Button variant="contained" color="error" disabled>
            <DeleteForever />
          </Button>
        ) : (
          <>
            {orderMakerNum === loggedPhone ? (
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpenRemoveDialog(true)}
              >
                <DeleteForever />
              </Button>
            ) : (
              <Button variant="contained" color="error" disabled>
                <DeleteForever />
              </Button>
            )}
          </>
        )}
      </TableCell>
      <RemoveOrderRequest
        selectedLocale={selectedLocale}
        selectedTheme={selectedTheme}
        open={openRequestDialog}
        closeDialog={closeDialog}
        removeOrder={removeOrder}
        rejectRequest={rejectRequest}
      />
      <PaymentDialog
        selectedLocale={selectedLocale}
        open={openPaymentDialog}
        cafeLocalization={cafeLocalization}
        closeDialog={closeDialog}
        orderFinished={finishOrder}
        totalPrice={row.orderTotalPrice}
      />
      <RemoveOrderDialog
        selectedLocale={selectedLocale}
        open={openRemoveDialog}
        closeDialog={closeDialog}
        orderDeletedStatus={orderDeletedStatus}
        selectedTheme={selectedTheme}
      />
    </>
  );
}

export default RowActions;
