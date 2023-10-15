import { StyledHeader } from "./styles/Header.styled";
import { MessageIntl } from "../messages/messageIntl";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useTheme } from "styled-components";
import { useState } from "react";
import MaterialUISwitch from "./styles/MaterialUISwitch";

const Header = ({
  toggleTheme,
  isDarkTheme,
  selectedLocale,
  onLocaleChange,
}) => {
  const theme = useTheme();

  const [isToggled, setIsToggled] = useState(isDarkTheme);

  const onToggle = () => {
    setIsToggled(!isToggled);
    toggleTheme();
  };

  return (
    <StyledHeader>
      <Paper elevation={3} sx={{ backgroundColor: theme.headerBg }}>
        <Container sx={{ minWidth: "90%" }}>
          <Box>
            <Grid container>
              <Grid
                item
                xs={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <MessageIntl
                  selectedLocale={selectedLocale}
                  onLocaleChange={onLocaleChange}
                />
              </Grid>
              <Grid
                item
                xs={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
              >
                <Typography variant="h4" className="page-header" sx={{color: "black !important"}}>
                  <FormattedMessage
                    id="headerTitle"
                    values={selectedLocale}
                  ></FormattedMessage>
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  defaultChecked
                  checked={isToggled}
                  onChange={onToggle}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Paper>
    </StyledHeader>
  );
};

export default Header;
