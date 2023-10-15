import React from "react";
import { useState } from "react";
import { useTheme } from "styled-components";
import {
  DOT,
  emptyStringValue,
  paymentBalanceEqual,
  paymentBalanceGreater,
  paymentBalanceSmaller,
  regexFloatWithDot,
} from "../../constValues/appValues";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import StyledPaymentInput from "../styles/StyledPaymentInput";
import { messages } from "../../messages/messages";
import { DoubleArrow } from "@mui/icons-material";
import StyledPaymentInputDisabled from "../styles/StyledPaymentInputDisabled";
import { useEffect } from "react";

function PaymentDialog({
  selectedLocale,
  open,
  closeDialog,
  orderFinished,
  totalPrice,
  cafeLocalization,
}) {
  const selectedTheme = useTheme();
  const [receivedPrice, setReceivedPrice] = useState();
  const [returnPrice, setReturnPrice] = useState();
  const [balance, setBalance] = useState(paymentBalanceEqual);
  const handleDialogClose = () => {
    setReceivedPrice();
    setReturnPrice();
    setBalance(paymentBalanceEqual);
    closeDialog();
  };

  const handleFinishingOrder = () => {
    orderFinished();
  };

  const handleKeyActions = (event) => {
    if (event.keyCode === 13) {
      handleFinishingOrder();
    }
  };

  const handleChange = (event) => {
    setReceivedPrice(event.target.value);
    if (event.target.value !== emptyStringValue) {
      let diff = (
        parseFloat(event.target.value).toFixed(2) -
        totalPrice.replace(regexFloatWithDot, DOT)
      ).toFixed(2);
      let tolerance = 0.0001;
      setReturnPrice(diff.replace(DOT, cafeLocalization.decimalSeperator));
      if (Math.abs(diff - 0.0) < tolerance) {
        setBalance(paymentBalanceEqual);
      } else if (diff > 0.0) {
        setBalance(paymentBalanceGreater);
      } else if (diff < 0.0) {
        setBalance(paymentBalanceSmaller);
      } else {
        setBalance(paymentBalanceEqual);
      }
    }
    else {
      setReturnPrice(emptyStringValue)
      setBalance(paymentBalanceEqual)
    }
  };

  const handleBlur = (event) => {
    setReceivedPrice(parseFloat(event.target.value).toFixed(2));
  };

  const handleKeyDown = (event) => {
    if (event.key === "-" || event.key === "+" || event.key === "e") {
      event.preventDefault();
    }
  };

  const preventEnteringValue = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog
      onKeyUp={handleKeyActions}
      PaperProps={{
        style: {
          backgroundColor: selectedTheme.modalColor,
        },
      }}
      disableScrollLock={true}
      open={open}
      onClose={handleDialogClose}
      slotProps={{
        backdrop: {
          style: { backgroundColor: selectedTheme.dialogBackDropSuccess },
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center" }}>
        <Typography variant="h4">
          <FormattedMessage
            id="homeOrderPaymentHeader"
            values={selectedLocale}
          ></FormattedMessage>
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <DialogContentText>
          <FormattedMessage
            id="homeOrderPaymentBody"
            values={selectedLocale}
          ></FormattedMessage>
        </DialogContentText>
        <p>
          <FormattedMessage
            id="homeOrderPaymentPrice"
            values={selectedLocale}
          ></FormattedMessage>
          <u>
            <b>{totalPrice + cafeLocalization.currency}</b>
          </u>
        </p>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={5}>
            {" "}
            <StyledPaymentInput
              variant="filled"
              autoFocus
              value={receivedPrice}
              color={
                balance === paymentBalanceEqual
                  ? "primary"
                  : balance === paymentBalanceGreater
                  ? "success"
                  : balance === paymentBalanceSmaller
                  ? "error"
                  : "secondary"
              }
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              InputProps={{ inputProps: { min: 0 } }}
              label={messages[selectedLocale].homeOrderPaymentLabel}
              id="standard-size-small"
              size="small"
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              aria-label="payment"
              size="large"
              color={
                balance === paymentBalanceEqual
                  ? "primary"
                  : balance === paymentBalanceGreater
                  ? "success"
                  : balance === paymentBalanceSmaller
                  ? "error"
                  : "secondary"
              }
            >
              <DoubleArrow />
            </IconButton>
          </Grid>
          <Grid item xs={5}>
            {" "}
            <StyledPaymentInputDisabled
              label={messages[selectedLocale].homeOrderReturnLabel}
              variant="filled"
              value={returnPrice}
              type="text"
              size="small"
              onKeyDown={preventEnteringValue}
              InputLabelProps={{ shrink: true }}
              color={
                balance === paymentBalanceEqual
                  ? "primary"
                  : balance === paymentBalanceGreater
                  ? "success"
                  : balance === paymentBalanceSmaller
                  ? "error"
                  : "secondary"
              }
              focused
              readOnly
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        style={{ justifyContent: "space-around", paddingBottom: "1rem" }}
      >
        <Button
          color="success"
          variant="contained"
          onClick={handleFinishingOrder}
        >
          <FormattedMessage
            id="homeOrderPaymentAccept"
            values={selectedLocale}
          ></FormattedMessage>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PaymentDialog;
