import React, { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";

import useStore from "../../store/useStore";
import { useMutation } from "@tanstack/react-query";
import { apiLogout } from "../../api/Auth";
import { useNavigate, Link } from "react-router-dom";
import Menus from "../../components/menuSidebar.jsx";
import logo from "../../assets/logo.png"

export default function Sidebar({ open }) {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const tokenLogin = useStore((state) => state.token);
  const actionLogin = useStore((state) => state.changeDataLogin);
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const navigasi = useNavigate();

  const createLogoutMutation = useMutation({
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
    onError: () => {
      toastChange({
        id: "NotifAuthentication",
        content: {
          title: "Authentication",
          description: "error",
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
    <aside className="flex fixed shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
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
              Teller
            </h1>
            <hr />
          </div>
        </div>

        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <div key={index}>
              {menu.title !== "Logout" &&
                (menu.subMenus ? (
                  <Link to={menu.src}>
                    <li
                      className={`flex rounded-md p-2 cursor-pointer hover:bg-third text-white text-sm items-center gap-x-4 ${
                        menu.gap ? "mt-9" : "mt-2"
                      } ${!open && "invisible"}`}
                      onClick={() => setSubMenuOpen(!subMenuOpen)}
                    >
                      {menu.icon ? menu.icon : <MdOutlineDashboard />}
                      <span className="flex-1">{menu.title}</span>
                      {menu.subMenus && (
                        <BsChevronDown
                          onClick={() => setSubMenuOpen(!subMenuOpen)}
                          className={`${subMenuOpen && "rotate-180"}`}
                        />
                      )}
                    </li>
                  </Link>
                ) : (
                  <Link to={menu.src}>
                    <li
                      className={`flex rounded-md p-2 cursor-pointer hover:bg-third text-white text-sm items-center gap-x-4 ${
                        menu.gap ? "mt-9" : "mt-2"
                      } ${!open && "invisible"}`}
                    >
                      {menu.icon ? menu.icon : <MdOutlineDashboard />}
                      <span className="flex-1">{menu.title}</span>
                      {menu.subMenus && (
                        <BsChevronDown
                          onClick={() => setSubMenuOpen(!subMenuOpen)}
                          className={`${subMenuOpen && "rotate-180"}`}
                        />
                      )}
                    </li>
                  </Link>
                ))}

              {/* logout */}
              {menu.title === "Logout" && (
                <li
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-third text-white text-sm items-center gap-x-4 ${
                    menu.gap ? "mt-9" : "mt-2"
                  } ${!open && "invisible"}`}
                  onClick={() => handleLogout()}
                >
                  {menu.icon ? menu.icon : <MdOutlineDashboard />}
                  <span className="flex-1">{menu.title}</span>
                </li>
              )}

              {menu.subMenus && subMenuOpen && open && (
                <ul>
                  {menu.subMenus.map((subMenuItem, idx) => (
                    <Link to={subMenuItem.src}>
                      <li
                        key={idx}
                        className="flex px-5 cursor-pointer text-center text-sm text-gray-200 py-1 hover:bg-third"
                      >
                        {subMenuItem.title}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
    </aside>
  );
}
