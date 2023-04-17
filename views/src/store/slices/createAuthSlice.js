import axios from "../../components/axiosApi";
import {dencriptData} from "../../components/encrypt"

const tokenStore = localStorage.getItem("access_token");

const createAuthSlice = (set, get) => ({
  dataLogin: tokenStore === null ? [] : JSON.parse(dencriptData(localStorage.getItem("data_login"))),
  token: tokenStore === null ? "" : dencriptData(tokenStore),
  changeDataLogin: async (data) => {
    set({
      token: data.accessToken,
      dataLogin: data.dataLogin,
    });
  },
});

export default createAuthSlice;
