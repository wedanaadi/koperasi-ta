import React, { useState } from "react";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";

import useStore from "../../store/useStore";
import { useMutation } from "@tanstack/react-query";
import { apiLogout } from "../../api/Auth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Menus from "../../components/menuSidebar.jsx";
import logo from "../../assets/logo.png";
import NavItem from "./NavItem/NavItem";
import CapitalLetter from "../../components/CapitalFirstLetter"

export default function Sidebar({ open }) {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const tokenLogin = useStore((state) => state.token);
  const dataLogin = useStore((state) => state.dataLogin);
  const actionLogin = useStore((state) => state.changeDataLogin);
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const navigasi = useNavigate();
  const { pathname } = useLocation();

  const createLogoutMutation = useMutation({
    networkMode: `always`,
    mutationFn: apiLogout,
    onSuccess: (res) => {
      actionLogin({
        accessToken: "",
        dataLogin: [],
      });
      localStorage.clear();
      navigasi("/login");
      toastChange({
        id: "NotifAuthentication",
        content: {
          title: "Authentication",
          description: "Logout Successfuly",
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
      } else if(respon.status === 403) {
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

  const handleLogout = () => {
    createLogoutMutation.mutate(tokenLogin);
  };

  return (
    <aside className="flex fixed shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] z-[999]">
      <div
        className={`h-screen overflow-y-auto bg-primary relative duration-500 ${
          open ? "w-48 lg:w-60" : "w-0"
        }`}
      >
        <div className="justify-center mt-3">
          <div className={`text-center duration-200 ${!open && "invisible"}`}>
            <img
              className="w-16 h-16 mx-auto rounded-md"
              src={logo}
              alt="picture"
            />
            <span className="font-normal text-base text-white">
              Koperasi Karya Utama Mandiri
            </span>
            <h1 className="font-medium text-2xl text-center text-white p-2 mb-2">
            {dataLogin?.jabatan ? CapitalLetter(dataLogin.jabatan) : 'Super User'}
            </h1>
            <hr />
          </div>
        </div>

        <nav className="pt-6">
          {Menus.map((item, index) => (
            <NavItem key={`${item.label}-${index}`} item={item} />
          ))}
          <div
            className="flex cursor-pointer rounded-md p-2 text-white text-sm gap-x-4 items-center hover:bg-third"
            onClick={handleLogout}
          >
            <MdLogout />
            <span className="flex-1">Logout</span>
          </div>
        </nav>
      </div>
    </aside>
  );
}
