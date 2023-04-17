import checkIcon from "../../assets/check.svg";
import errorIcon from "../../assets/error.svg";
import infoIcon from "../../assets/info.svg";
import warningIcon from "../../assets/warning.svg";
import loadingIcon from "../../assets/loading.svg";

const createToastSlice = (set, get) => ({
  setting: {
    id: "",
    content: [],
    position: "top-right",
    dismiss: true,
    duration: 0,
  },
  iconsToast: {
    check: checkIcon,
    error: errorIcon,
    info: infoIcon,
    warning: warningIcon,
    loading: loadingIcon,
  },
  colorsToast: {
    success: "#5cb85c",
    error: "#d9534f",
    info: "#5bc0de",
    warning: "#f0ad4e",
    loading: "#909396"
  },
  changeState: async (data) => {
    set({
      setting: {
        id: data.id,
        content: data.content,
        position: data.position,
        dismiss: data.dismiss,
        duration: data.duration,
      },
    });
  },
});

export default createToastSlice;
