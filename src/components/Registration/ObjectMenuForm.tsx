import React, { useState, useCallback, useEffect } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import FormWrapper from "./FormWrapper.tsx";
import * as XLSX from "xlsx";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import { messages } from "../../messages/messages.js";
import { Grid } from "@mui/material";
import excelDocument from "../../assets/xlsx.png";
import {
  DOT,
  SLASH,
  UNDERSCORE,
  categoryIdPartial,
  drinkDescriptionMax,
  drinkNameMax,
  drinkNoImage,
  drinkPriceMax,
  drinkPriceMin,
  drinkQuantityMax,
  drinkQuantityMin,
  emptyStringValue,
  fileStateDanger,
  fileStateDefault,
  fileStateInvalid,
  fileStateSuccess,
  fileStateWarning,
  regexFloatWithDot,
} from "../../constValues/appValues.js";
import { database } from "../../firebaseConfig/firebase.config.js";
import {
  getCafeDrinksCategories,
  getMenuDrinksExample,
  getMenuExampleExstenstion,
} from "../../firebaseConfig/databaseRef.js";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { get, ref as dbRef } from "firebase/database";
import { Drink, ObjectMenuProps } from "./RegistrationDataTypes.js";

const ObjectMenuForm = ({
  fileState,
  fileUploadedState,
  invalidDrinksUpdate,
  invalidDrinksNumber,
  localization,
  updateFields,
  selectedLocale,
}: any) => {
  const [uploadedFileState, setUploadedFileState] = useState(fileUploadedState);
  const [invalidDrinks, setInvalidDrinks] = useState(invalidDrinksNumber);

  useEffect(() => {
    console.log(fileUploadedState)
  }, [fileUploadedState])

  let collectedDrinksCategories = {};
  useEffect(() => {
    async function collectDrinksCategories() {
      const drinksCategoriesRef = dbRef(database, getCafeDrinksCategories());
      try {
        const snapshot = await get(drinksCategoriesRef);
        if (snapshot.exists()) {
          collectedDrinksCategories = snapshot.val();
        }
      } catch (error) {
        console.log("ERROR " + error);
      }
    }
    collectDrinksCategories();
  }, []);

  const downlaodFile = () => {
    const storage = getStorage();
    const starsRef = ref(storage, getMenuDrinksExample(selectedLocale));

    // Get the download URL
    getDownloadURL(starsRef)
      .then((url) => {
        download(url);
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "storage/object-not-found":
            console.log(error);
            break;
          case "storage/unauthorized":
            console.log(error);
            break;
          case "storage/canceled":
            console.log(error);
            break;
          case "storage/unknown":
            break;
        }
      });
  };

  const download = (url) => {
    const fileName = url.split(SLASH).pop();
    const tag = document.createElement("a");
    tag.href = url;
    tag.setAttribute("download", fileName);
    document.body.appendChild(tag);
    tag.click();
    tag.remove();
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (file.name.toLowerCase().endsWith(getMenuExampleExstenstion())) {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = (event) => {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);
          setUploadedFileState(fileStateSuccess)
          parseAndValidateData(parsedData);
        };
        reader.readAsArrayBuffer(file);
      } else {
        setUploadedFileState(fileStateDanger);
      }
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function parseAndValidateData(parsedData) {
    const fileDrinks: Drink[] = [];
    let invalidDrinksCounter = 0;
    let validDrinksCounter = 0;
    for (const item of parsedData) {
      const [name, description, category, price, quantity] =
        Object.values(item);

      // Check if all conditions for a parameter are met before pushing the object
      const isNameValid =
        typeof name === "string" &&
        name.trim() !== emptyStringValue &&
        name.length <= drinkNameMax;
      const isDescriptionValid =
        typeof description === "string" &&
        description.trim() !== emptyStringValue &&
        description.length <= drinkDescriptionMax;
      const drinkCategory = parseInt(category, 10);
      const isCategoryValid =
        !isNaN(drinkCategory) && drinkCategory >= 1 && drinkCategory <= 15;

      let isPriceValid = false;
      let defaultDecimalPrice;
      if (price !== undefined) {
        defaultDecimalPrice = price.toString().replace(regexFloatWithDot, DOT);
        isPriceValid =
          !isNaN(parseFloat(defaultDecimalPrice)) &&
          parseFloat(defaultDecimalPrice) >= drinkPriceMin &&
          parseFloat(defaultDecimalPrice) <= drinkPriceMax;
      }
      const drinkQuantity = parseInt(quantity, 10);
      const isQuantityValid =
        !isNaN(drinkQuantity) &&
        drinkQuantity >= drinkQuantityMin &&
        drinkQuantity <= drinkQuantityMax;

      // Check if all conditions for the object are met before pushing it

      if (
        isNameValid &&
        isDescriptionValid &&
        isCategoryValid &&
        isPriceValid &&
        isQuantityValid
      ) {
        const newDrink: Drink = {
          name: name,
          description: description,
          categoryId: drinkCategory,
          price: parseFloat(defaultDecimalPrice),
          quantity: drinkQuantity,
        };

        fileDrinks.push(newDrink);
        validDrinksCounter++;
      } else {
        invalidDrinksCounter++;
      }
    }
    if (validDrinksCounter === 0) {
      setUploadedFileState(fileStateInvalid);
    } else if (invalidDrinksCounter > 0) {
      console.log("bokica")
      setUploadedFileState(fileStateWarning);
      setInvalidDrinks(invalidDrinksCounter)
    }
    const cafeDrinksCategories = {};
    for (const drink of fileDrinks) {
      const [name, description, categoryId, price, quantity] =
        Object.values(drink);
      const fullCategoryId = getCategoryId(categoryId);

      if (!cafeDrinksCategories[fullCategoryId]) {
        cafeDrinksCategories[fullCategoryId] = {
          cafeCategoryDescription:
            collectedDrinksCategories[fullCategoryId].categoryDescription,
          cafeCategoryImage:
            collectedDrinksCategories[fullCategoryId].categoryImage,
          cafeCategoryName:
            collectedDrinksCategories[fullCategoryId].categoryNames[
              localization
            ],
          categoryDrinks: {},
        };
      }

      cafeDrinksCategories[fullCategoryId].categoryDrinks[
        name + UNDERSCORE + categoryId
      ] = {
        categoryDrinkDescription: description,
        categoryDrinkImage: drinkNoImage,
        categoryDrinkName: name,
        categoryDrinkPrice: price,
        categoryDrinkQuantity: quantity,
      };
    }
    updateFields({ cafeDrinksCategories: cafeDrinksCategories });
  }

  const getCategoryId = (categoryId) => {
    return categoryIdPartial + categoryId;
  };

  useEffect(() => {
    fileState(uploadedFileState)
    invalidDrinksUpdate(invalidDrinks)
  }, [uploadedFileState, invalidDrinks])

  return (
    <>
      <FormWrapper title={messages[selectedLocale].registrationObjectDrinks}>
        <Grid container>
          <Grid
            lg={6}
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{marginTop: "1rem"}}
          >
            <Grid
              container
              onClick={downlaodFile}
              style={{ cursor: "pointer", border: "2px dashed #ccc" }}
            >
              <Grid
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
                xs={12}
              >
                <img src={excelDocument} width="64" height="64" alt="" />
              </Grid>
              <Grid
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
                xs={12}
              >
                <p
                  style={{ textDecoration: "underline" }}
                  className="alwaysBlack"
                >
                  {messages[selectedLocale].registrationObjectDrinksHelp}
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            lg={6}
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{marginTop: "1rem"}}
          >
            <Grid container>
              <Grid
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
                xs={12}
              >
                <h3
                  style={{ textAlign: "center", margin: "0px", }}
                  className="alwaysBlack"
                >
                  {messages[selectedLocale].registrationObjectDrinksTitle}
                </h3>
              </Grid>
              <Grid
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
                xs={12}
              >
                <p
                  style={{ fontSize: "1rem", textAlign: "center" }}
                  className="alwaysBlack"
                >
                  {messages[selectedLocale].registrationObjectDrinksDesc}
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <div
          {...getRootProps()}
          style={{
            padding: "1rem",
            marginTop: "1rem",
            border: "2px dashed #ccc",
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          {uploadedFileState === fileStateDefault && (
            <p className="alwaysBlack">
              {messages[selectedLocale].registrationObjectDrinksArea}
            </p>
          )}
          {uploadedFileState === fileStateSuccess && (
            <>
              <CloudDoneIcon sx={{ fontSize: 48, color: "green" }} />
              <p className="alwaysBlack">
                {messages[selectedLocale].registrationObjectDrinksSuccess}
              </p>
            </>
          )}
          {uploadedFileState === fileStateWarning && (
            <>
              <WarningIcon sx={{ fontSize: 48, color: "orange" }} />
              <p className="alwaysBlack">
                {messages[selectedLocale].registrationObjectDrinksWarning + invalidDrinks}
              </p>
            </>
          )}
          {uploadedFileState === fileStateInvalid && (
            <>
              <ErrorIcon sx={{ fontSize: 48, color: "red" }} />
              <p className="alwaysBlack">
                {messages[selectedLocale].registrationObjectDrinksErrorContent}
              </p>
            </>
          )}
          {uploadedFileState === fileStateDanger && (
            <>
              <ErrorIcon sx={{ fontSize: 48, color: "red" }} />
              <p className="alwaysBlack">
                {messages[selectedLocale].registrationObjectDrinksErrorType}
              </p>
            </>
          )}
        </div>
      </FormWrapper>
    </>
  );
};

export default ObjectMenuForm;
