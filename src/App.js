import { ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "./components/styles/Global";
import Header from "./components/Header";
import { useState } from "react";
import darkTheme from "./theme/darkTheme";
import lightTheme from "./theme/lightTheme";
import { messages } from "./messages/messages";
import { IntlProvider } from "react-intl";
import {
  navigationHome,
  navigationLogin,
  navigationRegistration,
  themeDarkString,
  themeLightString,
} from "./constValues/appValues";
import {
  getThemeInStorage,
  setThemeInStorage,
} from "./AppLocalStorage/localStorageTheme";
import {
  getLocaleInStorage,
  setLocaleInStorage,
} from "./AppLocalStorage/localStorageLocale";
import Registration from "./components/Registration/Registration.tsx";

function App() {
  const [theme, setTheme] = useState(getThemeInStorage);
  const isDarkTheme = theme === themeDarkString;
  const [selectedLocale, setSelectedLocale] = useState(getLocaleInStorage());

  const toggleTheme = () => {
    setTheme(isDarkTheme ? themeLightString : themeDarkString);
    setThemeInStorage(isDarkTheme ? themeLightString : themeDarkString);
  };

  const handleLocaleChange = (locale) => {
    setSelectedLocale(locale);
    setLocaleInStorage(locale);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />
      <IntlProvider locale={selectedLocale} messages={messages[selectedLocale]}>
        <Header
          toggleTheme={toggleTheme}
          isDarkTheme={isDarkTheme}
          selectedLocale={selectedLocale}
          onLocaleChange={handleLocaleChange}
        />
      </IntlProvider>
      <div>
        <UserAuthContextProvider>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            closeOnClick
            limit={1}
            newestOnTop={true}
            transition={Zoom}
          />
          <Routes>
            <Route
              path={navigationHome}
              element={
                <ProtectedRoute>
                  <IntlProvider
                    locale={selectedLocale}
                    messages={messages[selectedLocale]}
                  >
                    <Home
                      selectedLocale={selectedLocale}
                      selectedTheme={theme}
                    />
                  </IntlProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path={navigationLogin}
              element={
                <IntlProvider
                  locale={selectedLocale}
                  messages={messages[selectedLocale]}
                >
                  <Login
                    selectedLocale={selectedLocale}
                    selectedTheme={theme}
                  />
                </IntlProvider>
              }
            />
            <Route
              path={navigationRegistration}
              element={
                <IntlProvider
                  locale={selectedLocale}
                  messages={messages[selectedLocale]}
                >
                  <Registration
                    selectedLocale={selectedLocale}
                    selectedTheme={theme}
                  />
                </IntlProvider>
              }
            />
          </Routes>
        </UserAuthContextProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
