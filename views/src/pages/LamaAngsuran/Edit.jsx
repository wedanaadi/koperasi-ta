import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useStore from "../../store/useStore";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateData } from "../../api/LamaAngsuran";
import Input from "../../components/Input";

export default function Edit() {
  const queryClient = useQueryClient();
  const [errorValidasi, setErrorValidasi] = useState([]);
  const [lamaAngsuran, setLamaAngsuran] = useState({
    lama_angsuran: "",
  });
  const navigasi = useNavigate();
  const toastChange = useStore((state) => state.changeState);
  const toastIcon = useStore((state) => state.iconsToast);
  const toastColors = useStore((state) => state.colorsToast);
  const tokenLogin = useStore((state) => state.token);

  const dataLokal = JSON.parse(localStorage.getItem("dataEdit"));

  useEffect(() => {
    setLamaAngsuran({
      lama_angsuran: dataLokal.lama_angsuran,
    });
  }, []);

  const createLamaAngsuranMutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lamaangsuran", 1] });
      navigasi(`/lamaangsuran`);
      toastChange({
        id: "NotifAddLamaAngsuran",
        content: {
          title: "Update Data",
          description: "Cretae Lama Angsuran Successfuly",
          backgroundColor: toastColors.success,
          icon: toastIcon.check,
        },
        position: "top-right",
        dismiss: true,
        duration: 3000,
      });
    },
    onMutate: () => {
      toastChange({
        id: "NotifAddLamaAngsuran",
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
      setErrorValidasi(respon.data.errors);
      toastChange({
        id: "NotifAddLamaAngsuran",
        content: {
          title: "Update Data",
          description: respon.data.msg,
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
    createLamaAngsuranMutation.mutate({
      Data: lamaAngsuran,
      token: tokenLogin,
      id: dataLokal.id,
    });
  };

  const handleChangeInput = (e) => {
    setLamaAngsuran({
      ...lamaAngsuran,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white card w-1/2">
      <div className="border-second card-header">
        <h3 className="mb-0 text-2xl font-semibold">Ubah Lama Angsuran</h3>
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
            <Input
              label={"Lama Angsuran"}
              value={lamaAngsuran}
              handle={handleChangeInput}
              validasi={errorValidasi}
            />
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
