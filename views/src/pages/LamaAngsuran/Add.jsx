import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useStore from "../../store/useStore";

export default function Add() {
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [lamaAngsuran, setLamaAngsuran] = useState({
    lama_angsuran: "",
  });
  const navigasi = useNavigate()
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);

  const handleSimpan = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_API}/lamaangsuran`,{...lamaAngsuran})
      .then((res) => {
        navigasi(`/lamaangsuran`)
        toastChange({
          id: "NotifAddLamaAngsuran",
          content: {
            title: "Create Data",
            description: "Cretae Lama Angsuran Successfuly",
            backgroundColor: toastColors.success,
            icon: toastIcon.check,
          },
          position: "top-right",
          dismiss: true,
          duration: 3000,
        });
      }).catch((err)=>{
        setErrorValidasi(err.response.data.errors)
      });
  };

  const handleChangeInput = (e) => {
    setLamaAngsuran({
      ...lamaAngsuran,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white card">
      <div className="border-second card-header">
        <h3 className="mb-0 text-2xl font-semibold">Tambah Lama Angsuran</h3>
        <div className="flex justify-center items-center">
          <Link
            to={`/lamaangsuran`}
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
              Lama Angsuran
            </label>
            <input
              className="field text-third border-primary focus:bg-four bg-four"
              type="text"
              name="lama_angsuran"
              placeholder="Lama Angsuran"
              onChange={handleChangeInput}
            />
            {errorValidasi?.lama_angsuran?.map((msg, index) => (
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
