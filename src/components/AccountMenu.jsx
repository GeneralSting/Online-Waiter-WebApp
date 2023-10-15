import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { ContactPhone } from "@mui/icons-material";
import { CustomIconButtonLarge } from "./styles/CustomIconButtonLarge";
import BadgeIcon from "@mui/icons-material/Badge";
import { FormattedMessage } from "react-intl";
import { messages } from "../messages/messages";
import { useState } from "react";
import PhoneNumberModal from "./PhoneNumberModal";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { navigationLogin } from "../constValues/appValues";
import { useTheme } from "styled-components";
import { setUserLoggedInStorage, userNotLogged } from "../AppLocalStorage/localStorageLogin";

export default function AccountMenu(props) {
  const { selectedLocale, phoneNumber, cafeId } = props;
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { logOut, webAppAuth } = useUserAuth();
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setShowPhoneModal(false);
  };

  const handlePhoneNumberAction = () => {
    setShowPhoneModal(true);
  };

  const handleLogoutAction = () => {
    webAppAuth(false, cafeId, phoneNumber)
    logOut();
    setUserLoggedInStorage(userNotLogged)
  };

  return (
    <>
      <Tooltip title={messages[selectedLocale].AccountMenuTooltipTitle}>
        <CustomIconButtonLarge>
          <BadgeIcon
          sx={{color: theme.title, transform: "scale(1.75)",}}
            onClick={handleClick}
            size="large"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          />
        </CustomIconButtonLarge>
      </Tooltip>
      <Menu
        disableScrollLock={true}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 8,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handlePhoneNumberAction();
          }}
        >
          <ListItemIcon>
            <ContactPhone fontSize="small" />
          </ListItemIcon>
          <FormattedMessage
            id="AccountMenuPhoneNumber"
            values={selectedLocale}
          ></FormattedMessage>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogoutAction}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <FormattedMessage
            id="AccountMenuLogout"
            values={selectedLocale}
          ></FormattedMessage>
        </MenuItem>
      </Menu>
      {showPhoneModal && (
        <PhoneNumberModal
          closeModal={handleModalClose}
          selectedLocale={selectedLocale}
          phoneNumber={phoneNumber}
        />
      )}{" "}
    </>
  );
}
