import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useStore from "../../store/useStore";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateData } from "../../api/Akun";
import { Input } from "../../components/Input";
import { useEffect } from "react";

export default function Edit() {
  const queryClient = useQueryClient();
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
  const tokenLogin = useStore((state) => state.token);

  const dataLokal = JSON.parse(localStorage.getItem("dataEdit"));

  useEffect(() => {
    setAkun({
      no_akun: dataLokal.no_akun,
      jenis_transaksi: dataLokal.jenis_transaksi,
      akun: dataLokal.akun,
    });
  }, []);

  const createAkunMutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["akun", 1] });
      navigasi(`/masterdata/akun`);
      toastChange({
        id: "NotifAkun",
        content: {
          title: "Update Data",
          description: "Update Akun Successfuly",
          backgroundColor: toastColors.success,
          icon: toastIcon.check,
        },
        position: "top-right",
        dismiss: true,
        duration: 3000,
      });
      localStorage.removeItem("dataEdit");
    },
    onMutate: () => {
      toastChange({
        id: "NotifAkun",
        content: {
          title: "Update Data",
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
        id: "NotifAkun",
        content: {
          title: "Update Data",
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

  const handleSimpan = (e) => {
    e.preventDefault();
    createAkunMutation.mutate({
      Data: akun,
      token: tokenLogin,
      id: dataLokal.id,
    });
  };

  const handleChangeInput = (e) => {
    setAkun({
      ...akun,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white card w-1/2">
      <div className="border-second card-header">
        <h3 className="mb-0 text-lg font-bold">Ubah Akun</h3>
        <div className="flex justify-center items-center">
          <Link
            to={`/masterdata/akun`}
            className="btn bg-slate-600 text-white hover:opacity-80 flex items-center"
          >
            <MdOutlineKeyboardBackspace /> &nbsp;
            <span>Kembali</span>
          </Link>
        </div>
      </div>
      <div className="card-body">
        <form autoComplete="off" onSubmit={handleSimpan}>
          <Input
            label={"No Akun"}
            value={akun}
            handle={handleChangeInput}
            validasi={errorValidasi}
          />
          <Input
            label={"Jenis Transaksi"}
            value={akun}
            handle={handleChangeInput}
            validasi={errorValidasi}
          />
          <Input
            label={"Akun"}
            value={akun}
            handle={handleChangeInput}
            validasi={errorValidasi}
          />
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
