import React, { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  themeLightString,
} from "../constValues/appValues";
import { messages } from "../messages/messages";
import { useUserAuth } from "../context/UserAuthContext";
import { get, ref } from "firebase/database";
import { database } from "../firebaseConfig/firebase.config";
import { getRegisteredCountries } from "../firebaseConfig/databaseRef";

const PhoneNumberInput = ({
  valueUpdate,
  selectedLocale,
  selectedTheme,
  defaultCountry,
  phoneNumberCountries,
  handleCountryChange,
}) => {
  const [phoneNumberCountry, setPhoneNumberCountry] = useState();

  useEffect(() => {
    valueUpdate(phoneNumberCountry);
  }, [phoneNumberCountry]);

  const handleOnCountryChange = (countryData) => {
    handleCountryChange(countryData);
  };
  
  return (
    <>
      <PhoneInput
        className={`phone-input ${
          selectedTheme === themeLightString ? "light-theme" : "dark-theme"
        }`}
        placeholder={messages[selectedLocale].loginNumberPH}
        value={phoneNumberCountry}
        onChange={setPhoneNumberCountry}
        onCountryChange={handleOnCountryChange}
        defaultCountry={defaultCountry}
        countries={phoneNumberCountries}
      />
    </>
  );
};

export default PhoneNumberInput;
