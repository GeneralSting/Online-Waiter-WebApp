import React from "react";
import { useState } from "react";
import { emptyStringValue } from "../../constValues/appValues";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import StyledTextarea from "../styles/StyledTextarea";

function RemoveOrderDialog({
  selectedLocale,
  open,
  closeDialog,
  orderDeletedStatus,
  selectedTheme,
}) {
  const [waiterMessage, setWaiterMessage] = useState(emptyStringValue);
  const handleDialogClose = () => {
    closeDialog();
  };

  const handleOrderRemove = () => {
    setWaiterMessage(emptyStringValue);
    orderDeletedStatus(waiterMessage);
    closeDialog();
  };

  const handleEnterKey = (event) => {
    if (event.keyCode === 13) {
      handleOrderRemove();
    }
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
          style: { backgroundColor: selectedTheme.dialogBackDropDanger },
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center" }}>
        <Typography variant="h4">
          <FormattedMessage
            id="homeOrderRemoveHeader"
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
            id="homeOrderRemoveBody"
            values={selectedLocale}
          ></FormattedMessage>
        </DialogContentText>
        <StyledTextarea
        className="deleteOrderDialogInput"
          style={{
            color: "black",
            width: "80%",
            margin: "2rem 0 1rem",
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: "0.875rem",
            fontWeight: "400",
            lineHeight: "1.5",
            padding: "12px",
            borderRadius: "12px 12px 0 12px",
            border: "1px solid" + selectedTheme.title,
            transition: "border-radius 0.3s ease",
            boxShadow: "4px 2px 2px" + selectedTheme.dialogtextareaShadow,
            resize: "none",
            background: selectedTheme.dialogTextareaBgDanger,
          }}
          autoFocus
          onChange={(event) => setWaiterMessage(event.target.value)}
          onKeyDown={handleEnterKey}
        />
      </DialogContent>
      <DialogActions
        style={{ justifyContent: "space-around", paddingBottom: "1rem" }}
      >
        <Button color="error" variant="contained" onClick={handleOrderRemove}>
          <FormattedMessage
            id="homeOrderRemoveSend"
            values={selectedLocale}
          ></FormattedMessage>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RemoveOrderDialog;
