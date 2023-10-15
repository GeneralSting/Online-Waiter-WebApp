import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";

function RemoveOrderRequest({
  selectedLocale,
  selectedTheme,
  open,
  closeDialog,
  removeOrder,
  rejectRequest,
}) {
  const handleDialogClose = () => {
    closeDialog();
  };

  const handleRequestReject = () => {
    rejectRequest();
    closeDialog();
  };

  const handleOrderRemove = () => {
    removeOrder();
  };

  return (
    <Dialog
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
          style: { backgroundColor: selectedTheme.dialogBackDropWarning },
        },
      }}
    >
      <DialogTitle id="responsive-dialog-title" sx={{ textAlign: "center" }}>
        <Typography variant="h4">
          <FormattedMessage
            id="homeOrderRequestHeader"
            values={selectedLocale}
          ></FormattedMessage>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage
            id="homeOrderRequestBody"
            values={selectedLocale}
          ></FormattedMessage>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        style={{ justifyContent: "space-around", paddingBottom: "1rem" }}
      >
        <Button variant="outlined" onClick={handleRequestReject}>
          <FormattedMessage
            id="homeOrderRequestDecline"
            values={selectedLocale}
          ></FormattedMessage>
        </Button>
        <Button color="error" variant="outlined" onClick={handleOrderRemove}>
          <FormattedMessage
            id="homeOrderRequestAccept"
            values={selectedLocale}
          ></FormattedMessage>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RemoveOrderRequest;
