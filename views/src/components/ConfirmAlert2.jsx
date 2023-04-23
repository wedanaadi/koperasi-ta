import React from "react";
import logo from "../assets/info.svg";

export default function ConfirmAlert2({ settingDialog, actionConfirm, text }) {
  const {openConfirm, setOpenConfirm} = settingDialog
  const {confirmAction, setConfirmAction } = actionConfirm
  const {title, msg, button } = text
  return (
    <div
      className={`fixed ${
        !openConfirm && "hidden"
      } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[999] duration-700`}
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary">
            <img src={logo} alt="Logo" />
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              {msg}
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button className="btn2 bg-primary hover:bg-third" onClick={()=>setConfirmAction(!confirmAction)}>{button}</button>
            &nbsp;
            <button className="btn2 bg-slate-500 hover:opacity-80" onClick={()=>setOpenConfirm(!openConfirm)}>Batal</button>
          </div>
        </div>
      </div>
    </div>
  );
}
