import { toast } from "react-toastify";

const showToast = (toastMessage, toastType, toastId) => {
    toast.clearWaitingQueue();
    switch (toastType) {
      case 0: {
        toastId.current = toast(toastMessage);
        break;
      }
      case 1: {
        toastId.current = toast.info(toastMessage);
        break;
      }
      case 2: {
        toastId.current = toast.success(toastMessage);
        break;
      }
      case 3: {
        toastId.current = toast.warning(toastMessage);
        break;
      }
      case 4: {
        toastId.current = toast.error(toastMessage);
        break;
      }
      default: {
        toastId.current = toast.info(toastMessage);
        break;
      }
    }
};

export default showToast;
