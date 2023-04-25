import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useStore from "../../store/useStore";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateData } from "../../api/JenisSimpanan";
import { Input, InputFormat } from "../../components/Input";
import { useEffect } from "react";

export default function Edit() {
  const queryClient = useQueryClient();
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [jenisSimpanan, setJenisSimpanan] = useState({
    nama_jenis_simpanan: "",
    saldo_minimal: 0,
  });
  const navigasi = useNavigate();
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const tokenLogin = useStore((state) => state.token);

  const dataLokal = JSON.parse(localStorage.getItem("dataEdit"));

  useEffect(() => {
    setJenisSimpanan({
      nama_jenis_simpanan: dataLokal.nama_jenis_simpanan,
      saldo_minimal: dataLokal.saldo_minimal,
    });
  }, []);

  const createJSMutation = useMutation({
    networkMode: `always`,
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jenisSimpanan", 1] });
      navigasi(`/masterdata/jenissimpanan`);
      toastChange({
        id: "NotifJS",
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
      localStorage.removeItem("dataEdit");
    },
    onMutate: () => {
      toastChange({
        id: "NotifJS",
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
        id: "NotifJS",
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
    createJSMutation.mutate({
      Data: jenisSimpanan,
      token: tokenLogin,
      id: dataLokal.id,
    });
  };

  const handleChangeInput = (e) => {
    setJenisSimpanan({
      ...jenisSimpanan,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white card w-1/2">
      <div className="border-second card-header">
        <h3 className="mb-0 text-lg font-bold">Ubah Jenis Simpanan</h3>
        <div className="flex justify-center items-center">
          <Link
            to={`/masterdata/jenissimpanan`}
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
            label={"Nama Jenis Simpanan"}
            value={jenisSimpanan}
            handle={handleChangeInput}
            validasi={errorValidasi}
          />
          <InputFormat
            value={jenisSimpanan}
            label={"Saldo Minimal"}
            validasi={errorValidasi}
            handle={(values) => {
              setJenisSimpanan({
                ...jenisSimpanan,
                ["saldo_minimal"]: values.floatValue,
              });
            }}
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
