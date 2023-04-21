import React from "react";
import { Outlet } from "react-router-dom";
import Akun from "../Akun/Index"

export default function Content() {
  return (
    <div className="m-5 mb-auto relative">
      <Outlet/>
    </div>
  );
}
