import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useStore from "../../store/useStore";
import Select from "../../components/Tailwind/Select"
import { useEffect } from "react";

export default function Add() {
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [karyawan, setKaryawan] = useState({
    nama_lengkap: "",
    alamat: "",
    no_handphone: "",
    username: "",
    password: "",
    jabatan: "",
  });
  const options = [
    { value: "direktur", label: "Direktur" },
    { value: "teller", label: "Teller" },
    { value: "admin", label: "Admin Kredit" },
  ];
  const navigasi = useNavigate();
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);

  useEffect(() => {
    setKaryawan({
      ...karyawan,
      ["jabatan"]: selectedValue?.value,
    });
  }, [selectedValue]);

  const handleSimpan = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_API}/pegawai`, { ...karyawan })
      .then((res) => {
        navigasi(`/karyawan`)
        toastChange({
          id: "NotifAddKaryawan",
          content: {
            title: "Create Data",
            description: "Cretae Karyawan Successfuly",
            backgroundColor: toastColors.success,
            icon: toastIcon.check,
          },
          position: "top-right",
          dismiss: true,
          duration: 3000,
        });
      })
      .catch((err) => {
        setErrorValidasi(err.response.data.errors);
      });
  };

  const handleChangeInput = (e) => {
    setKaryawan({
      ...karyawan,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white card">
      <div className="border-second card-header">
        <h3 className="mb-0 text-2xl font-semibold">Tambah Karyawan</h3>
        <div className="flex justify-center items-center">
          <Link
            to={`/karyawan`}
            className="btn bg-slate-400 text-white hover:opacity-80"
          >
            Kembali
          </Link>
        </div>
      </div>
      <div className="card-body">
        <form autoComplete="off" onSubmit={handleSimpan}>
          <div className="mb-6">
            <label className="block mb-2 text-primary" htmlFor="username">
              Nama Lengkap
            </label>
            <input
              className="field text-third border-primary focus:bg-four bg-four"
              type="text"
              name="nama_lengkap"
              placeholder="Nama Lengkap"
              onChange={handleChangeInput}
            />
            {errorValidasi?.nama_lengkap?.map((msg, index) => (
              <span key={index} className="text-sm text-red-600 font-semibold">
                {msg}
              </span>
            ))}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-primary" htmlFor="username">
              No Handphone
            </label>
            <input
              className="field text-third border-primary focus:bg-four bg-four"
              type="text"
              name="no_handphone"
              placeholder="No Handphone"
              onChange={handleChangeInput}
            />
            {errorValidasi?.no_handphone?.map((msg, index) => (
              <span key={index} className="text-sm text-red-600 font-semibold">
                {msg}
              </span>
            ))}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-primary" htmlFor="username">
              Alamat
            </label>
            {/* <input
              className="field text-third border-primary focus:bg-four bg-four"
              type="text"
              name="alamat"
              placeholder="Alamat"
              onChange={handleChangeInput}
            /> */}
            <textarea
              className="field text-third border-primary focus:bg-four bg-four"
              type="text"
              name="alamat"
              placeholder="Alamat"
              onChange={handleChangeInput}
            ></textarea>
            {errorValidasi?.alamat?.map((msg, index) => (
              <span key={index} className="text-sm text-red-600 font-semibold">
                {msg}
              </span>
            ))}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-primary" htmlFor="username">
              Username
            </label>
            <input
              className="field text-third border-primary focus:bg-four bg-four"
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChangeInput}
            />
            {errorValidasi?.username?.map((msg, index) => (
              <span key={index} className="text-sm text-red-600 font-semibold">
                {msg}
              </span>
            ))}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-primary" htmlFor="username">
              Password
            </label>
            <input
              className="field text-third border-primary focus:bg-four bg-four"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChangeInput}
            />
            {errorValidasi?.password?.map((msg, index) => (
              <span key={index} className="text-sm text-red-600 font-semibold">
                {msg}
              </span>
            ))}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-primary" htmlFor="username">
              Level
            </label>
            {/* <input
              className="field text-third border-primary focus:bg-four bg-four"
              type="text"
              name="jabatan"
              placeholder="Level"
              onChange={handleChangeInput}
            /> */}
            <Select
              isSearchable
              placeHolder="Select..."
              options={options}
              onChange={(value) => setSelectedValue(value)}
            />
            {errorValidasi?.jabatan?.map((msg, index) => (
              <span key={index} className="text-sm text-red-600 font-semibold">
                {msg}
              </span>
            ))}
          </div>
          <div className="w-2/12 float-right">
            <button
              className="bg-primary hover:bg-third btn mb-6"
              type="submit"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
