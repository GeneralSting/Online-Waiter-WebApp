import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormattedMessage } from "react-intl";
import { Grid } from "@mui/material";
import { useTheme } from "styled-components";

export default function PhoneNumberModal({
  closeModal,
  selectedLocale,
  phoneNumber,
}) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    closeModal();
  };
  const theme = useTheme();


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: theme.modalColor,
    border: "2px solid " + theme.title,
    boxShadow: 24,
    p: 4,
  };


  return (
    <Modal
      disableScrollLock={true}
      disableEnforceFocus
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: { style: { backgroundColor: theme.modalBackDrop } },
      }}
      sx={{}}
    >
      <Box sx={style}>
        <Grid container>
          <Grid item lg={10}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <FormattedMessage
                id="PhoneNumberModalTitle"
                values={selectedLocale}
              ></FormattedMessage>
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={3}></Grid>
          <Grid item lg={6}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {phoneNumber}
            </Typography>
          </Grid>
          <Grid item lg={3}></Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
