import { createContext, useContext, useEffect, useState } from "react";
import {
  RecaptchaVerifier,
  onAuthStateChanged,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { auth, database } from "../firebaseConfig/firebase.config.js";
import { get, push, ref, set } from "firebase/database";
import {
  getCafeCountry,
  getRegisteredCountry,
  getNumberWebAppRegistered,
  getAppErrors,
  getRegisteredCountries,
  getAppError,
} from "../firebaseConfig/databaseRef.js";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [renderRecaptcha, setRenderRecaptcha] = useState(true);
  const [recaptcha, setRecaptcha] = useState(null);
  const [registeredCountries, setRegisteredCountries] = useState({});

  const onSend = () => {
    setRenderRecaptcha(false);
  };

  function setUpRecaptha(number) {
    if (renderRecaptcha) {
      const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: function () {
            onSend();
          },
        },
        auth
      );
      setRecaptcha(recaptchaVerifier);
      recaptchaVerifier.render();
      return signInWithPhoneNumber(auth, number, recaptchaVerifier);
    } else {
      return signInWithPhoneNumber(auth, number, recaptcha);
    }
  }

  async function webAppAuth(increment, cafeId, phoneNumber) {
    const registeredNumberWebRef = ref(
      database,
      getNumberWebAppRegistered(cafeId, phoneNumber)
    );
    try {
      const snapshot = await get(registeredNumberWebRef);
  
      if (snapshot.exists()) {
        let updatedValue;
        if(increment) {
          updatedValue = snapshot.val() + 1;
        }
        else {
          updatedValue = snapshot.val() - 1;
        }
        await set(registeredNumberWebRef, updatedValue);
      }
    } catch (error) {
      console.error("ERROR " + error);
      throw error; // Propagate the error
    }
  }

  function logOut() {
    signOut(auth)
  }

  const reportError = (cafeId, phoneNumber, errorMessage, errorTitle, errorSender, datetime) => {
    const errorObject = {
      cafeId: cafeId,
      datetime: datetime,
      errorMessage: errorMessage,
      errorSender: errorSender,
      errorTitle: errorTitle,
      phoneNumber: phoneNumber,
    };
    const appErrorsRef = ref(database, getAppErrors());    
    const newError = push(appErrorsRef, errorObject);
    const newErrorKey = newError.key;
    const appErrorRef = ref(database, getAppError(newErrorKey));
    set(appErrorRef, errorObject)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const fetchRegisteredCountries = async () => {
      const registeredCountriesRef = ref(database, getRegisteredCountries());
      const snapshot = await get(registeredCountriesRef);
      if(snapshot.exists()) {
        setRegisteredCountries(snapshot.val());
      }
    }
    fetchRegisteredCountries()

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchLocalizationData = async (countryCode) => {
    if(Object.keys(registeredCountries).length > 0) {
      return registeredCountries[countryCode];
    }
  }

  const resetRecaptcha = () => {
    if (renderRecaptcha !== true) {
      setRenderRecaptcha(true);
    }
  };

  const fetchCafeLocale = async (cafeId) => {
    const cafeCountryDbRef = ref(database, getCafeCountry(cafeId));
    const snapshot = await get(cafeCountryDbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  };

  return (
    <userAuthContext.Provider
      value={{
        user,
        registeredCountries,
        logOut,
        reportError,
        setUpRecaptha,
        resetRecaptcha,
        fetchCafeLocale,
        fetchLocalizationData,
        webAppAuth,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
