import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useStore from "../../store/useStore";
import { useEffect } from "react";

export default function Edit() {
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [jenisSimpanan, setJenisSimpanan] = useState({
    nama_jenis_simpanan: "",
    saldo_minimal: "",
  });
  const navigasi = useNavigate()
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);

  const dataLokal = JSON.parse(localStorage.getItem('dataEdit'));

  useEffect(()=>{
    setJenisSimpanan({
      nama_jenis_simpanan: dataLokal.nama_jenis_simpanan,
      saldo_minimal: dataLokal.saldo_minimal
    })
  },[])

  const handleSimpan = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_BACKEND_API}/jenissimpanan/${dataLokal.id}`,{...jenisSimpanan})
      .then((res) => {
        navigasi(`/jenissimpanan`)
        toastChange({
          id: "NotifEditJenisSimpanan",
          content: {
            title: "Update Data",
            description: "Update Jenis Simpanan Successfuly",
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
    setJenisSimpanan({
      ...jenisSimpanan,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white card">
      <div className="border-second card-header">
        <h3 className="mb-0 text-2xl font-semibold">Tambah Jenis Simpanan</h3>
        <div className="flex justify-center items-center">
          <Link
            to={`/jenissimpanan`}
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
              Nama Jenis Simpanan
            </label>
            <input
              className="field text-third border-primary focus:bg-four bg-four"
              type="text"
              name="nama_jenis_simpanan"
              placeholder="Nama Simpanan"
              onChange={handleChangeInput}
              value={jenisSimpanan.nama_jenis_simpanan}
            />
            {errorValidasi?.nama_jenis_simpanan?.map((msg, index) => (
              <span key={index} className="text-sm text-red-600 font-semibold">
                {msg}
              </span>
            ))}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-primary" htmlFor="username">
              Saldo Minimal
            </label>
            <input
              className="field text-third border-primary focus:bg-four bg-four"
              type="number"
              min={0}
              name="saldo_minimal"
              placeholder="Saldo Minimal"
              onChange={handleChangeInput}
              value={jenisSimpanan.saldo_minimal}
            />
            {errorValidasi?.saldo_minimal?.map((msg, index) => (
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
  )
}
