import { toast, ToastOptions, ToastPosition } from "react-toastify";

const options: ToastOptions = {
  position: "top-right" as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const generateToast = (text: string, type: string) => {
  switch (type) {
    case "success":
      toast.success(text, options);
      break;
    case "warn":
      toast.warn(text, options);
      break;
    case "error":
      toast.error(text, options);
      break;
    default:
      toast.info(text, options);
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const getSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getSuffix(day)} ${month} ${year}`;
};
