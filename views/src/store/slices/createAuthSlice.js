import {dencriptData} from "../../components/encrypt"

const tokenStore = localStorage.getItem("access_token");

const createAuthSlice = (set, get) => ({
  dataLogin: tokenStore === null ? [] : JSON.parse(dencriptData(localStorage.getItem("data_login"))),
  dataSetting: tokenStore === null ? [] : JSON.parse(dencriptData(localStorage.getItem("data_setting"))),
  token: tokenStore === null ? "" : dencriptData(tokenStore),
  changeDataLogin: async (data) => {
    set({
      token: data.accessToken,
      dataLogin: data.dataLogin,
      dataSetting: data.dataSetting,
    });
  },
});

export default createAuthSlice;
