import { useCallback } from "react";
import { toast } from "sonner";

export const useToast = () => {
  const showSuccess = useCallback((message) => {
    toast.success(message, {
      duration: 3000,
      position: "top-right",
    });
  }, []);

  const showError = useCallback((message) => {
    toast.error(message, {
      duration: 3000,
      position: "top-right",
    });
  }, []);

  const showInfo = useCallback((message) => {
    toast.info(message, {
      duration: 3000,
      position: "top-right",
    });
  }, []);

  const showLoading = useCallback((message) => {
    return toast.loading(message, {
      position: "top-right",
    });
  }, []);

  return {
    showSuccess,
    showError,
    showInfo,
    showLoading,
    dismiss: toast.dismiss,
  };
};

export default useToast;
