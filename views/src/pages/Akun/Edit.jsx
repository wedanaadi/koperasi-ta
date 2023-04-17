import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useStore from "../../store/useStore";
import { useEffect } from "react";

export default function Edit() {
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [akun, setAkun] = useState({
    no_akun: "",
    jenis_transaksi: "",
    akun: "",
  });
  const navigasi = useNavigate();
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);

  const dataLokal = JSON.parse(localStorage.getItem("dataEdit"));

  useEffect(() => {
    setAkun({
      no_akun: dataLokal.no_akun,
      jenis_transaksi: dataLokal.jenis_transaksi,
      akun: dataLokal.akun,
    });
  }, []);

  const handleSimpan = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_BACKEND_API}/akun/${dataLokal.id}`, { ...akun })
      .then((res) => {
        navigasi(`/akun`);
        toastChange({
          id: "NotifAddAkun",
          content: {
            title: "Update Data",
            description: "Updated Akun Successfuly",
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
    setAkun({
      ...akun,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white card">
      <div className="border-second card-header">
        <h3 className="mb-0 text-2xl font-semibold">Ubah Akun</h3>
        <div className="flex justify-center items-center">
          <Link
            to={`/akun`}
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
              No Akun
            </label>
            <input
              className="field text-third border-primary focus:bg-four bg-four"
              type="text"
              name="no_akun"
              placeholder="Nomor Akun"
              onChange={handleChangeInput}
              value={akun.no_akun}
            />
            {errorValidasi?.no_akun?.map((msg, index) => (
              <span key={index} className="text-sm text-red-600 font-semibold">
                {msg}
              </span>
            ))}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-primary" htmlFor="username">
              Jenis Transaksi
            </label>
            <input
              className="field text-third border-primary focus:bg-four bg-four"
              type="text"
              name="jenis_transaksi"
              placeholder="Jenis Transaksi"
              onChange={handleChangeInput}
              value={akun.jenis_transaksi}
            />
            {errorValidasi?.jenis_transaksi?.map((msg, index) => (
              <span key={index} className="text-sm text-red-600 font-semibold">
                {msg}
              </span>
            ))}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-primary" htmlFor="username">
              Akun
            </label>
            <input
              className="field text-third border-primary focus:bg-four bg-four"
              type="text"
              name="akun"
              placeholder="Akun"
              onChange={handleChangeInput}
              value={akun.akun}
            />
            {errorValidasi?.akun?.map((msg, index) => (
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
