import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useStore from "../../store/useStore";
import Select from "../../components/Tailwind/Select";
import { useEffect } from "react";

export default function Edit() {
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [selectedValue, setSelectedValue] = useState({ value: "", label: "" },);
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

  const dataLokal = JSON.parse(localStorage.getItem("dataEdit"));

  useEffect(() => {
    setKaryawan({
      nama_lengkap: dataLokal.nama_lengkap,
      alamat: dataLokal.alamat,
      no_handphone: dataLokal.no_handphone,
      username: dataLokal.username,
      password: "",
      jabatan: dataLokal.jabatan,
    });
    const selected = options.filter(
      ({ value }) => value == dataLokal.jabatan
    );
    setSelectedValue(selected[0]);
  }, []);

  useEffect(() => {
    setKaryawan({
      nama_lengkap: dataLokal.nama_lengkap,
      alamat: dataLokal.alamat,
      no_handphone: dataLokal.no_handphone,
      username: dataLokal.username,
      password: "",
      ["jabatan"]: selectedValue?.value,
    });
  }, [selectedValue]);

  const handleSimpan = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_BACKEND_API}/pegawai/${dataLokal.id}`, {
        ...karyawan,
      })
      .then((res) => {
        navigasi(`/karyawan`)
        toastChange({
          id: "NotifAddKaryawan",
          content: {
            title: "Update Data",
            description: "Update Karyawan Successfuly",
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
        <h3 className="mb-0 text-2xl font-semibold">Ubah Karyawan</h3>
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
              value={karyawan.nama_lengkap}
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
              value={karyawan.no_handphone}
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
            <textarea
              className="field text-third border-primary focus:bg-four bg-four"
              type="text"
              name="alamat"
              placeholder="Alamat"
              onChange={handleChangeInput}
              value={karyawan.alamat}
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
              value={karyawan.username}
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
            <Select
              isSearchable
              placeHolder="Select..."
              options={options}
              editValue={selectedValue}
              onChange={(value) => {
                setSelectedValue(value);
              }}
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
