import { fbCodeExpired, fbCodeInvalid, fbManyAuth, fbQuotaExceeded } from "../constValues/firebaseCodes";
import { messages } from "./messages";
import showToast from "./toastMessage";


const firebaseToastMessage = (code, toastId, selectedLocale) => {
    switch(code) {
        case fbManyAuth: {
            showToast(messages[selectedLocale].fbManyAuth, 3, toastId);
            break;
        }
        case fbQuotaExceeded: {
            showToast(messages[selectedLocale].fbQuotaExceeded, 3, toastId);
            break;
        }
        case fbCodeExpired: {
            showToast(messages[selectedLocale].fbCodeExpired, 3, toastId);
            break;
        }
        case fbCodeInvalid : {
            showToast(messages[selectedLocale].fbCodeInvalid, 3, toastId);
            break;
        }
        default: {
            showToast(messages[selectedLocale].appError, 4, toastId);
            break;
        }
    }
}

export default firebaseToastMessage;