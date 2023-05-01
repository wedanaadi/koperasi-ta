import React from "react";
import logo from "../assets/logo.png";

export default function Dashboard() {
  return (
    <div className="card bg-white min-h-screen">
      <div className="card-body">
        <h3 className="text-2xl font-semibold">
          Selamat Datang di Sistem Informasi Koperasi Karya Utama Mandiri
        </h3>
        <div className="mt-5">
          <img
            className="mx-auto rounded-md"
            src={logo}
            alt="picture"
          />
        </div>
      </div>
    </div>
  );
}
