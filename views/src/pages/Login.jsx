import React, { Suspense, useState } from "react";
import useStore from "../store/useStore";
import { useMutation } from "@tanstack/react-query";
import { apiLogin } from "../api/Auth";
import { encriptData } from "../components/encrypt";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
// import checkIcon from "../assets/check.svg";
// const Toast = React.lazy(() => import("../components/Toast/Toast"));

export default function Login() {
  const actionLogin = useStore((state) => state.changeDataLogin);
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  })

  const navigasi = useNavigate();

  const createMutation = useMutation({
    mutationFn: apiLogin,
    onSuccess: (res) => {
      localStorage.setItem(
        "access_token",
        encriptData(res?.data?.access_token)
      );
      localStorage.setItem(
        "data_login",
        encriptData(JSON.stringify(res?.data?.user_data))
      );
      actionLogin({
        accessToken: res?.data?.access_token,
        dataLogin: res?.data?.user_data,
      });
      navigasi("/", { replace: true });
      toastChange({
        id: "NotifAuthentication",
        content: {
          title: "Authentication",
          description: "Login Successfuly",
          backgroundColor: toastColors.success,
          icon: toastIcon.check,
        },
        position: "top-right",
        dismiss: true,
        duration: 3000,
      });
    },
    onMutate: () => {
      toastChange({
        id: "NotifAuthentication",
        content: {
          title: "Authentication",
          description: "Loading....",
          backgroundColor: toastColors.loading,
          icon: toastIcon.loading,
        },
        position: "top-right",
        dismiss: false,
        duration: 0,
      });
    },
    onError: (res) => {
      const respon = res.response;
      let message = "";
      if(respon.status === 422) {
        setErrorValidasi(respon.data.errors);
        message = respon.data.msg;
      } if(respon.status === 403) {
        message = respon.data.errors;
      } else {
        message = respon.statusText;
      }
      toastChange({
        id: "NotifAuthentication",
        content: {
          title: "Authentication",
          description: message,
          backgroundColor: toastColors.error,
          icon: toastIcon.error,
        },
        position: "top-right",
        dismiss: true,
        duration: 7000,
      });
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    createMutation.mutate(login);
  };

  const handleChangeInput = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="flex h-screen bg-primary">
      <div className="w-full max-w-xs m-auto bg-second rounded p-5">
        <header>
          <img
            className="w-20 h-20 mx-auto mb-5"
            src={logo}
          />
        </header>

        <form onSubmit={handleLogin} autoComplete="off">
          <div className="mb-6">
            <label className="block mb-2 text-primary" htmlFor="username">
              Username
            </label>
            <input
              className="field text-third border-primary focus:bg-four"
              type="text"
              name="username"
              onChange={handleChangeInput}
            />
            {errorValidasi?.username?.map((msg, index) => (
              <span key={index} className="text-sm text-red-600 font-semibold">
                {msg}
              </span>
            ))}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-primary" htmlFor="password">
              Password
            </label>
            <input
              className="field text-third border-primary focus:bg-four"
              type="password"
              name="password"
              onChange={handleChangeInput}
            />
            {errorValidasi?.username?.map((msg, index) => (
              <span key={index} className="text-sm text-red-600 font-semibold">
                {msg}
              </span>
            ))}
          </div>
          <div>
            <button
              className="bg-primary hover:bg-third btn mb-6"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
