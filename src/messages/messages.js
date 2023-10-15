export const messages = {
  en: {
    //header
    headerTitle: "Online Waiter",
    selectLocale: "Language",

    //login page
    loginPageTitle: "Login",
    loginPageOtpTitle: "Confirm OTP",
    loginNumberPH: "Enter phone number",
    loginBtnSendOtp: "Send OTP",
    loginPhoneNumberErrorEmpty: "Enter phone number",
    loginPhoneNumberInvalid: "Invalid phone number",
    LoginPhoneNumberNotRegistered:
      "Entered number is not registered for log in!",
    loginOtpEmpty: "Enter OTP",
    loginOtpInvalid: "Wrong OTP!",
    loginPhoneNumberDisabled: "Owner disabled login with this number",
    loginPhoneNumberLogged: "User is already logged in with entered number!",
    loginRegistrationLink: "Object registration",

    //Registration page
    registrationPageTitle: "Object registration",
    registrationUserFirstName: "First name",
    registrationUserLastName: "Last name",
    registrationUserBirthday: "Birthday",
    registrationUserEmail: "Email",
    registrationObjectName: "Name",
    registrationObjectLocation: "Location",
    registrationObjectLocalization: "Localization",
    registrationObjectTables: "Tables number",
    registrationPhoneNumber: "Mobile phone number",
    registrationObjectDrinks: "Drinks menu (optional)",
    registrationObjectDrinksArea: "Drag and drop file here, or click to select file",
    registrationObjectDrinksSuccess: "File filled correctly!",
    registrationObjectDrinksErrorType: "Wrong file type!",
    registrationObjectDrinksErrorContent: "File not filled correctly!",
    registrationObjectDrinksWarning: "Number of drinks that won't be added because they are invalid: ",
    registrationObjectDrinksTitle: "Adding object's menu",
    registrationObjectDrinksDesc:
      "Add the object's initial menu via an Excel document. To understand the necessary content of the file, download the example Excel file and add the desired data",
    registrationObjectDrinksHelp: "Document example",
    registrationNext: "Next",
    registrationFinish: "Finish",
    registrationBack: "Back",
    registrationUserForm: "User details",
    registrationObjectForm: "Object details",
    registrationObjectMenu: "Object menu",
    registrationInvalidNumber: "Enter valid phone number!",
    registrationSuccessful: "Object is successfuly registered",

    //firebase errors
    fbManyAuth: "User sent too many requests",
    fbQuotaExceeded: "Your daily quota is exceeded!",
    fbCodeExpired: "OTP has expired, request new",
    fbCodeInvalid: "Entered OTP is not valid",

    //home page
    //table headers
    homeOrderTime: "Order date",
    homeTableNumber: "Table",
    homeProductAmount: "Amount",
    homeTotalPrice: "Price",
    homeOrderDeliverer: "Deliverer",
    homeActionOrder: "Order",
    homeActionPaid: "Paid",
    homeActionDelete: "Delete",
    //table rows
    homeActionTakeOrder: "Take",
    homeActionFinishedOrder: "Finished",
    homeActionRequestOrder: "Request",
    homeActionDeleteOrder: "Deleted",
    //order drinks table
    homeOrderDrinks: "Drinks for order:",
    homeDrinkName: "Name",
    homeDrinkAmount: "Amount",
    homeDrinkPrice: "Price",
    homeDrinkTotalPrice: "Total price",
    homeDrinkFinished: "Finished",
    //empty table
    homeNoOrders: "No orders",
    //tabče number input
    homeTableNumberMax: "Max number of tables is 9999",
    //table actions/messages
    homeAlreadyAcceptedOrder: "Order is already accepted",
    homeAcceptOrderSuccessful: "Order is successfully accepted",
    homeOrderReady: "Order is ready",
    homeOrderRequestHeader: "Remove order",
    homeOrderRequestBody: "Waiter request for removing order",
    homeOrderRequestAccept: "Remove",
    homeOrderRequestDecline: "Reject",
    homeOrderRequestAccepted: "Order removed on waiter request",
    homeOrderRequestDeclined: "Request declined, order is not deleted",
    homeOrderRemoveHeader: "Delete order",
    homeOrderRemoveBody: "Send the waiter the reason for canceling the order",
    homeOrderRemoved: "Order deleted, message sent to waiter",
    homeOrderRemoveSend: "Remove order",
    homeOrderRemoveMessageFail: "An error occured, message not sent to waiter",
    homeOrderRemoveMessageSent:
      "Order will be deleted when waiter reads received message",
    homeOrderPaymentHeader: "Order biling",
    homeOrderPaymentBody: "Auxiliary calculator for order billing",
    homeOrderPaymentAccept: "Charge",
    homeOrderPaymentPrice: "Order total price:  ",
    homeOrderPaymentLabel: "Received",
    homeOrderReturnLabel: "Return",
    homeOrderPaymentSuccessful: "Order finished",

    //Account menu component
    AccountMenuTooltipTitle: "User options",
    AccountMenuPhoneNumber: "Phone number",
    AccountMenuLogout: "Logout",
    //phone number modal
    PhoneNumberModalTitle: "Logged in with:",

    //table number input component
    tablePhoneNumberLabel: "Table number",

    //app errors
    appError: "An Error occured, please try again",

    //others
    inputRequired: "*",
  },

  hr: {
    //header
    headerTitle: "Online Konobar",
    selectLocale: "Jezik",

    //login page
    loginPageTitle: "Prijava",
    loginPageOtpTitle: "Potvrdi PIN",
    loginNumberPH: "Broj mobitela",
    loginBtnSendOtp: "Pošalji PIN",
    loginPhoneNumberErrorEmpty: "Unesite broj mobitela",
    loginPhoneNumberInvalid: "Neispravan broj mobitela",
    LoginPhoneNumberNotRegistered: "Uneseni broj nije registriran za prijavu!",
    loginPhoneNumberDisabled:
      "Vlasnik kafića je onemogućio prijavu s unesenim brojem",
    loginOtpEmpty: "Unesite PIN",
    loginOtpInvalid: "Pogrešan PIN!",
    loginPhoneNumberLogged: "Korisnik je već prijavljen s unesenim brojem",
    loginRegistrationLink: "Registracija objekta",

    //Registration page
    registrationPageTitle: "Registracija objekta",
    registrationUserFirstName: "Ime",
    registrationUserLastName: "Prezime",
    registrationUserBirthday: "Datum rođenja",
    registrationUserEmail: "Email",
    registrationObjectName: "Naziv",
    registrationObjectLocation: "Lokacija",
    registrationObjectLocalization: "Lokalizacija",
    registrationObjectTables: "Broj stolova",
    registrationPhoneNumber: "Telefonski broj prijave",
    registrationObjectDrinks: "Ponuda pića objekta (opcionalno)",
    registrationObjectDrinksArea: "Povucite i pustite dokument ovdje, ili pristisnite za odabiranje dokumenta",
    registrationObjectDrinksSuccess: "Datoteka ispravno ispunjena!",
    registrationObjectDrinksErrorType: "Pogrešan tip datoteke!",
    registrationObjectDrinksErrorContent: "Datoteka nije ispravno ispunjena!",
    registrationObjectDrinksWarning: "Broj pića koja se neće dodati jer nisu ispravno popunjena: ",
    registrationObjectDrinksTitle: "Dodavanje menija objekta",
    registrationObjectDrinksDesc:
      "Dodajte početni meni objekta putem Excel dokumenta. Za razumijevanja potrebnog sadržaja datoteke, preuzmite primjer Excel datoteke i nadopunite željenim podacima",
    registrationObjectDrinksHelp: "Primjer izgleda dokumenta",
    registrationNext: "Dalje",
    registrationFinish: "Završi",
    registrationBack: "Nazad",
    registrationUserForm: "Podaci vlasnika",
    registrationObjectForm: "Podaci objekta",
    registrationObjectMenu: "Meni objekta",
    registrationInvalidNumber: "Unesite ispravan telefonski broj!",
    registrationSuccessful: "Objekt je uspješno registriran",

    //firebase errors
    fbManyAuth: "Korisnik je poslao previše zahtjeva",
    fbQuotaExceeded: "Vaša dnevna kvota je ispunjena!",
    fbCodeExpired: "Vrijeme za unos PIN-a je isteklo, zatražite novi",
    fbCodeInvalid: "Unesen neispravan PIN",

    //home page
    //table headers
    homeOrderTime: "Datum Narudžbe",
    homeTableNumber: "Stol",
    homeProductAmount: "Količina",
    homeTotalPrice: "Cijena",
    homeOrderDeliverer: "Naručitelj",
    homeActionOrder: "Narudžba",
    //table rows
    homeActionTakeOrder: "Preuzmi",
    homeActionFinishedOrder: "Spremna",
    homeActionRequestOrder: "Zahtjev",
    homeActionPaid: "Plaćeno",
    homeActionDelete: "Obirši",
    homeActionDeleteOrder: "Obrisana",
    //order drinks table
    homeOrderDrinks: "Pića za narudžbu:",
    homeDrinkName: "Naziv",
    homeDrinkAmount: "Količina",
    homeDrinkPrice: "Cijena",
    homeDrinkTotalPrice: "Ukupno",
    homeDrinkFinished: "Napravljeno",
    //empty table
    homeNoOrders: "Nema narudžbi",
    //tabče number input
    homeTableNumberMax: "Najveća moguća vrijednost je 9999",
    //table actions/messages
    homeAlreadyAcceptedOrder: "Narudžba je već preuzeta",
    homeAcceptOrderSuccessful: "Narudžba uspješno preuzeta",
    homeOrderReady: "Narudžba je spremna",
    homeOrderRequestHeader: "Brisanje narudžbe",
    homeOrderRequestBody: "Zahtjev konobara da se narudžba obriše",
    homeOrderRequestAccept: "Obriši",
    homeOrderRequestDecline: "Zadrži",
    homeOrderRequestAccepted: "Narudžba obrisana na zahtjev konobara",
    homeOrderRequestDeclined: "Zahtjev odbijen, narudžba nije obrisana",
    homeOrderRemoved:
      "Narudžba uspješno obrisana, poruka je dostavljena konobaru",
    homeOrderRemoveHeader: "Brisanje narudžbe",
    homeOrderRemoveBody: "Napišite konobaru razlog brisanja narudžbe",
    homeOrderRemoveSend: "Obriši narudžbu",
    homeOrderRemoveMessageFail: "Greška se dogodila, poruka nije poslana",
    homeOrderRemoveMessageSent:
      "Narudžba će biti izbrisana kada konobar pročita poruku",
    homeOrderPaymentHeader: "Naplata narudžbe",
    homeOrderPaymentBody: "Pomoćni kalkulator za naplatu naružbe",
    homeOrderPaymentAccept: "Naplati",
    homeOrderPaymentPrice: "Iznos narudžbe: ",
    homeOrderPaymentLabel: "Dobiveno",
    homeOrderReturnLabel: "Vratiti",
    homeOrderPaymentSuccessful: "Narudžba završena",

    //Account menu component
    AccountMenuTooltipTitle: "Opcije korisnika",
    AccountMenuPhoneNumber: "Broj mobitela",
    AccountMenuLogout: "Odjava",
    //phone number modal
    PhoneNumberModalTitle: "Prijavljeni broj:",

    //table number input component
    tablePhoneNumberLabel: "Broj stola",

    //app errors
    appError: "Dogodila se pogreška, molimo probajte ponovno",

    //others
    inputRequired: "*",
  },
};

export const defaultLocale = "en";
